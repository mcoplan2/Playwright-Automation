const { test, expect } = require("playwright/test");
const Register = require("../page-object-models/register");
const Login = require("../page-object-models/login");


test.describe('Register Tests', ()=> {
    let page;
    let registerPage;
    let loginPage;

    // Arrange
    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        registerPage = new Register(page);
        loginPage = new Login(page);
        await registerPage.goto("/", {waitUntil: "networkidle"}); 
    });
    
    test.afterEach(async () => {
        await page.close();
    });

    test('When Registering an account with a username not in use', async () => {
        
        // Arrange
        // Create a random username to test
        let username = 'pwUser'+Math.random().toString().substring(2, 10);
        let password = 'password';

        // Act
        await registerPage.register(username, password);
        
        // Assert
        await expect(loginPage.loginButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

    test('When Registering an account with a username in use', async () => {

        // Arrange
        // Enter a common username in use
        let username = 'user';
        let password = 'password';

        // Act
        await registerPage.register(username, password);

        // Assert
        await expect(loginPage.loginButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

    test('When Registering an account with an invalid username', async () => {

        // Arrange
        // Enter an invalid username
        let username = '';
        let password = 'password';

        // Act
        await registerPage.register(username, password);

        // Assert
        await expect(loginPage.loginButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

    test('When Registering an account with an invalid password(null)', async () => {

        // Arrange
        // Enter an invalid username
        let username = 'pwUser'+Math.random().toString().substring(2, 10);
        let password = '';

        // Act        
        await registerPage.register(username, password);

        // Assert
        await expect(loginPage.loginButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

    test('When Registering an account with an invalid password(under 8)', async () => {

        // Arrange
        // Enter an invalid username
        let username = 'pwUser'+Math.random().toString().substring(2, 10);
        let password = 'ab';
        
        // Act
        await registerPage.register(username, password);

        // Assert
        await expect(loginPage.loginButton).not.toBeVisible();
        await expect(page).toHaveURL('https://news.ycombinator.com/login');
    });

})