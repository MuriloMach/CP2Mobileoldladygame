import React, { useState, useEffect } from 'react';
import { View, Button } from 'react-native';
import EndGameDialog from '../../components/EndGameDialog';
import { getInitialTableState, fullTable, hasWinner, isValidPlay } from './gameRules';
import GameTable from './Table';
import TurnRecorder from './TurnRecorder';

const CPU_PLAYER = 2;

const GameScreen = ({ navigation }) => {
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [tableState, setTableState] = useState(getInitialTableState());
  const [winnerPlayer, setWinnerPlayer] = useState();
  const [gameMode, setGameMode] = useState('1Player');

  const makeCPUMove = () => {
    const emptyCells = tableState.reduce((acc, cellState, index) => {
      if (cellState === 0) {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const selectedCell = emptyCells[randomIndex];

    const newTableState = [...tableState];
    newTableState[selectedCell] = CPU_PLAYER;
    setTableState(newTableState);

    if (hasWinner(newTableState, selectedCell)) {
      setWinnerPlayer('CPU');
      setShowEndGameDialog(true);
      return;
    }

    if (fullTable(newTableState)) {
      setShowEndGameDialog(true);
      return;
    }

    setCurrentPlayer(1);
  };

  const onCellClicked = (cellId) => {
    if (!isValidPlay(cellId, tableState) || winnerPlayer) {
      return;
    }

    const newTableState = [...tableState];
    newTableState[cellId] = currentPlayer;
    setTableState(newTableState);

    if (hasWinner(newTableState, cellId)) {
      setWinnerPlayer(currentPlayer === 1 ? 'Player 1' : 'Player 2');
      setShowEndGameDialog(true);
      return;
    }

    if (fullTable(newTableState)) {
      setShowEndGameDialog(true);
      return;
    }

    if (gameMode === '1Player' && currentPlayer === 1) {
      setCurrentPlayer(CPU_PLAYER);
    } else {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setShowEndGameDialog(false);
    setCurrentPlayer(1);
    setTableState(getInitialTableState());
    setWinnerPlayer(undefined);
  };

  const endGameText = winnerPlayer ? (gameMode === '1Player' ? `O ganhador é: ${winnerPlayer === 'CPU' ? 'CPU' : 'Player'}` : `O ganhador é: ${winnerPlayer}`) : 'Deu empate :/';

  useEffect(() => {
    if (gameMode === '1Player' && currentPlayer === CPU_PLAYER && !winnerPlayer) {
      makeCPUMove();
    }
  }, [currentPlayer, winnerPlayer]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#9781b1' }}>
      <TurnRecorder
        playerName={gameMode === '1Player' ? (currentPlayer === CPU_PLAYER ? 'CPU' : 'Player') : `Player ${currentPlayer}`}
        playerId={currentPlayer}
      />
      <GameTable
        tableState={tableState}
        onCellClicked={onCellClicked}
      />
      <EndGameDialog
        isOpen={showEndGameDialog}
        resultText={endGameText}
        onClickYes={resetGame}
        onClickNo={() => navigation.goBack()}
      />
      <Button title="Jogador 1" onPress={() => setGameMode('1Player')} color={'#00FF00'}  />
      <Button title="Jogador 2" onPress={() => setGameMode('2Players')} color={'#00FF00'} />
    </View>
  );
};

export default GameScreen;
