import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    backdrop: {
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    drawer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
    },
});
