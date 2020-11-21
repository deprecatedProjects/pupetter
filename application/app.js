const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone X'];

  
const first = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.emulate(iPhone); //emulates the page based on mobile device screen size
    await page.goto('https://poly.google.com/view/8GZSF4vtFz7');

    page.screenshot({ path: 'wholePageEx1.png',fullPage: true });

    await page.waitForSelector('.iib5kc-ge6pde');          // wait for the selector to load
    const element = await page.$('.iib5kc-ge6pde');        // declare a variable with an ElementHandle
    await element.screenshot({path: 'modelImageEx1.png'}); // take screenshot element in puppeteer

    // await page.screenshot({ path: 'example.png' });

    await browser.close();
};
  
const second = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.emulate(iPhone); //emulates the page based on mobile device screen size
    await page.goto('https://demos.oqullar.com/moiraraki/index.html');

    page.screenshot({ path: 'wholePageEx2.png',fullPage: true });

    await page.click('.oqullar3DButton');
    // page.screenshot({ path: 'wholePageEx2AfterClick.png',fullPage: true });
    // await page.waitFor(20000);
    await page.waitForSelector('model-viewer');          // wait for the selector to load
    const element = await page.$('model-viewer');        // declare a variable with an ElementHandle

    try{
        await element.screenshot({ path: 'modelImageAfterClickEx2.png' }); // take screenshot element in puppeteer
        await page.screenshot({ path: 'Ex2.png' }); 

    } catch(error) {
        console.log("failed to screenshot",error);
    }
    // await page.screenshot({ path: 'example.png' });

    await browser.close();
};

// var modelViewer = document.querySelector('model-viewer')
// modelViewer.addEventListener('load',()=>console.log('To montelo fortose'))

second();