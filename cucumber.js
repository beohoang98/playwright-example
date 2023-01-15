module.exports = {
  default: {
    format: [
      "html:reports/old-reports.html",
      "json:reports/cucumber.json",
      "junit:reports/junit.xml",
    ],
    requireModule: ["ts-node/register"],
    require: ["steps/**/*.ts"],
    worldParameters: {
      baseURL: "https://automationbookstore.dev",
      headless: false,
    },
  },
};
