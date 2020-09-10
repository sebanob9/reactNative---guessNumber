import React from 'react'
import { Text, StyleSheet } from 'react-native'

const HeaderTitle = props => {
    return (
        <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    }
})
export default HeaderTitle;
