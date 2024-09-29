const { test, expect } = require("playwright/test");
const Base = require("../page-object-models/base");

test.describe('Newest Page Tests', () => {
    let page;
    let basePage;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        basePage = new Base(page, "https://news.ycombinator.com/newest")
        await basePage.goto("/", {waitUntil: "networkidle"}); 
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('Newest articles are sorted from newest to oldest', async () => {

        // Arrange
        //
        // Create Empty Array of Objects
        const articles = [];


        // Act
        //
        // Loop through each Article
        while (articles.length < 100) {

            // Get each number of each article on the page
            // <span class="rank">1.</span>

            const ranks = await basePage.getAllRanks();
            const titles = await basePage.getAllTitles();
            const exactDate = await basePage.getAllTimeTitles();

            // loop through each article individually and add it to the array of objects
            // make sure it stops at 100 articles or 30 to go to next page
            for (let i = 0; i < ranks.length && articles.length < 100; i++) {
                articles.push({
                    rank: ranks[i],
                    title: titles[i],
                    date: exactDate[i],
                });
            }

            // Stop if 100 articles have been collected
            if (articles.length >= 100) {
                break;
            }

            // Click the more button
            await basePage.more.click();
        }

        // Assert
        //
        // Each date should be earlier or equal to the date before since it is in sorted order on the website
        for(let i = 0; i < articles.length-1; i++) {
            const firstDate = new Date(articles[i].date);
            const secondDate = new Date(articles[i+1].date);
            expect(firstDate >= secondDate).toBeTruthy();
        }

        // The length should equal 100, since we only grabbed the first 100 on the page
        expect(articles.length === 100)
    })

    test('After clicking More button once the first rank is now 31', async () => {

        // Act
        await basePage.more.click();

        let rank = await basePage.getRankByIndex(0);


        // Assert
        expect(rank).toBe('31.')   
    })

    test('After clicking More button once the url contains 31', async () => {

        // Act
        await basePage.more.click();

        // Assert
        // Check if 31 is in the URL
        await expect(page).toHaveURL(/.*31.*/);
             
    })

})