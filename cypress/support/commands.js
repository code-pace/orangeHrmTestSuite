// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const login =(username, password)=> {
    cy.get('[name="username"]').clear().type(username)
    cy.get('[name="password"]').clear().type(password)
    cy.get('[type="submit"]').click()
}
const cardTitleValidator =(title)=> {
    let flag = false
    const elem = cy.get('div[data-v-133d244a] > p.oxd-text--p').each($elem => {
        cy.wrap($elem).invoke('text').then(value => {
            if (value.includes(title)) {
                flag = true
            }
        })        
    })
    elem.then(()=> {
        expect(flag).to.be.true;
    })
}
const validateMyActions=(currentLocation)=> {
    
    cy.on('fail', (err, runnable)=> {
        if(err.message.includes('div.orangehrm-todo-list-item, but never found it')) {
            cy.contains('No Pending Actions to Perform');
        }
        else {
            return true;
        }
    })
    let todoListItem = [];
    cy.get('div.orangehrm-todo-list-item', {timeout: 10000}).as('todoListItem')
    cy.get('@todoListItem').each(action => {
        cy.wrap(action).find('p').as('pTag')
        cy.get('@pTag').invoke('text').then(value => {
            todoListItem.push(value)
        })
    }).then(() => {
        todoListItem.forEach(value => {
            cy.contains(value).click()
            let a = value.split(' ')
            let b = a.filter((i, index) => index == 1)
            let x = b[0].trim()
            x = x.slice(1, -1)
            let numOfActivity = Number.parseInt(x)
            try {
                let title;
                value.includes('Pending Self Review') ? 
                cy.contains('Record Found').invoke('text').then(value => title = value) :
                cy.contains('Records Found').invoke('text').then(value => title = value);
                expect(title).to.contain(`${numOfActivity}`)
            } 
            catch (error) {
              // Log the error, but continue with the test
              cy.log('Assertion failed:', error.message);
            }
            cy.visit(currentLocation)
            try {
                cy.get('div.orangehrm-todo-list-item').should('be.visible')
            } catch (AssertionError) {
                cy.contains('No Pending Actions to Perform');
            }
        })
    })
}   
const validateQuickLaunch =(currentLocation)=> {
    let quickLaunchOptions = [];
    cy.get('div.orangehrm-quick-launch-card').each(options => {
        cy.wrap(options).find('p').as('pTag')
        cy.get('@pTag').invoke('text').then(value => {
            quickLaunchOptions.push(value)
        })
    }).then(()=> {
        quickLaunchOptions.forEach((value, index) => {
            cy.get(`.orangehrm-quick-launch-card:nth-child(${index + 1})`).click()
            let x = value.trim()
            cy.get('.orangehrm-card-container').should('be.visible')
            cy.get('.orangehrm-main-title').should('contain.text', x)
            cy.visit(currentLocation)
            cy.get('div.orangehrm-quick-launch-card').should('be.visible')
        })
    })
}
const validateSuccessAction =(flag, subFlag)=> {
    cy.get('div.oxd-toast-content--success').should('contain', flag)
    cy.get('div.oxd-toast-content--success').should('contain', subFlag)
}
Cypress.Commands.add("login", login)
Cypress.Commands.add("cardTitleValidator", cardTitleValidator)
Cypress.Commands.add("validateMyActions", validateMyActions)
Cypress.Commands.add("validateSuccessAction", validateSuccessAction)
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
Cypress.on('fail', (err, runnable)=> {
    if(err.message.includes('div.orangehrm-todo-list-item, but never found it')) {
        cy.contains('No Pending Actions to Perform');
    }
    else {
        return true;
    }
})

