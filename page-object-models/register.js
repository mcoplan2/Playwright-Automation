class Register {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('//form[2]//input[@name="acct"]');
        this.passwordField = page.locator('//form[2]//input[@name="pw"]');
        this.createAccountButton = page.getByRole('button', { name: 'create account' });
        this.forgotPassword = page.getByRole('link', { name: /Forgot your password?/i });
    }

    async goto() {
        await this.page.goto('https://news.ycombinator.com/login?goto=newest');
    }

    async register(username, password) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.createAccountButton.click();
    }

    async forgotPassword() {
        await this.forgotPassword.click()
    }
} module.exports = Register;