import React, { useMemo } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllNewsSuccess } from '../../actions/newsActions';
import { safeJSONParse } from '../../helpers/utils';
import { fetchingStatusSelector } from '../../selectors';

const GOOGLE_NEWS_URL = 'https://news.google.com/headlines/section/topic';

export default function BackgroundFetcher() {
    const { country, tag, fetching } = useSelector(fetchingStatusSelector);
    const dispatch = useDispatch();

    const uri = useMemo(() => {
        if (!fetching) {
            return 'https://google.com';
        }

        const parameters = `?hl=${
            country === 'tr' ? 'tr-TR' : 'en-US'
        }&gl=${
            country === 'tr' ? 'TR' : 'US'
        }&ceid=${
            country === 'tr' ? 'TR:tr' : 'US:en'
        }`;

        return `${GOOGLE_NEWS_URL}/${tag === 'general' ? 'NATION' : tag.toUpperCase()}${parameters}`;
    }, [country, tag, fetching]);

    const jsCode = `window.addEventListener('DOMContentLoaded', () => {
        window.ReactNativeWebView.postMessage(JSON.stringify(
            Array.prototype.slice.call(document.querySelectorAll('main c-wiz > div > div > main > div > div'))
                .map(e => ({
                        url: e.querySelector('div > div > a')?.href,
                        image: e.querySelector('figure img')?.src,
                        title: e.querySelector('article h3 a')?.innerText,
                        source: e.querySelector('article div div a')?.innerText,
                        time: e.querySelector('article div div time')?.dateTime
                    })
                ).filter(e => Object.values(e).some(e => e))
            )
        );
    });`;

    console.log(uri);
    const handleNewsFetch = event => {
        const news = safeJSONParse(event?.nativeEvent?.data, []);
        console.log(news);
        dispatch(fetchAllNewsSuccess(news));
    };

    return (
        <View>
            <WebView
                source={{ uri }}
                javaScriptEnabled
                injectedJavaScript={jsCode}
                onMessage={handleNewsFetch}
                userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
            />
        </View>
    );
}
