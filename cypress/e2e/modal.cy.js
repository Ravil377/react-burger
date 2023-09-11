describe('ingredient modal is working', () => {
    before(function() {
        cy.visit('/');
    });

    it('opens and closes ingredient modal', function() {
      cy.get('[data-testid=ingredient]').first().as('ingredient');
      cy.get('#modal').as('modal');

      cy.get('@ingredient').click();
      cy.get('@modal')
        .get('[data-testid=modalTitle]')
        .contains('Детали ингредиента');
      cy.get('@modal').get('[data-testid=closeBtn]').click();
      cy.get('@modal')
        .get('[data-testid=modalTitle]')
        .should('not.exist');
    });
  });