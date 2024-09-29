class Footer {
    constructor(page){
        this.page = page;
        this.guidelines = page.locator('a[href="newsguidelines.html"]')
        this.faq = page.locator('a[href="newsfaq.html"]')
        this.lists = page.locator('a[href="lists"]')
        this.api = page.locator('a[href="https://github.com/HackerNews/API"]')
        this.security = page.locator('a[href="security.html"]')
        this.legal = page.locator('a[href="https://www.ycombinator.com/legal/"]')
        this.apply = page.locator('a[href="https://www.ycombinator.com/apply/"]')
        this.contact = page.locator('a[href="mailto:hn@ycombinator.com"]')
        this.search = page.locator('input[name="q"]')
    }
} module.exports = Footer;