const selectors = {
  mainSection: '.main',
  toolbar: '.footer',
  newTodo: '.new-todo',
  todoList: '.todo-list',
  todoItems: '.todo-list li',
};

const todoFixtures = ['Unit Testing', 'E2E Testing', 'Test Coverage', 'Continous Integration'];

context('Angular • TodoMVC', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('No Todos', () => {
    it('should hide the main section', () => {
      cy.get('section.main:visible').should('not.exist');
    });
    it('should hide the app footer aka toolbar', () => {
      cy.get('footer.footer:visible').should('not.exist');
    });
  });

  describe('New Todo', () => {
    it('should focus the input field on page load', () => {
      cy.focused().should('have.class', 'new-todo');
    });

    it('should allow me to add todo items', () => {
      cy.createTodo(todoFixtures[0]);
      cy.contains(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.contains(todoFixtures[1]);
      cy.get(selectors.todoItems).should('have.length', 2);
    });

    it('should trim then entered title', () => {
      cy.createTodo(` ${todoFixtures[0]} `);
      cy.get(selectors.todoItems).first().find('label').should('have.text', todoFixtures[0]);
    });

    it('should not allow me to add empty todo items', () => {
      cy.createTodo('First');
      cy.get(selectors.newTodo).type('{enter}');
      cy.get(selectors.todoItems).should('have.length', 1);
    });
  });

  describe('Item', () => {
    it('should mark new todos not as completed', () => {
      cy.createTodo('Sample').as('newTodo');
      cy.get('@newTodo').find('.toggle').should('not.be.checked');
      cy.get('@newTodo').should('not.have.class', 'completed');
    });

    it('should allow me to toggle the completed state', () => {
      cy.createTodo('Sample').as('newTodo');
      cy.get('@newTodo').find('.toggle').check();
      cy.get('@newTodo').find('.toggle').should('be.checked');
      cy.get('@newTodo').should('have.class', 'completed');

      cy.get('@newTodo').find('.toggle').uncheck();
      cy.get('@newTodo').find('.toggle').should('not.be.checked');
      cy.get('@newTodo').should('not.have.class', 'completed');
    });

    it('should allow me to delete an item', () => {
      cy.createTodo(todoFixtures[0]).as('todo');
      cy.createTodo(todoFixtures[1]);

      cy.get('@todo').find('.destroy').click({ force: true });
      cy.get(selectors.todoItems).should('have.length', 1);
    });

    context('Editing', () => {
      beforeEach(() => {
        cy.createTodo(todoFixtures[0]);
        cy.createTodo(todoFixtures[1]).as('todo');
      });

      it('should hide other controls when editing', function () {
        cy.get('@todo').find('label').dblclick();

        cy.get('@todo').find('.toggle:visible').should('not.exist');
        cy.get('@todo').find('label:visible').should('not.exist');
      });

      it('should focus the input field', function () {
        cy.get('@todo').find('label').dblclick();

        cy.get('@todo').find('.edit').should('have.focus');
      });

      it('should allow me to edit an item', () => {
        cy.get('@todo').find('label').dblclick();
        cy.get('@todo')
          .find('.edit')
          .should('have.value', todoFixtures[1])
          .clear()
          .type('E2E Testing with Cypress{enter}');

        cy.get('@todo').find('label').should('have.text', 'E2E Testing with Cypress');
      });

      it('should save edits on blur', function () {
        cy.get('@todo').find('label').dblclick();
        cy.get('@todo').find('.edit').clear().type('E2E Testing with Cypress').blur();

        cy.get('@todo').find('label').should('have.text', 'E2E Testing with Cypress');
      });

      it('should trim entered text', function () {
        cy.get('@todo').find('label').dblclick();
        cy.get('@todo').find('.edit').type('{selectall}{backspace}    Spaces    {enter}');

        cy.get('@todo').find('label').should('have.text', 'Spaces');
      });

      it('should remove the item if an empty text string was entered', function () {
        cy.get('@todo').find('label').dblclick();
        cy.get('@todo').find('.edit').clear().type('{enter}');

        cy.get(selectors.todoItems).should('have.length', 1);
      });

      it('should cancel edits on escape', function () {
        cy.get('@todo').find('label').dblclick();
        cy.get('@todo').find('.edit').type('{selectall}{backspace}Changes{esc}');

        cy.get('@todo').find('label').should('have.text', todoFixtures[1]);
        cy.get(selectors.todoItems).should('have.length', 2);
      });
    });
  });
});
