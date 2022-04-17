describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-inputwithbutton--add-tasks-input-with-button&args=&globals=backgrounds.grid:false&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('EditableSpanPropsType', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('Task is done', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-done-example&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('Task not is done', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-not-is-done-example&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('App with redux', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-example&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('Todolist', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('http://localhost:9009/iframe.html?id=todolist-todolist--todolist-all-tasks-example&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});