describe('CRUD de Apartamentos - Front React', () => {
  const numeroApartamento = '139'

  beforeEach(() => {
    cy.visit('http://localhost:5173/') 
  })

  it('Adiciona, edita e deleta um apartamento', () => {

    cy.get('input[placeholder="Número do apartamento"]').clear().type(numeroApartamento)
    cy.get('select').select('LIVRE')
    cy.contains('Salvar').click()
    cy.contains(`Apartamento ${numeroApartamento}`).should('exist')
    cy.contains('LIVRE').should('exist')

    cy.contains(`Apartamento ${numeroApartamento}`)
      .parent() 
      .contains('Editar')
      .click()

    cy.get('select').select('OCUPADO')
    cy.contains('Atualizar').click()
    cy.contains(`Apartamento ${numeroApartamento}`)
      .parent()
      .contains('OCUPADO')
      .should('exist')
    cy.contains(`Apartamento ${numeroApartamento}`)
      .parent()
      .contains('Excluir')
      .click()

    cy.contains(`Apartamento ${numeroApartamento}`).should('not.exist')
  })
})
