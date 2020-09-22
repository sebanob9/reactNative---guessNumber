import React from 'react';
import { Text, View, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';
import BodyText from '../components/BodyText';
import HeaderTitle from '../components/HeaderTitle';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
            <ScrollView>
                <View style={styles.screen}>
                    <HeaderTitle>Game is over</HeaderTitle>
                    <View style={styles.imageContainer}>
                        <Image
                        //source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbI06umDQztAb65Gx9M15bXTqU6gA_ggZTpg&usqp=CAU'}}
                        source={require('../assets/success.png')}
                        style={styles.image}
                        resizeMode='cover'
                        fadeDuration={4000}/>
                    </View>
                    <View style={styles.resultContainer}>
                        <BodyText style={styles.resultText}>
                            Your phone needed{' '}
                            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
                            to guess the number {' '}
                            <Text style={styles.highlight}>{props.userNumber}</Text>
                        </BodyText>
                    </View>
                    <MainButton onPress={props.onRestart}>Start new game</MainButton>
                </View>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,    
        borderWidth: 3,
        borderColor: 'green',
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30 // it sets margin to 5% of the device
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
    
})
export default GameOverScreen;
