const inquirer = require("inquirer");

module.exports = {
  askForId: () => {
    const questions = [
      {
        name: "id",
        type: "input",
        message:
          "Введите регистрационный номер заявления из личного кабинета абитуриента:",
        vallidate: (value) => {
          if (value.length) {
            return true;
          } else {
            return "Введите регистрационный номер заявления из личного кабинета абитуриента:";
          }
        },
      },
      {
        name: "name",
        type: "list",
        message: "Выберите институт",
        choices: ["ИРИТ-РТФ"], // TODO: Добавить институты (вдруг будет пользоваться больше одного человека)
      },
    ];
    return inquirer.prompt(questions);
  },
  askForDirection: (directions) => {
    const questions = [
      {
        name: "name",
        type: "list",
        message: "Выберите направление",
        choices: directions,
      },
    ];
    return inquirer.prompt(questions);
  },
};
