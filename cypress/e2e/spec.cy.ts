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
    it.skip('should focus the input field on page load', () => {
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
  });
});
