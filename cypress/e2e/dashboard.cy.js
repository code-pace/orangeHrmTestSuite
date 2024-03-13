import Dashboard from '../pageObj/dashboard';
const dashboard = new Dashboard();
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
    dashboard.validateTitle('Time at Work')
    dashboard.gotoTimeAtWork()  
})

it('Verify My Actions card is displayed', ()=> {
    dashboard.validateTitle('My Actions')
    dashboard.getCurrentUrlLocation()
    dashboard.validateTodoActions()
})

it('Verify Quick Launch card is displayed', ()=> {
    dashboard.validateTitle('Quick Launch')
    dashboard.getCurrentUrlLocation()
    dashboard.getQuickLaunchValues()
    dashboard.validateQuickLaunchOptions()
})

it('Verify Employee on Leave card is displayed', ()=> {
    dashboard.validateTitle('Employees on Leave Today')
    dashboard.validateEmployeeLeave()
    cy.validateSuccessAction('Success', 'Successfully Updated')
})

it('Verify Employee distribution by sub unit card is displayed', ()=> {
    dashboard.validateTitle('Employee Distribution by Sub Unit')
})

it('Verify Employee distribution by location', ()=> {
    
})