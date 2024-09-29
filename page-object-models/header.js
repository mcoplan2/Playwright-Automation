class Header {
    constructor(page){
        this.page = page;
        this.image = page.locator('img[src="y18.svg"]')
        this.title = page.locator('a[href="news"]')
        this.new = page.locator('a[href="newest"]')
        this.past = page.locator('a[href="front"]')
        this.comments = page.locator('a[href="newcomments"]')
        this.ask = page.locator('a[href="ask"]')
        this.show = page.locator('a[href="show"]')
        this.job = page.locator('a[href="jobs"]')
        this.submit = page.locator('a[href="submit"]')
        this.date = page.locator('font[color="#FFFFFF"]')
    }

    
    async getDate() {
        const date = await this.date.textContent();
        return date.trim();
      }
} module.exports = Header;