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
});
