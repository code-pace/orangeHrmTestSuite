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