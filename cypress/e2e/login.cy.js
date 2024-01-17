beforeEach('Visit orange hrm url', ()=> {
  cy.visit('https://opensource-demo.orangehrmlive.com/')
})
it('Verify orange hrm login page', () => {
  cy.get("h5.orangehrm-login-title").should('have.text', 'Login')
  cy.get("p.orangehrm-copyright:nth-child(1)").invoke('text').then(value => {
    let newValue;
    if(value.startsWith("OrangeHRM OS")) {
      newValue = value.slice("OrangeHRM OS".length, value.length)
      let number = Number.parseFloat(newValue.trim())
      expect(number).to.be.greaterThan(5.0)
    }
  })
})
it('login with valid username and invalid password', ()=> {
  cy.login("Admin", "admin9090")
  cy.get("p.oxd-alert-content-text").should('have.text', 'Invalid credentials')
})

it('login with invalid username and invalid password', ()=> {
  cy.login("tester", "tester123")
  cy.get("p.oxd-alert-content-text").should('have.text', 'Invalid credentials')
})

it('login with invalid username and valid password', ()=> {
  cy.login("tester", "admin123")
  cy.get("p.oxd-alert-content-text").should('have.text', 'Invalid credentials')
})

it('login with valid username and valid password', ()=> {
  cy.login("Admin", "admin123")
  cy.location().should(location => {
    expect(location.pathname).to.contain('web/index.php/')
  })
})

it('Verify user can logout and redirected to the login page', ()=> {
  cy.login("Admin", "admin123")
  cy.get('.oxd-userdropdown-tab').click()
  cy.wait(3000)
  cy.contains('Logout').click()
  cy.wait(3000)
  cy.get("h5.orangehrm-login-title").should('have.text', 'Login') 
})