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
      cy.get(selectors.newTodo).type(`${todoFixtures[0]}{enter}`);
      cy.contains(todoFixtures[0]);
      cy.get(selectors.newTodo).type(`${todoFixtures[1]}{enter}`);
      cy.contains(todoFixtures[1]);
      cy.get(selectors.todoItems).should('have.length', 2);
    });

    it('should trim then entered title', () => {
      cy.get(selectors.newTodo).type(` ${todoFixtures[0]} {enter}`);
      cy.get(selectors.todoItems).first().find('label').should('have.text', todoFixtures[0]);
    });

    it('should not allow me to add empty todo items', () => {
      cy.get(selectors.newTodo).type(`{enter}`);
      cy.get(selectors.todoItems).should('have.length', 0);
    });
  });
});
