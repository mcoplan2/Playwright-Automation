const { test, expect } = require("playwright/test");
const Base = require("../page-object-models/base");
const Header = require("../page-object-models/header");

test.describe('Past Page Tests', () =>{
    let page;
    let basePage;
    let header;

    // Arrange
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        basePage = new Base(page, "https://news.ycombinator.com/front")
        header = new Header(page);
        await basePage.goto("/", {waitUntil: "networkidle"}); 
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('The dates are the same when the user clicks go back a day', async () => {

        // Arrange
        // Create a date of the previous day to check if it is correct on the webpage
        const date = new Date();
        date.setDate(date.getDate() - 1);
        let currentDate = date.toISOString();
        currentDate = currentDate.split("T")[0];;
        
        // Act



        // Assert
        await expect(header.date).toContainText(currentDate);
      
    })

    test('The articles date is from the previous day', async () => {

        // Arrange
        // Create a date of the day two days ago to check if it is correct on the webpage
        const date = new Date();
        date.setDate(date.getDate() - 2);
        let currentDate = date.toISOString();
        currentDate = currentDate.split("T")[0];

        // Act
        // Click on 'Day' to sort by last day
        await page.locator('a[href^="front?day="]').first().click();
        let dateFromPage = await basePage.getTimeTitleByIndex(0);
        dateFromPage = dateFromPage.split("T")[0]

        // Assert
        expect(dateFromPage).toBe(currentDate);
      
    })

    

})