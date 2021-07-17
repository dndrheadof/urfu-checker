const { Spinner } = require("clui");
const cheerio = require("cheerio");
const inquirer = require("./inquirer");
const axios = require("./axios");
const DUMP = require("../dump");

module.exports = class Urfu {
  async getPlacement() {
    const info = await inquirer.askForId();
    let status = new Spinner("Получаю данные о направлениях...");
    status.start();
    const aggregation = await this.getAggregation();
    const directions = await this.getDirections(aggregation);
    status.stop();
    const direction = await inquirer.askForDirection(directions);
    status = new Spinner("Получаю информацию об абитуриенте...");
    status.start();
    const applicant = await this.getApplicant(
      info.id,
      direction.name.split(" ")[0].replace(/\./g, "")
    );
    status.stop();
  }

  async getAggregation() {
    // Для того, чтобы не ждать загрузку 20 тысяч лет
    // return DUMP.aggregation;
    const aggregation = await axios.get("aggregation.php");
    return aggregation.data;
  }

  getDirections(aggregation) {
    const directionRegex = /^(\d+.\d+.\d+)(\D*)/i;
    const $ = cheerio.load(aggregation);
    const directions = [];
    $("table tr").each((i, elem) => {
      const direction = $(elem).text().trim();
      if (directionRegex.test(direction)) {
        const match = direction.match(directionRegex);
        directions.push(match[0].trim());
      }
    });
    return directions;
  }

  async getApplicant(id, name) {
    const table = await axios.get(`applied.php?napr=${name}`);
    const $ = cheerio.load(table);
    $("tr").each((i, elem) => {
      if ($(elem).text().includes(id)) {
        $(elem)
          .find("td")
          .each((i, td) => {
            console.log(i, $(td).html());
          });
      }
    });
  }
};
