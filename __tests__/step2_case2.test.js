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
test('filetype search', async () => {
    await page.goto(url);   
    const title = await page.title();
    expect(title).toBe("Google");
    await page.focus("input[name=q]");
    var file = "pdf adobe"
    await page.type("input[name=q]", "filetype:".concat(file));
    await page.evaluate(async() => {
      await new Promise(function(resolve) { 
             setTimeout(resolve, 1000)
      });
  });
    //await page.click('input[type=submit]');  
    await page.keyboard.press(String.fromCharCode(13));    
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

// Iterating the resultList
var resultxpath = "//*[@id='rso']//h3/span";
var xpath = await page.$x(resultxpath);
var resultList = [];
for(var i= 0;i<xpath.length;i++){
resultList.push(await page.evaluate(el => el.textContent,xpath[i]));
}
//console.log(resultList);

//Validating the filetype
//here i have used string to match the filetype, 
//it can also be done with gettting the url and checking .pdf in the end with regular expression like in other cases.
for (var i=0;i<resultList.length;i++){
  expect(resultList[i]).toMatch("[PDF]");
}

});

})

