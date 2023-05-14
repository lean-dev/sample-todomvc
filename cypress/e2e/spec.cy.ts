const selectors = {
  newTodo: '.new-todo',
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

  describe('Mark all as completed', () => {
    beforeEach(() => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.createTodo(todoFixtures[2]);
      cy.get(selectors.todoItems).as('todos');
      cy.get('.toggle-all').as('toggleAll');
    });

    it('should allow me to mark all items as completed', () => {
      cy.get('@toggleAll').check();

      cy.get('@todos').eq(0).should('have.class', 'completed');
      cy.get('@todos').eq(1).should('have.class', 'completed');
      cy.get('@todos').eq(2).should('have.class', 'completed');
    });

    it('should allow me to clear the complete state of all items', () => {
      cy.get('@toggleAll').check();
      cy.get('@toggleAll').uncheck();

      cy.get('@todos').eq(0).should('not.have.class', 'completed');
      cy.get('@todos').eq(1).should('not.have.class', 'completed');
      cy.get('@todos').eq(2).should('not.have.class', 'completed');
    });

    it('complete all checkbox should update state when items are completed / cleared', function () {
      cy.get('@toggleAll').should('not.be.checked');

      cy.get('@toggleAll').check();
      cy.get('@toggleAll').should('be.checked');

      cy.get(selectors.todoItems).first().as('firstTodo').find('.toggle').uncheck();
      cy.get('@toggleAll').should('not.be.checked');

      cy.get('@firstTodo').find('.toggle').check();
      cy.get('@toggleAll').should('be.checked');
    });
  });

  describe('Counter', () => {
    beforeEach(() => {
      cy.createTodo(todoFixtures[0]).as('firstTodo');
      cy.get('.todo-count').as('todoCount');
    });

    it('should display the current number of todo items', function () {
      cy.get('@todoCount').contains('1');
      cy.createTodo(todoFixtures[1]).as('secondTodo');
      cy.get('@todoCount').contains('2');
      cy.createTodo(todoFixtures[2]).as('thirdTodo');
      cy.get('@todoCount').contains('3');
      cy.get('@firstTodo').find('.toggle').check();
      cy.get('@todoCount').contains('2');
      cy.get('@firstTodo').find('.destroy').click({ force: true });
      cy.get('@todoCount').contains('2');
      cy.get('@secondTodo').find('.destroy').click({ force: true });
      cy.get('@todoCount').contains('1');
    });

    it('should pluralize the item-word', () => {
      cy.get('@firstTodo').find('.toggle').check();
      cy.get('@todoCount').contains('0 items left');
      cy.get('@firstTodo').find('.toggle').uncheck();
      cy.get('@todoCount').contains('1 item left');
      cy.createTodo(todoFixtures[1]);
      cy.get('@todoCount').contains('2 items left');
      cy.createTodo(todoFixtures[2]);
      cy.get('@todoCount').contains('3 items left');
    });
  });

  describe('Clear completed button', () => {
    beforeEach(() => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.createTodo(todoFixtures[2]);
      cy.createTodo(todoFixtures[3]);
      cy.get(selectors.todoItems).as('todos');
      cy.get('.clear-completed').as('clearCompleted');
    });

    it('should be visible if there are completed todos', () => {
      cy.get('@todos').first().find('.toggle').check();
      cy.get('@clearCompleted').should('be.visible');
    });

    it('should remove completed items when clicked', () => {
      cy.get('@todos').eq(0).find('.toggle').check();
      cy.get('@todos').eq(1).find('.toggle').check();
      cy.get('@todos').eq(3).find('.toggle').check();
      cy.get('@clearCompleted').click();
      cy.get('@todos').should('have.length', 1);
      cy.get('@todos').eq(0).should('contain', todoFixtures[2]);
    });

    it('should be hidden when there are no items that are completed', () => {
      cy.get('@clearCompleted').should('not.be.visible');
      cy.get('@todos').first().find('.toggle').check();
      cy.get('@clearCompleted').should('be.visible').click();
      cy.get('@clearCompleted').should('not.be.visible');
    });
  });

  describe('Routing', () => {
    beforeEach(() => {
      cy.createTodo(todoFixtures[0]);
      cy.createTodo(todoFixtures[1]);
      cy.createTodo(todoFixtures[2]);
      cy.get(selectors.todoItems).as('todos');
      cy.get('.filters').as('filters');
    });

    it('should allow me to display active items', () => {
      cy.get('@todos').eq(1).find('.toggle').check();
      cy.get('@filters').contains('Active').click();
      cy.get(selectors.todoItems).should('have.length', 2).first().should('contain', todoFixtures[0]);
      cy.get(selectors.todoItems).eq(1).should('contain', todoFixtures[2]);
    });

    it('should allow me to display completed items', () => {
      cy.get('@todos').eq(1).find('.toggle').check();
      cy.get('@filters').contains('Completed').click();
      cy.get(selectors.todoItems).should('have.length', 1);
    });

    it('should allow me to display all items', () => {
      cy.get('@todos').eq(1).find('.toggle').check();
      cy.get('@filters').contains('Active').click();
      cy.get('@filters').contains('Completed').click();
      cy.get('@filters').contains('All').click();
      cy.get(selectors.todoItems).should('have.length', 3);
    });

    it('should highlight the currently applied filter', () => {
      cy.get('@filters').contains('All').should('have.class', 'selected');

      cy.get('@filters').contains('Active').click();
      cy.get('@filters').contains('Active').should('have.class', 'selected');

      cy.get('@filters').contains('Completed').click();
      cy.get('@filters').contains('Completed').should('have.class', 'selected');
    });

    it('should respect the back button', function () {
      cy.get('@todos').first().find('.toggle').check();

      cy.log('Showing all items');
      cy.get('@filters').contains('All').click();
      cy.log('Showing active items');
      cy.get('@filters').contains('Active').click();
      cy.log('Showing completed items');
      cy.get('@filters').contains('Completed').click();

      cy.log('Back to active items');
      cy.go('back');
      cy.get(selectors.todoItems).should('have.length', 2);

      cy.log('Back to all items');
      cy.go('back');
      cy.get(selectors.todoItems).should('have.length', 3);
    });
  });
});
