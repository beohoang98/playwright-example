const common = {
  format: [
    "json:reports/cucumber-chrome.json",
    "junit:reports/cucumber-chrome.xml",
  ],
  requireModule: ["ts-node/register"],
  require: ["steps/**/*.ts"],
  worldParameters: {
    baseURL: "https://automationbookstore.dev",
    headless: false,
    browser: "chrome",
  },
};

module.exports = {
  default: {
    ...common,
  },
  chrome: {
    ...common,
  },
  firefox: {
    ...common,
    format: [
      "json:reports/cucumber-firefox.json",
      "junit:reports/cucumber-firefox.xml",
    ],
    worldParameters: {
      ...common.worldParameters,
      browser: "firefox",
    },
  },
  webkit: {
    ...common,
    format: [
      "json:reports/cucumber-webkit.json",
      "junit:reports/cucumber-webkit.xml",
    ],
    worldParameters: {
      ...common.worldParameters,
      browser: "webkit",
    },
  },
};
