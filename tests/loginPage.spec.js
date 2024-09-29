const { test, expect } = require("playwright/test");
const Login = require("../page-object-models/login");
const Register = require("../page-object-models/register");

test.describe('Login Tests', ()=> {
    let page;
    let loginPage;
    let registerPage;

    // Arrange
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new Login(page);
        registerPage = new Register(page);
        await loginPage.goto("/", {waitUntil: "networkidle"}); 
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('When attemping to Login with no credentials', async () => {

        // Act
        await loginPage.login('', '');

        // Assert
        // Expected: Login failed, redirected back to login page and the create button is now gone
        await expect(registerPage.createAccountButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

    test('When attemping to Login with no password', async () => {

        // Act
        await loginPage.login('testin123', '');

        // Assert
        // Expected: Login failed, redirected back to login page and the create button is now gone
        await expect(registerPage.createAccountButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

    test('When attemping to Login with invalid password', async () => {

        // Act
        await loginPage.login('testin123', 'a');

        // Assert
        // Expected: Login failed, redirected back to login page and the create button is now gone
        await expect(registerPage.createAccountButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

})