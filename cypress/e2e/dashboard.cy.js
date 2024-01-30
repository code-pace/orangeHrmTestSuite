beforeEach('Navigate to Dashboard', ()=> {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.login('Admin', 'admin123')
    cy.get('.oxd-topbar-header-breadcrumb-module').invoke('text').then(value => {
        if(value != 'Dashboard') {
            cy.get('a[href*="dashboard/index"]').click()
            cy.get('.oxd-topbar-header-breadcrumb-module').should('have.text', 'Dashboard')
        }
    })
})

it('Verify TIME AT WORK card is displayed', ()=> {
    let cardState;
    cy.cardTitleValidator('Time at Work')
    cy.get('.orangehrm-attendance-card-state').invoke('text').then(value => {
        cardState = value.trim()
        cy.get('button.orangehrm-attendance-card-action').click()
        cy.get('div.oxd-loading-spinner-container', {timeout: 10000}).should('not.exist')
        cy.get('h6.orangehrm-main-title').should('have.text', cardState == 'Punched In' ? 'Punch Out': 'Punch In')
    })
    
})

it('Verify My Actions card is displayed', ()=> {
    let currentLocation;
    cy.cardTitleValidator('My Actions')
    cy.location().then(location => {
        currentLocation = location.href;
        cy.validateMyActions(currentLocation)
    })
})

it('Verify Quick Launch card is displayed', ()=> {
    cy.cardTitleValidator('Quick Launch')
    cy.location().then(location => {
        currentLocation = location.href;
        cy.validateQuickLaunch(currentLocation)
    })
})

it('Verify Employee on Leave card is displayed', ()=> {
    cy.cardTitleValidator('Employees on Leave Today')
    cy.get('.orangehrm-leave-card-icon').click()
    cy.get('.orangehrm-modal-header').should('contain', 'Employees on Leave Today')
    cy.get('.orangehrm-modal-header').should('contain', 'Configurations')
    cy.get('input[type="checkbox"]').then(input => {
        if(!input.checked) {
            cy.get('input[type="checkbox"]').check()
        }
    })
    cy.get('input[type="checkbox"]').should('be.checked')
    cy.get('button[type="submit"]').click()
    cy.get('div.oxd-toast-content--success').should('contain', 'Success')
    cy.get('div.oxd-toast-content--success').should('contain', 'Successfully Updated')
})

it('Verify Employee distribution by sub unit card is displayed', ()=> {
    cy.cardTitleValidator('Employee Distribution by Sub Unit')
    
})

it('Verify Employee distribution by location', ()=> {
    
})