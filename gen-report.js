// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generate } = require("multiple-cucumber-html-reporter");

generate({
  jsonDir: "reports",
  reportPath: "reports",
  displayDuration: true,
  pageTitle: "Automation Bookstore",
  reportName: "Automation Bookstore",
  pageFooter: "<div><p>Automation Bookstore</p></div>",
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Automation Bookstore" },
      { label: "Release", value: "1.0.0" },
    ],
  },
  useCDN: true,
});
