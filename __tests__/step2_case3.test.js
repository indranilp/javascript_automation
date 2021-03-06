const puppeteer = require('puppeteer');
jest.setTimeout(30000);
describe('Open Google', () => {
  var browser, page;
  var url = 'https://google.com'
beforeEach (async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  })
afterEach (() => {
    browser.close()
  })

 //Opening the Page and entering the search query 
test('Inurl search', async () => {
    await page.goto(url);   
    const title = await page.title();
    expect(title).toBe("Google");
    await page.click("input[name=q]");
    var query = "botify"
    await page.type("input[name=q]", "inurl:".concat(query));
    await page.evaluate(async() => {
      await new Promise(function(resolve) { 
             setTimeout(resolve, 1000)
      });
  });
    //await page.click('input[type=submit]');
    await page.keyboard.press(String.fromCharCode(13));
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

// Iterating the resultList
var resultxpath = "//*[@id='rso']//cite";
var xpath = await page.$x(resultxpath);
var resultList = [];
for(var i= 0;i<xpath.length;i++){
resultList.push(await page.evaluate(el => el.textContent,xpath[i]));
}
//console.log(resultList);

//Validating the query in url
for (var i=0;i<resultList.length;i++){
  expect(resultList[i]).toMatch(/botify/i); //used regular expression with i to implement equalignore case
}

});

})
