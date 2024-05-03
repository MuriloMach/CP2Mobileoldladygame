import { Button, View, Text, StyleSheet, Image } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Jogo da Velhinha - Murilo Machado 2
        </Text>
        <Image source={'assets/jogodavelha.png'} style={styles.image} />
        <Button style={styles.btnGroup}
          title="BORA JOGAR"
          onPress={() => navigation.navigate('Game')}
          color="#00FF00"
        />
        <Button style={styles.btnGroup}
        title="Saída"
        onPress={() => signOut(auth)}
        color="#00FF00"
      />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
      justifyContent: 'space-around',
      backgroundColor: '#9781b1',
      alignItems: 'center',
      flex: 1,
  },
  title: {
      fontWeight: 'bold',
      fontSize: '50px',
      color: '#fff',
      fontFamily: 'Arial'
  },
  image: {
    width: '30%',
    aspectRatio: 1
  },
  btnGroup: {
    gap: '20px',
    marginBottom: '30px',
    width: '50%'
  },
})

export default HomeScreen;