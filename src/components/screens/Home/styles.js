import { StyleSheet } from 'react-native';

export const layoutButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const newCardGrid = StyleSheet.create({
    container: {
        margin: '4%',
        borderRadius: 5,
    },
    source: {
        fontFamily: 'Barlow-Bold',
        marginLeft: '7%',
        marginTop: 15,
        fontSize: 12,
        color: '#BBB',
    },
    name: {
        fontFamily: 'Barlow-Bold',
        fontSize: 20,
        marginLeft: '7%',
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
    }
});

export const newCardList = StyleSheet.create({
    container: {
        margin: '2%',
    }
});

export const newCardBigList = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
    }
});

export default StyleSheet.create({
    loading: {
        position: 'absolute',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
