import { IWorld } from "@cucumber/cucumber";
import { Browser, Page } from "@playwright/test";

declare interface ITestWorld extends IWorld {
  page: Page;
}

declare global {
  // eslint-disable-next-line no-var
  declare var browser: Browser;
}
