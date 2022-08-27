const fs = require('fs');
const inquirer = require('inquirer');

function Manager() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'mannager_name',
      message: 'What is the team managers name?',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the team managers id?',
    },
    {
      type: 'input',
      name: 'manager_email',
      message: "What is the team managers email?",
    },
    {
      type: 'input',
      name: 'manager_officenumber',
      message: 'What is the team mangers office number?',
    },
  ]).then(Answers => {
    manager = new Manager(Answers.manager_name, Answers.manager_id, Answers.manager_email, Answers.manager_officenumber);
    // console.log(manager)
    nextQ();
  });
}

function nextQ() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'member',
      message: 'What kind of team member would you like to add?',
      choices: ["Engineer", "Intern", "I don't want to add another member"],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is their name?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'What is their id?',
    },
    {
      type: 'input',
      name: 'email',
      message: "What is their email?",
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is their github link?',
      when: (role) => role.member === 'Engineer'
    },
    {
      type: 'input',
      name: 'school',
      message: "What school did they go to?",
      when: (role) => role.member === 'Intern'
    },
    {
      type: 'list',
      name: 'onemore',
      message: "Do you want to add one more member?",
      choices: ["Yes", "No"]
    },
  ]).then(answers => {

      if (answers.member === 'Engineer') {
        engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        nextQ();

      } else if (answers.member === 'Intern') {
        intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        nextQ();

      } else if (answers.onemore === "Yes") {
        nextQ();
      }
  });
};