import { StyleSheet } from 'react-native';

export const layoutButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const newCardGrid = StyleSheet.create({
    container: {
        margin: '4%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    source: {
        marginLeft: '7%',
        marginTop: 15,
        fontSize: 12
    },
    name: {
        fontSize: 20,
        marginLeft: '7%',
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
    },
    image: {
        height: 120,
        width: '100%',
    }
});

export const newCardList = StyleSheet.create({
    container: {
        padding: '5%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    leftPart: {
        flex: 1,
        justifyContent: 'space-between',
        marginRight: 10
    },
    image: {
        width: 120,
        height: 80,
        borderRadius: 10
    },
    name: {
        fontSize: 17,
        marginBottom: 10
    },
});

export const newCardBigList = StyleSheet.create({
    container: {
        marginBottom: 30,
        padding: 25,
        paddingBottom: 15
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
    },
    name: {
        fontSize: 23,
        marginTop: 15,
        marginBottom: 15,
    },
    sourceWithAction: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    actionButton: {
        padding: 10,
        paddingBottom: 0,
        marginLeft: 15
    },
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
