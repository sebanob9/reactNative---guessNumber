import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
} // fetchfonts, al tener return, devuelve una promesa. es clave para el funcioamiento de AppLoading

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0); // contador de los intentos de acertar el numero. solo se ehecuta con el gameoverhandler, es decir que si tiene un valor, es porque el juego ha terminado
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}/>
  } // Hasta que no se cumple la promesa de startasync, no se puede pasar al onFinish

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }
  
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }


  const gameOverHandler = numRounds => {
    setGuessRounds(numRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler}/> // la funcion startgame.. entrega el numero del startgame a app.js, es decir, al padre
  // no lo estamos pasando, sino que pasamos la funcion al hijo, para que se ejecute ahí, y de esa forma ya tenemos el selectednumber en app.js (y por lo tanto userNumber)


  if (userNumber && guessRounds === 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
  } else if (guessRounds > 0 ) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  } 
  // si guessrounds es superior a 0, significa que se ejecutó el gameoverhandler, y por lo tanto ya no tiene que aparecer GameScreen
  // si es superior, podemos mostrar en pantalla en gameoverscreen
  

  return (
    <View style={styles.screen}>
      <Header title="Guess the number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
