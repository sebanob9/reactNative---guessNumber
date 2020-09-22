import colors from "./colors";

const { StyleSheet, Platform } = require("react-native");

export default StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans',
        color: 'green'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        color: Platform.OS === 'android' ? 'white' : colors.primary
    }
})