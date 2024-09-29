class Base {
    constructor(page, url) {
        this.page = page;
        this.url = url;
        this.rank = page.locator('span.rank');
        this.title = page.locator('span.titleline');
        this.site = page.locator('span.sitestr');
        this.points = page.locator('span.score');
        this.user = page.locator('a.hnuser');
        this.time = page.locator('span.age');
        this.more = page.locator('a.morelink');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async getRankByIndex(index) {
        return await this.rank.nth(index).textContent();
    }

    async getAllRanks() {
        const ranks = await this.rank.allTextContents();
        return ranks.map((rank) => ({ rank }));
    }

    async getTitleByIndex(index) {
        return await this.title.nth(index).textContent();
    }

    async getAllTitles() {
        const titles = await this.title.allTextContents();
        return titles.map((title) => ({ title })); 
    }

    async getTimeTitleByIndex(index) {
        return await this.time.nth(index).getAttribute('title');
    }

    async getAllTimeTitles() {
        const titles = await this.time.evaluateAll(elements => elements.map(el => el.getAttribute('title')));
        return titles;
    }

    async getMore() {

    }
} module.exports = Base;