module.exports = {
  default: {
    format: [
      "progress-bar",
      "html:reports/index.html",
      "json:reports/cucumber.json",
    ],
    requireModule: ["ts-node/register"],
    require: ["steps/**/*.ts"],
  },
};
