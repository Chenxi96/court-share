
before(() => {
  cy.task('mockUser')
})

after(() => {
  cy.task('deleteUser')
  cy.task('deletePost')
})

describe('Get to create Post page and create a post', function () {

  it('Get to home page', () => {
    cy.visit('/')
    cy.get('.createPost').contains('New post')
    cy.get('h1').contains('Public Posts')
  })
  
  it('navigate to create page', () => {
    cy.visit('/')
    cy.get('.createPost').click()
    cy.get('#title').type('ball runs')
    cy.get('#location').type('Air Canada Centre, 50 Bay St. #500, Toronto, ON M5J 2L2')
    cy.get('#description').type('We need 4 more')
    cy.get('#availableSpots').type('4')
    cy.get('[type="datetime-local"]').type('2024-10-01T08:30')
    cy.get('[type="submit"]').click()
    cy.wait(500)
    cy.get('.PostCreated').contains('Post created')
  })

  it('checking if post has been created', () => {
    cy.visit('/')
    cy.get('h2').contains('ball runs')
  })
  
})