import { StyleSheet } from 'react-native';

const rootStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#ccc',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 30
    }
});

export const layoutButtonStyles = StyleSheet.create({
    container: {
        width: '40%',
        textAlign: 'center',
        alignItems: 'center'
    }
});

export default rootStyles;
