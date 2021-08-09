import React, { useState } from 'react';
import {
    View, StatusBar
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MasonryList from '@react-native-seoul/masonry-list';
import { fetchAllNews } from '../../../actions/newsActions';
import { useCustomColorScheme } from '../../../helpers/hooks';
import { languageSelector, layoutSelector } from '../../../selectors';
import { newsSelector } from '../../../selectors/newsSelectors';
import NewCard from './NewCard';

export default function Home() {
    const colorScheme = useCustomColorScheme();
    const dispatch = useDispatch();
    const language = useSelector(languageSelector);
    const layout = useSelector(layoutSelector);
    const getNews = useSelector(newsSelector);
    const [refreshing, setRefreshing] = useState(false);

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

    const renderItem = ({ item, i }) => (
        <NewCard
            {...item}
            key={i}
            layout={layout}
        />
    );

    return (
        <View>
            <StatusBar barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'} />
            <MasonryList
                key={layout}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                renderItem={renderItem}
                data={getNews(language)}
                numColumns={layout === 'grid' ? 2 : 1}
            />
        </View>
    );
}
