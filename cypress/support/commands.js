
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Patrik')
    cy.get('#email').type('patrik@curso.br')
    cy.get('#open-text-area').type('Testando o comando customizado')
    cy.get('button[type="submit"]').click()
})