const TABLE_SIZE = 3;
export const getInitialTableState = () => Array(9).fill(0);

export const isValidPlay = (selectedCell, tableState) => tableState[selectedCell] === 0;


export const fullTable = (tableState) => !tableState.some(cell => cell === 0);

export const hasWinner = (tableState, lastCellId) => {
    return hasHorizontalWin(tableState, lastCellId) ||
        hasVerticalWin(tableState, lastCellId) ||
        hasDiagonalWin(tableState, lastCellId)
}

const hasHorizontalWin = (tableState, lastCellId, tableSize = TABLE_SIZE) => {
    let testCells = [0, 1, 2];
    testCells = testCells.map(value => value - (lastCellId % tableSize)) 
    testCells = testCells.map(value => value + lastCellId);
    return testCells.map(id => tableState[id]).every(cellState => cellState === tableState[lastCellId])
}

const hasVerticalWin = (tableState, lastCellId, tableSize = TABLE_SIZE) => {
    const baseId = lastCellId % tableSize;
    const testCells = [];
    for (i = 0; i < tableSize; i++) {
        testCells.push(baseId + i * tableSize);
    }
    return testCells.map(id => tableState[id]).every(cellState => cellState === tableState[lastCellId])
}

const hasDiagonalWin = (tableState, lastCellId, tableSize = TABLE_SIZE) => {
    return hasLTRDiagonal(tableState, lastCellId, tableSize) ||
        hasRTLDiagonal(tableState, lastCellId, tableSize)
}

const hasLTRDiagonal = (tableState, lastCellId, tableSize = TABLE_SIZE) => {
    if (lastCellId % (tableSize + 1) !== 0){
        return false;
    }
    for (i = 0; i < tableSize; i++){
        if (tableState[i * (tableSize + 1)] !== tableState[lastCellId]) {
            return false; 
        }
    }
    return true
}

const hasRTLDiagonal = (tableState, lastCellId, tableSize = TABLE_SIZE) => {
    const baseId = tableSize - 1;
    if ((lastCellId % baseId !== 0) || lastCellId > tableSize * (tableSize - 1)){
        return false;
    }
    for (i = 1; i <= tableSize; i++){
        if (tableState[i * (tableSize - 1)] !== tableState[lastCellId]) { //checa o estado de 0, 4 e 8
            return false; // Se algum for falso, já retorna, não precisamos continuar
        }
    }
    return true
}