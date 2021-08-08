import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from '../../../actions/newsActions';
import { useCustomColorScheme } from '../../../helpers/hooks';
import { languageSelector, layoutSelector } from '../../../selectors';
import styles from './styles';

export default function Home() {
    const dispatch = useDispatch();
    const language = useSelector(languageSelector);
    const layout = useSelector(layoutSelector);

    useEffect(() => {
        dispatch(fetchAllNews({ language }));
    }, [dispatch, language]);
    const colorScheme = useCustomColorScheme();
    return (
        <View style={styles.container}>
            <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
        </View>
    );
}
