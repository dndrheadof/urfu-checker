const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const Urfu = require("./lib/urfu");

clear();
console.log(
  chalk.yellow(figlet.textSync("URFU", { horizontalLayout: "full" }))
);

const run = async () => {
  const urfu = new Urfu();
  await urfu.getPlacement();
};

run();
