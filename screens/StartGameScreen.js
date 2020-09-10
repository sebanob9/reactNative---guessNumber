import React, { useState } from 'react';
import { View, Text, StyleSheet,
        Button, TouchableWithoutFeedback,
        Keyboard, Alert, Dimensions,
        ScrollView, KeyboardAvoidingView}from 'react-native';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import HeaderTitle from '../components/HeaderTitle';
import MainButton from '../components/MainButton';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number must be a number between 1 and 99.', [{text: 'OK', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber); // text to number
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
    confirmedOutput = (
        <Card style={styles.summaryContainer}>
            <Text>You selected: </Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start game</MainButton>
        </Card>
    )
    }
    
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <HeaderTitle style={styles.title}>Start a new game!</HeaderTitle>
                        <Card style={styles.inputContainer}>
                            <Text>Select a number</Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='numeric'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                                />
                            <View style={styles.buttonsContainer}>
                                <View style={styles.button} ><Button title="Reset" onPress={resetInputHandler} color={Colors.secondary}></Button></View>
                                <View style={styles.button} ><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}></Button></View>
                                
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    title: {
        marginVertical: 10,
        fontFamily: 'open-sans-bold'

    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%', // ocupan el 100% del superior. en caso de no meterlo, tendrian el ancho delimitado por el tamaño de los botones
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: Dimensions.get('window').width / 4,
        minWidth: 90
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 15,
        alignItems: "center"
    }
})

export default StartGameScreen
