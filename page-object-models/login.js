class Login {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('//form[1]//input[@name="acct"]');
        this.passwordField = page.locator('//form[1]//input[@name="pw"]');
        this.loginButton = page.getByRole('button', { name: 'login' });
        this.forgotPassword = page.getByRole('link', { name: /Forgot your password?/i });
    }

    async goto() {
        await this.page.goto('https://news.ycombinator.com/login?goto=newest');
    }

    async login(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async forgotPassword() {
        await this.forgotPassword.click()
    }
} module.exports = Login;

