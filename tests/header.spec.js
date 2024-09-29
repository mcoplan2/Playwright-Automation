const { test, expect } = require("playwright/test");
const Header = require("../page-object-models/header");
const Base = require("../page-object-models/base");

test.describe('Header Tests', ()=> {
    let page;
    let homePage;
    let header;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        header = new Header(page);
    });
    
    test.afterEach(async () => {
        await page.close();
    });


    test('All header links are visible on the newest page except date', async () => {

        // Arrage
        homePage = new Base(page, "https://news.ycombinator.com/newest");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"}); 
        await header.image.hover();

        // Assert
        await expect(header.image).toBeVisible();
        await expect(header.title).toBeVisible();
        await expect(header.new).toBeVisible();
        await expect(header.past).toBeVisible();
        await expect(header.comments).toBeVisible();
        await expect(header.ask).toBeVisible();
        await expect(header.show).toBeVisible();
        await expect(header.job).toBeVisible();
        await expect(header.submit).toBeVisible();
        await expect(header.date).not.toBeVisible();
    });

    test('All header links are visible on the past page including date', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.image.hover();

        // Assert
        await expect(header.image).toBeVisible();
        await expect(header.title).toBeVisible();
        await expect(header.new).toBeVisible();
        await expect(header.past).toBeVisible();
        await expect(header.comments).toBeVisible();
        await expect(header.ask).toBeVisible();
        await expect(header.show).toBeVisible();
        await expect(header.job).toBeVisible();
        await expect(header.submit).toBeVisible();
        await expect(header.date).toBeVisible();
    });

    test('Image navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.image.click()


        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/')
    });

    test('Title navigation header redirects to correct URL', async () => {

        // rrange
        homePage = new Base(page, "https://news.ycombinator.com/front");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.title.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/news')

        
    });
    test('New navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.new.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/newest')

    });
    test('Past navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.past.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/front')
    });
    test('Comments navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");
        
        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.comments.click();

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/newcomments');
    });
    test('Ask navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");

        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.ask.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/ask')
        
    });

    test('Show navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");
        
        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.show.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/show')
    
    });

    test('Job navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");
        
        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.job.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/jobs')
    });

    test('Submit navigation header redirects to correct URL', async () => {

        // Arrange
        homePage = new Base(page, "https://news.ycombinator.com/front");
        
        // Act
        await homePage.goto("/", {waitUntil: "networkidle"});
        await header.submit.click()

        // Assert
        await expect(page).toHaveURL('https://news.ycombinator.com/submit')
    });


})