import puppeteer from 'puppeteer';
import express from 'express';
import parse from 'body-parser';

const GOOGLE_NEWS_URL = 'https://news.google.com/headlines/section/topic';

const browser = await puppeteer.launch();
const page = await browser.newPage();

const init = async () => {
    const app = express();
    const port = 3001;

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });

    app.post('/getNews', parse.json(), async (req, res) => {
        const { country = 'tr', tag = 'general' } = req.body;
        const result = await scrape(country, tag);
        res.status(200).send(result);
    });
};

const scrape = async (country, tag) => {
    const parameters = `?hl=${
        country === 'tr' ? 'tr-TR' : 'en-US'
    }&gl=${
        country === 'tr' ? 'TR' : 'US'
    }&ceid=${
        country === 'tr' ? 'TR:tr' : 'US:en'
    }`;

    await page.goto(`${GOOGLE_NEWS_URL}/${tag === 'general' ? 'NATION' : tag.toUpperCase()}${parameters}`);

    // eslint-disable-next-line no-undef
    const result = await page.evaluate(() => Array.prototype.slice.call(document.querySelectorAll('main c-wiz > div > div > main > div > div'))
        .map(e => ({
            url: e.querySelector('div > div > a')?.href,
            image: e.querySelector('figure img')?.src,
            title: e.querySelector('article h3 a')?.innerText,
            source: e.querySelector('article div div a')?.innerText,
            time: e.querySelector('article div div time')?.dateTime
        })).filter(e => Object.values(e).some(e => e)));

    return result;
};

init();
