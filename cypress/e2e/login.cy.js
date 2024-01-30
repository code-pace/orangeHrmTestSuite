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
  cy.contains('Logout').click()
  cy.get("h5.orangehrm-login-title").should('have.text', 'Login') 
})

it('user is redirected to the password reset page when forgot your password link is clicked', ()=> {
  cy.contains('Forgot your password?').click()
  cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password')
})
it('user cannot reset password with an empty field', ()=> {
  cy.contains('Forgot your password?').click()
  cy.get('input[name="username"]').clear()
  cy.get('button[type="submit"]').click()
  cy.get('span.oxd-input-field-error-message').should('have.text', 'Required')
})
it('user can reset password', ()=> {
  cy.contains('Forgot your password?').click()
  cy.get('input[name="username"]').clear().type('Admin')
  cy.get('button[type="submit"]').click()
  cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password link sent successfully')
})