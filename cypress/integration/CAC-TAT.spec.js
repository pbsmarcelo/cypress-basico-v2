/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function( ){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, testando, textão, Teste, testando, textão, Teste, testando, textão, Teste, testando, textão, Teste, testando, textão, Teste, testando, textão, Teste, testando, textão, '
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Patrik')
        cy.get('#email').type('patrik@curso.br')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longText = 'Testando a digitação'
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Patrik')
        cy.get('#email').type('patrik#curso.br')
        cy.get('#open-text-area').type(longText, {delay:0})
        //cy.get('button[type="submit"]').click()
        //Usando o cy.contains ao inves do cy.get
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone contia vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone').type('abcdefghijklmno').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Patrik')
        cy.get('#email').type('patrik@curso.br')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Marcelo')
            .should('have.value', 'Marcelo')
            .clear()
            .should('have.value', '')

        cy.get('#lastName').type('Bitencourt')
            .should('have.value', 'Bitencourt')
            .clear()
            .should('have.value', '')
        
        
        cy.get('#email').type('marcelo@xx.br')
            .should('have.value', 'marcelo@xx.br')
            .clear()
            .should('have.value', '')

        cy.get('#email').type('marcelo@xx.br')
            .should('have.value', 'marcelo@xx.br')
            .clear()
            .should('have.value', '')
        
        cy.get('#open-text-area').type("Testando a escrita")
            .should('have.value', 'Testando a escrita')
            .clear()
            .should('have.value', '')
    })

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
})

it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product')
        .select('youtube')
        .should('have.value','youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
})

it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
})

it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
})

it.only('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio')
    .should('have.length', 3)
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
})

  })
  