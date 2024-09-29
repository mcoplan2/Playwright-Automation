const { test, expect } = require("playwright/test");
const ForgotPassword = require("../page-object-models/forgotPassword");
const Login = require("../page-object-models/login");

test.describe('Forgot Password Tests', () =>{
    let page;
    let forgotPasswordPage;
    let loginPage;

    // Arrange
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        loginPage = new Login(page);
        forgotPasswordPage = new ForgotPassword(page)
        await forgotPasswordPage.goto("/", {waitUntil: "networkidle"}); 
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('When clicking on send reset email', async () => {

        // Act
        // Click on the send email button
        await forgotPasswordPage.sendEmail('');

        // Assert
        // Expected: The page displayed Unknown and the url changes to 'https://news.ycombinator.com/x'
        await expect(loginPage.loginButton).toBeHidden();
        await expect(page).toHaveURL('https://news.ycombinator.com/x');
    });

})