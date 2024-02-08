beforeEach('Navigate to Admin user management module', ()=> {
    //a[href*='viewAdminModule']
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.login('Admin', 'admin123')
    cy.get('a[href*="viewAdminModule"]').click()
    cy.get('.oxd-topbar-header-breadcrumb').find('.oxd-text--h6:nth-child(1)').invoke('text').then(value=> {
        expect(value).to.equal('Admin')
    })
    //
    cy.get('.oxd-topbar-header-breadcrumb').find('.oxd-text--h6:nth-child(2)').invoke('text').then(value=> {
        expect(value).to.equal('User Management')
    })
})

it('Verify Admin options displayed', ()=> {
    const options = ["User Management", "Job", "Organization", 
    "Qualifications", "Nationalities", "Corporate Branding", "Configuration", "More"];
    cy.get('.oxd-topbar-body-nav-tab').as('admin_options')
    cy.get('@admin_options').each(elem => {
        cy.wrap(elem).find('span').invoke('text').then(value => {
            console.log(value)
            options.includes(value)
            expect(options.includes(value.trim())).to.be.true;
        })
    })
})

it('Verify user can create an employee', ()=> {
    cy.xpath('//span[text()="User Management "]').click()
    cy.get('a[role="menuitem"]').click()
    cy.xpath('//button[text()=" Add "]').click()
    cy.get('h6.orangehrm-main-title').should('have.text', "Add User")
    cy.get('div.oxd-select-text--active').each((elem, index) => {
        if(index == 0) {
            cy.wrap(elem).click()
        }
    })
    cy.xpath('//div[@role="option"]//span[text()="Admin"]').click()
    cy.get('input[placeholder="Type for hints..."]').type("Odis  Adalwin")
    cy.xpath('//div[@role="option"]//span[text()="Odis  Adalwin"]').click()
    cy.get('div.oxd-select-text--active').each((elem, index) => {
        if(index == 1) {
            cy.wrap(elem).click()
            cy.xpath('//div[@role="option"]//span[text()="Enabled"]').click()
        }
    })
    cy.xpath('//div[contains(@class,"oxd-input-group")]//input[contains(@class,"oxd-input--active")]').each((elem, index)=> {
        if(index == 0) {
            cy.wrap(elem).type("mike_essien")
        }
        else if(index == 1) {
                cy.wrap(elem).type("Newuser11@")
        }
        else if(index == 2) {
                cy.wrap(elem).type("Newuser11@")
        }
    })
    cy.get('button[type="submit"]').click()
    cy.get('div.oxd-toast-content--success').should('contain', 'Success')
    cy.get('div.oxd-toast-content--success').should('contain', 'Successfully Saved')
})

it('Verify user can filter by employee username', ()=> {
    cy.get('div[data-v-957b4417] > input').type("mike_essien")
    cy.xpath('//button[text()=" Search "]').click()
    cy.get('div.oxd-table-card:nth-child(1)').contains("mike_essien")
    // cy.get('div.oxd-table-card:nth-child(1)').find('div[data-v-6c07a142]').each((elem, index) => {
    //     if(index == 1) {
    //         cy.wrap(elem).should('contain', "mike_essien")
    //     }
    // })
})

it('Verify user can filter by user role', ()=> {

})

it('Verify user can filter by status', ()=> {

})

it('Verify user can filter by employee name', ()=> {

})

it('Verify user can edit an employee detail', ()=> {

})

it('Verify user can delete employee detail', ()=> {

})
