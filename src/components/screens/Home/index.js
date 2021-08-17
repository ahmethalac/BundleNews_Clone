import React, { useMemo, useState } from 'react';
import {
    View, StatusBar, RefreshControl, ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNews } from '../../../actions/newsActions';
import { useColorPalette } from '../../../helpers/hooks';
import { languageSelector, layoutSelector } from '../../../selectors';
import { newsSelector } from '../../../selectors/newsSelectors';
import NewCard from './NewCard';

export default function Home() {
    const colorPalette = useColorPalette();
    const dispatch = useDispatch();
    const language = useSelector(languageSelector);
    const layout = useSelector(layoutSelector);
    const getNews = useSelector(newsSelector);
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
            <StatusBar barStyle={colorPalette.barStyle} />
            <ScrollView
                style={{
                    height: '100%',
                    width: '100%',
                }}
                refreshControl={(
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
                            {getNews(language).map((item, i) => {
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
