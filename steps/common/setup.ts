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
import {
  BrowserContext,
  chromium,
  devices,
  firefox,
  Page,
  webkit,
} from "@playwright/test";
import { ITestWorld } from "../../types/world";
import * as fs from "fs";

class TestWorld extends World implements ITestWorld {
  page!: Page;

  context!: BrowserContext;

  options: IWorldOptions;

  constructor(opts: IWorldOptions) {
    super(opts);
    this.options = opts;
  }

  async init() {
    const { parameters } = this.options;
    switch (parameters.browser) {
      case "firefox":
        global.browser = await firefox.launch({
          downloadsPath: "reports/downloads",
        });
        this.context = await global.browser.newContext({
          baseURL: this.parameters.baseURL,
          ...devices["Desktop Firefox"],
        });
        break;
      case "webkit":
        global.browser = await webkit.launch({
          downloadsPath: "reports/downloads",
        });
        this.context = await global.browser.newContext({
          baseURL: this.parameters.baseURL,
          ...devices["Desktop Safari"],
        });
        break;
      case "chrome":
      default:
        global.browser = await chromium.launch({
          downloadsPath: "reports/downloads",
        });
        this.context = await global.browser.newContext({
          baseURL: this.parameters.baseURL,
          ...devices["Desktop Chrome"],
        });
        break;
    }
  }

  async teardown() {
    await this.page?.close();
    await this.context?.close();
    await global.browser?.close();
  }
}

setWorldConstructor(TestWorld);
setDefaultTimeout(30000);

const cleanDir = (path: string) => {
  try {
    fs.rmSync(path, { recursive: true, force: true });
    fs.mkdirSync(path, { recursive: true });
  } catch (error) {
    console.warn(error);
  }
};

BeforeAll(async function () {
  cleanDir("reports/downloads");
  cleanDir("reports/screenshots");
  cleanDir("reports/videos");
});

AfterAll(async function () {});

Before(async function (this: TestWorld) {
  await this.init();
  this.page = await this.context.newPage();
});
After(async function (this: TestWorld) {
  await this.teardown();
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
