const Axios = require("axios");
const chalk = require("chalk");
const clear = require("clear");
const axios = Axios.create({ baseURL: "https://itfstudio.ru/priem/" });

module.exports = {
  get: async (url) => {
    try {
      const result = await axios.get(url);
      return result;
    } catch (err) {
      clear();
      console.log(chalk.bold.red("Ошибка:"), err.message);
      process.exit(-1);
    }
  },
};
