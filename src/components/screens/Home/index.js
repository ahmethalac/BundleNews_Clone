import React, { useEffect, useState } from 'react';
import {
    View, StatusBar, ScrollView, RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from '../../../actions/newsActions';
import { useCustomColorScheme } from '../../../helpers/hooks';
import { languageSelector, layoutSelector } from '../../../selectors';
import { newsSelector } from '../../../selectors/newsSelectors';
import NewCard from './NewCard';
import styles from './styles';

export default function Home() {
    const colorScheme = useCustomColorScheme();
    const dispatch = useDispatch();
    const language = useSelector(languageSelector);
    const layout = useSelector(layoutSelector);
    const getNews = useSelector(newsSelector);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchAllNews({ language }));
    }, [dispatch, language]);

    const onRefresh = (status, message) => {
        setRefreshing(false);
        if (status === 'failure') {
            console.error(message);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(fetchAllNews({
            language,
            callback: onRefresh
        }));

    };
    return (
        <View style={styles.container}>
            <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <ScrollView
                style={styles[layout]}
                refreshControl={(
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="red"
                        colors={['red']}
                    />
                  )}
            >
                {getNews(language).map((e, index) => (
                    <NewCard
                        {...e}
                        key={index}
                        layout={layout}
                    />
))}
            </ScrollView>
        </View>
    );
}
