const puppeteer = require('puppeteer');

const assetsPath = "./files/"


//start and close the browser
function getScreenShot(url, tag = '') {
    let browser;
    (async () => {
        browser = await puppeteer.launch();
        const page = await browser.newPage();
        // await page.goto(url);
        // await delay(4000);
        // await page.screenshot({path: assetsPath + 'example'+Math.random()+'.png'});

        page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
        
        //calls to get the screenshot and if something fail prints the error
        await screenshotDOMElement(tag, 10, page).catch(error => console.log(error));
        //close the browser
        await browser.close();
    })().catch((error) => {
        browser.close();
        console.log("1-" + error.message, "---- " + url);
    });
    
   
}

async function screenshotDOMElement(selector, padding = 0, page) {
    if (selector != "") {
        const rect = await page.evaluate(selector => {
            const element = document.querySelector(selector);
            if (element != null) {
                const { x, y, width, height } = element.getBoundingClientRect();
                return { left: x, top: y, width, height, id: element.id };
            }
        }, selector);
        if (rect == null) {
            return await page.screenshot({
                path: assetsPath + 'example' + Math.random() + '.png',
                fullPage: true});
        } else {
            return await page.screenshot({
                path: assetsPath + 'example' + Math.random() + '.png',
                clip: {
                    x: rect.left - padding,
                    y: rect.top - padding,
                    width: rect.width + padding * 2,
                    height: rect.height + padding * 2
                }
            });
        }
    } else {
        return await page.screenshot({
            path: assetsPath + 'example' + Math.random() + '.png',
            fullPage: true});
    }
}


function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}


async function wasBrowserKilled(browser) {
    const procInfo = await browser.process();
    return !!procInfo.signalCode; // null if browser is still running
}

getScreenShot("https://3d.oqullar.com/loungechairr", tag = '')