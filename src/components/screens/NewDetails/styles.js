import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
    },
    bottomBar: {
        height: '10%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    menu: {
        padding: 15,
        paddingTop: 30,
        paddingBottom: 30
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        opacity: 0.8,
        padding: 15
    },
    optionText: {
        fontFamily: 'Barlow-ExtraBold',
        fontSize: 15,
    }
});
