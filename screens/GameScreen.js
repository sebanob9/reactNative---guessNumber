import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, 
        FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultSyles from '../constants/default-styles';
import HeaderTitle from '../components/HeaderTitle';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import { Ionicons } from '@expo/vector-icons';
import  * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min= Math.ceil(min);
    max= Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

/* const renderList = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>); para scrollview */

    const renderList = (listLength, itemData) => (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>); // itemdata viene a ser toda la informacion que recibe, es el guess que en el scrollview se mapeaba. de ahi sacamos el index y el .item con la info 

const GameScreen = props => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    const initialGuess = generateRandomBetween(1,100, props.userChoice);// userchoice es el nombre que le ponemos al selectednumber del otro lado, el cual no permitimos que acierte a la primera
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    
    const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()]); // contador de intentos
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props; // desestructuracion de objetos

    useEffect( () => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height)
        };
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });

    useEffect( () => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length); // argumento para actualizar setGuessRound en app.js
        }
    }, [currentGuess, userChoice, onGameOver]) // el hook se ejecuta solamente si cambia una de estas dependencias

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)
        ) {
            Alert.alert('Don\'t lie!', 'You know you are giving wrong data',
                [{text: 'Sorry', style: 'cancel'}
            ]);
            return;
        }
        // si pasa el if, es decir si no mentimos, generamos un nuevo numero random..
        if (direction === 'lower') {
            currentHigh.current = currentGuess // propiedad current para actualizar el useRef
        } else {
            currentLow.current = currentGuess + 1// si no es lower, es greater y por lo tanto se establece el minimo
        } // una vez tenemos el min/max, generamos un nuevo numero aleatorio // +1 lo metemos por logica, para poder sacar un ID al mapear

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess ) // excluimos currentguess para no poder repetir numero
        setCurrentGuess(nextNumber);
        //setRounds(currentRounds => currentRounds + 1); // sumamos 1 al contador de rounds --> dejamos de contar rondas, vamos a almacenarlas
        setpastGuesses(curPastGuesses => [ nextNumber.toString(), ...curPastGuesses])
    };


    // condicional --> Indicamos que si el ancho es menor de 350, pase a usar el estilo BIG en bez de listContainer, para eso creamos la variable containerStyle y la metemos en el styles del tag
    let containerStyle = styles.listContainer;
    if ( availableDeviceWidth < 350) {
        containerStyle = styles.listContainerBig
    };

    if(availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
            <HeaderTitle>Opponent's Guess</HeaderTitle>
            <View style={styles.controls}>
                <MainButton style={styles.button} onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>  
                <MainButton style={styles.button} onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </View>
            <View style={containerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderList(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item)=> item}
                    data={pastGuesses}
                    renderItem={renderList.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}>
                        {/* pastGuesses.length es el primer argumento que se envia */}
                </FlatList> 
            </View>
        </View>
        )
    }

    return (
        <View style={styles.screen}>
            <HeaderTitle>Opponent's Guess</HeaderTitle>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton style={styles.button} onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton> 
                <MainButton style={styles.button} onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white'/>
                </MainButton>
            </Card>
            <View style={containerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderList(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item)=> item}
                    data={pastGuesses}
                    renderItem={renderList.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}>
                        {/* pastGuesses.length es el primer argumento que se envia */}
                </FlatList> 
            </View>
        </View>
    )
} 
{/* con el bind, mandamos la funcion como primer argumento, y el segundo argumento 
                es el que la funcion reciben como primer argumento (direction) */}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '80%'
    },
    button: {
        borderRadius: 40
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    list: {
        flexGrow: 1, // se usa para que el ultimo resultado se pueda mantener cuando hacemos scroll
        /* alignItems: 'center', */
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    listContainer: {
        //width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        width: '60%',
        flex: 1
    },
    listContainerBig: {
        width: '80%'
    }
});
export default GameScreen
