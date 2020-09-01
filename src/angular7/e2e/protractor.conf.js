const { SpecReporter } = require('jasmine-spec-reporter');
const { JUnitXmlReporter } = require('jasmine-reporters');

//process.env.CHROME_BIN = process.env.CHROME_BIN || require("puppeteer").executablePath();

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  multiCapabilities: {
    'browserName': 'firefox',
      firefoxOptions: {
      args: ['--headless']
    },
      'moz:firefoxOptions': {
      args: [ '--headless' ]
    }
    /*'browserName': 'chrome',

    chromeOptions: {
      args: ["--headless", "--disable-gpu", "--window-size=1200,900"],
      binary: process.env.CHROME_BIN
    }*/
  },
    //chromeDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/chromedriver_77.0.3865.75',
  geckoDriver: '../node_modules/protractor/node_modules/webdriver-manager/selenium/geckodriver-v0.27.0',
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    var junitReporter = new JUnitXmlReporter({
      savePath: require('path').join(__dirname, './junit'),
      consolidateAll: true
    });
    jasmine.getEnv().addReporter(junitReporter);
  }
};
