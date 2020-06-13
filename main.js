const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const inquirer = require("./components/inquirer.js");

const run = async () => {
  clear();
  console.log(
    chalk.yellow(
      figlet.textSync("arraytoJson", {
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
      })
    ),
    "\n"
  );
  inquirer.startPrompt(__dirname);
};
run();
