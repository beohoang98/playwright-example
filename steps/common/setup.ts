import {
  After,
  AfterAll,
  AfterStep,
  Before,
  BeforeAll,
  IWorldOptions,
  setDefaultTimeout,
  setWorldConstructor,
  World,
} from "@cucumber/cucumber";
import { BrowserContext, chromium, Page } from "@playwright/test";
import { ITestWorld } from "../../types/world";
import * as fs from "fs";

class TestWorld extends World implements ITestWorld {
  page!: Page;

  context!: BrowserContext;

  constructor(opts: IWorldOptions) {
    super(opts);
  }

  async init() {
    this.context = await global.browser.newContext({
      baseURL: this.parameters.baseURL,
      viewport: {
        width: 1920,
        height: 1080,
      },
    });
  }
}

setWorldConstructor(TestWorld);
setDefaultTimeout(30000);

const skipError = () => {
  /** */
};

BeforeAll(async function () {
  global.browser = await chromium.launch({
    downloadsPath: "reports/downloads",
    headless: false,
  });
  fs.rm("reports/videos", { recursive: true, force: true }, skipError);
  fs.rm("reports/downloads", { recursive: true, force: true }, skipError);
  fs.rm("reports/screenshots", { recursive: true, force: true }, skipError);
});

AfterAll(async function (this: TestWorld) {
  await global.browser.close();
});

Before(async function (this: TestWorld) {
  await this.init();
  this.page = await this.context.newPage();
});
After(async function (this: TestWorld) {
  await this.page.close();
});
AfterStep(async function (this: TestWorld, param) {
  if (param.result.status === "FAILED") {
    const screenshot = await this.page.screenshot({
      type: "jpeg",
      path: `reports/screenshots/${param.pickle.uri}-${param.pickle.name}-${param.pickleStep.text}(failed).jpg`,
    });
    this.attach(screenshot, "image/jpeg");
  }
});
