export const getHeaderOptions = (headerTitle, colorScheme) => ({
    headerTitle,
    headerStyle: { backgroundColor: colorScheme === 'light' ? '#EEE' : '#000' },
    headerTitleStyle: {
        fontFamily: 'Barlow-ExtraBold',
        fontSize: 14,
        color: colorScheme === 'light' ? '#000' : '#FFF'
    },
});
