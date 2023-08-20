describe('ingredient modal is working', () => {
    before(function() {
        cy.visit('http://localhost:3000');
    });

    it('make order is working', function() {
        cy.get('[data-testid=constructor]').as('constructor');
        cy.get('[data-testid=ingredientsList]').as('ingredients');
        cy.get('[data-testid=makeOrder]').as('makeOrder');
        // cy.get()

        cy.get('@ingredients')
            .children()
            .contains('Краторная булка N-200i')
            .trigger('dragstart')
        cy.get('@constructor')
            .first()
            .trigger('drop');

        cy.get('@ingredients')
            .children()
            .contains('Соус традиционный галактический')
            .trigger('dragstart')
        cy.get('@constructor')
            .first()
            .trigger('drop');

        cy.get('@ingredients')
            .children()
            .contains('Биокотлета из марсианской Магнолии')
            .trigger('dragstart')
        cy.get('@constructor')
            .first()
            .trigger('drop');
        
        cy.get('@makeOrder').click();

    //   cy.get('[data-testid=ingredient]').first().as('ingredient');
    //   cy.get('#modal').as('modal');

    //   cy.get('@ingredient').click();
    //   cy.get('@modal')
    //     .get('[data-testid=modalTitle]')
    //     .contains('Детали ингредиента');
    //   cy.get('@modal').get('[data-testid=closeBtn]').click();
    //   cy.get('@modal')
    //     .get('[data-testid=modalTitle]')
    //     .should('not.exist');
    });
  });