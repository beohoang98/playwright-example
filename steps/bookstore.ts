import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { ITestWorld } from "../types/world";
import { expect } from "@playwright/test";

Given(
  /^Go to homepage on (desktop|mobile) screen$/,
  async function (this: ITestWorld, device: string) {
    switch (device) {
      case "desktop":
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        break;
      case "mobile":
        await this.page.setViewportSize({ width: 375, height: 812 });
        break;
    }
    await this.page.goto("/", { waitUntil: "domcontentloaded" });
  }
);

Then(
  /^Verify Required Elements on Bookstore$/,
  async function (this: ITestWorld, elementTable: DataTable) {
    const elements = elementTable.rows()[0];
    for (const selector of elements) {
      await expect(this.page.locator(selector)).toBeVisible();
    }
  }
);

Then(
  /^Verify book list:$/,
  async function (this: ITestWorld, bookTable: DataTable) {
    const books = bookTable.hashes();
    const bookElements = this.page.locator("#productList>li:visible");
    await expect(this.page.locator("#productList>li:visible")).toHaveCount(
      books.length
    );
    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const bookElement = bookElements.nth(i);
      const id = (await bookElement.getAttribute("id")) || "";
      const title = await bookElement.locator(`#${id}_title`).innerText();
      const author = await bookElement.locator(`#${id}_author`).innerText();
      const price = await bookElement.locator(`#${id}_price`).innerText();
      expect(title).toBe(book.title);
      expect(price).toBe(book.price);
      expect(author).toBe(book.author);
    }
    await this.attach(
      await this.page.screenshot({ type: "jpeg" }),
      "image/jpeg"
    );
  }
);

When(/^User search for "([^"]*)"$/, async function (this: ITestWorld, keyword) {
  await this.page.fill("#searchBar", keyword);
  await this.page.waitForTimeout(200);
});
