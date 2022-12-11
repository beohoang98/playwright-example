import { Given, Then, When } from "@cucumber/cucumber";
import { ITestWorld } from "../types/world";
import { expect } from "@playwright/test";

Given(/^Go to home page$/, async function (this: ITestWorld) {
  await this.page.goto("/");
});

When(/^Click on menu Pricing$/, async function (this: ITestWorld) {
  await this.page.getByRole("link", { name: /Pricing/i }).click();
});

Then(/^Everything is fine$/, async function (this: ITestWorld) {
  await this.page.getByText(/^Free$/).isVisible();
  const shot = await this.page.screenshot({ type: "jpeg" });
  await this.attach(shot, "image/jpeg");
});

Then(/^There is 69 dollar price$/, async function (this: ITestWorld) {
  const text = await this.page.getByText("$69");
  await expect(text).toBeVisible();
});
