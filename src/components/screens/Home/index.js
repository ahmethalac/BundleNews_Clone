import React, { useMemo, useState } from 'react';
import {
    View, StatusBar, RefreshControl, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from '../../../actions/newsActions';
import { useColorPalette } from '../../../helpers/hooks';
import { languageSelector, layoutSelector } from '../../../selectors';
import { newsSelector, newsSelectorBySource } from '../../../selectors/newsSelectors';
import NewCard from './NewCard';

export default function Home({ route: { params: { type, source, tag } } }) {
    const colorPalette = useColorPalette();
    const dispatch = useDispatch();
    const language = useSelector(languageSelector);
    const layout = useSelector(layoutSelector);
    const getNews = useSelector(newsSelector);
    const getNewsBySource = useSelector(newsSelectorBySource);
    const [refreshing, setRefreshing] = useState(false);
    const numColumns = useMemo(() => (layout === 'grid' ? 2 : 1), [layout]);

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
            tag,
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

    const news = useMemo(() => {
        switch (type) {
            case 'source':
                return getNewsBySource(language, source);
            case 'home':
            default:
                return getNews(language, tag);
        }
    }, [type, language, tag, getNews]);

    return (
        <View style={{ backgroundColor: colorPalette.headerBackground }}>
            <StatusBar barStyle={colorPalette.barStyle} />
            <ScrollView
                style={{
                    height: '100%',
                    width: '100%',
                }}
                refreshControl={type === 'home' && (
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={colorPalette.red}
                        colors={[colorPalette.red]}
                    />
                  )}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}

                >
                    {Array.from(Array(numColumns), (_, num) => (
                        <View key={num.toString()} style={{ flex: 1 / numColumns, }}>
                            {news.map((item, i) => {
                                if (i % numColumns === num) {
                                    return renderItem({
                                        item,
                                        i
                                    });
                                }
                                return null;
                            }).filter(e => !!e)}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
