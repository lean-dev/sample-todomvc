// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
  interface Chainable<Subject = any> {
    createTodo: typeof createTodo;
  }
}

function createTodo(title: string) {
  let cmd = Cypress.log({
    name: 'create todo',
    message: title,
    consoleProps() {
      return {
        'Inserted Todo': title,
      };
    },
  });

  // create the todo
  cy.get('.new-todo', { log: false }).type(`${title}{enter}`, { log: false });

  // now go find the actual todo
  // in the todo list so we can
  // easily alias this in our tests
  // and set the $el so its highlighted
  return cy
    .get('.todo-list', { log: false })
    .contains('li', title.trim(), { log: false })
    .then(($li) => {
      // set the $el for the command so
      // it highlights when we hover over
      // our command
      cmd.set({ $el: $li }).snapshot().end();
    });
}

Cypress.Commands.add('createTodo', createTodo);
