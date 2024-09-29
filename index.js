// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const assert = require("assert");
const Base = require("./page-object-models/base");
const { expect } = require("playwright/test");

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();


  // Arrange
  //
  // Create an Array to hold each article

  const articles = [];


  // Act
  //
  // Loop through each Article
  let newestPage = new Base(page, "https://news.ycombinator.com/newest");
  await newestPage.goto();
  while (articles.length < 100) {

    // Get each number of each article on the page
    // <span class="rank">1.</span>

    const ranks = await newestPage.getAllRanks();
    const titles = await newestPage.getAllTitles();
    const exactDate = await newestPage.getAllTimeTitles();

    // loop through each article individually and add it to the array of objects
    // make sure it stops at 100 articles or 30 to go to next page
    for (let i = 0; i < ranks.length && articles.length < 100; i++) {
      articles.push({
        rank: ranks[i],
        title: titles[i],
        date: exactDate[i],
      });
    }

    // Stop if 100 articles have been collected
    if (articles.length >= 100) {
      break;
    }

    let moreLink = newestPage.more;
    if (await moreLink.isVisible()) {
      await moreLink.click();
      // if the more button is not visible break out of the loop.
    } else {
      break;
    }
  }
  
  // Assert
  //
  // make sure all dates are in order
  for(let i = 0; i < articles.length-1; i++) {
    const firstDate = new Date(articles[i].date);
    const secondDate = new Date(articles[i+1].date);
    expect(firstDate >= secondDate) 
  }

  // 100 items
  expect(articles.length === 100);
  await context.close();
  await browser.close();
} 


(async () => {
  await sortHackerNewsArticles();
})();
