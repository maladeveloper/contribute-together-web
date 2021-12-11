const BASE_URL = 'http://localhost:3000/'

describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit(BASE_URL)
    
    //Click on the dropdown
    cy.get('[role="button"]').click()
    cy.get('[role="option"]').first().click()

    cy.wait(3000)

    cy.get('[role="button"]').eq(1).click()
    cy.get('[role="option"]').first().click()

    cy.get('input').eq(2).click()
    cy.get('[data-garden-id="datepickers.calendar_item"]').eq(1).click()
  })
})
