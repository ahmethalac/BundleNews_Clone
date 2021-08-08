import { StyleSheet } from 'react-native';

export const layoutButtonStyles = StyleSheet.create({
    container: {
        width: '40%',
        textAlign: 'center',
        alignItems: 'center'
    }
});

export const newCardStyles = StyleSheet.create({
    grid: {
        backgroundColor: 'blue',
    },
    list: {
        backgroundColor: 'pink',
    },
    bigList: {
        backgroundColor: 'red'
    }
});

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#ccc',
        padding: 20,
        borderRadius: 10,
    },
    text: {
        fontSize: 30
    },
    loading: {
        position: 'absolute',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
