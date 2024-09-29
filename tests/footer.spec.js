const { test, expect } = require("playwright/test");

const Base = require("../page-object-models/base");
const Footer = require("../page-object-models/footer");

test.describe('Footer Tests', ()=> {
    let page;
    let basePage;
    let footer;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        footer = new Footer(page);
    });
    
    test.afterEach(async () => {
        await page.close();
    });


    test('All footer links are visible on the newest page', async () => {
        
        // Arrange
        basePage = new Base(page, "https://news.ycombinator.com/newest");

        // Act
        await basePage.goto("/", {waitUntil: "networkidle"});
        await footer.guidelines.hover();

        // Assert
        // Expected: All footer links are visible
        await expect(footer.guidelines).toBeVisible();
        await expect(footer.faq).toBeVisible();
        await expect(footer.lists).toBeVisible();
        await expect(footer.api).toBeVisible();
        await expect(footer.security).toBeVisible();
        await expect(footer.legal).toBeVisible();
        await expect(footer.apply).toBeVisible();
        await expect(footer.contact).toBeVisible();
        await expect(footer.search).toBeVisible();
    });  

})