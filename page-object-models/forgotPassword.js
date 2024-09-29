class ForgotPassword {
    constructor(page) {
        this.page = page;
        this.username = page.locator('input[name="s"]');
        this.sendResetEmail = page.getByRole('button', { name: 'Send reset email' });
    }

    async goto() {
        await this.page.goto('https://news.ycombinator.com/forgot');
    }

    async sendEmail(username) {
        await this.username.fill(username);
        await this.sendResetEmail.click();
    }
} module.exports = ForgotPassword;