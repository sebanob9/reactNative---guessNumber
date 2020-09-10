import React from 'react'
import { Text, StyleSheet } from 'react-native'

const BodyText = props => {
    return (
        <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'open-sans'
    }
})
export default BodyText;
