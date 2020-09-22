import React from 'react'
import { View, Text, StyleSheet, Platform }from 'react-native';
import colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';


const Header = props => {
    return (
        <View style={{...styles.headerBase, ...Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid})
            }}
            >
            <Text style={DefaultStyles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIOS : {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    headerAndroid: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent'
    }
});
export default Header

/* borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 */
