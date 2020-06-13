const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
module.exports = {
  startPrompt: (currentDirectory) => {
    const questions = [
      {
        type: "input",
        name: "file",
        message:
          "Please enter the name of the json file with the array (e.g. array.json):",
      },
      {
        type: "confirm",
        name: "choice",
        message:
          "Do you want the file names to be a property from the object (all objects must be structured same)?",
      },
    ];
    return inquirer.prompt(questions).then(async (answers) => {
      let array = fs.readFileSync(
        currentDirectory + "/" + answers.file,
        "utf8"
      );
      try {
        JSON.parse(array);
      } catch {
        return console.log(
          chalk.red("X"),
          chalk.bold("You must provide a valid JSON file with proper syntax")
        );
      }
      array = JSON.parse(array);
      fs.mkdirSync("results", { recursive: true }, (err) => {
        if (err) {
          return console.log(
            chalk.red("ⅹ"),
            chalk.bold(
              "An error occurred while trying to create the results directory"
            )
          );
        }
      });
      if (answers.choice) {
        inquirer
          .prompt({
            type: "list",
            name: "fileName",
            message:
              "Please select the property you want to get the file name from?",
            choices: Object.getOwnPropertyNames(array[0]),
          })
          .then(async (answers) => {
            array.map((object, index) =>
              fs.writeFileSync(
                `./results/${object[answers.fileName]}.json`,
                JSON.stringify(object)
              )
            );
            console.log(
              chalk.green("✓"),
              chalk.bold(
                `${array.length} Files have successfully been created in the results directory`
              )
            );
          });
      } else {
        array.map((object, index) =>
          fs.writeFileSync(`./results/${index}.json`, JSON.stringify(object))
        );
        console.log(
          chalk.green("✓"),
          chalk.bold(
            `${array.length} Files have successfully been created in the results directory`
          )
        );
      }
    });
  },
};
