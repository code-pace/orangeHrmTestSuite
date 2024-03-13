import Admin from '../pageObj/admin';
const employeeName = "Franklin_Odaga"
beforeEach('Navigate to Admin user management module', ()=> {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.login('Admin', 'admin123')
    cy.get('a[href*="viewAdminModule"]').click()
    cy.get('.oxd-topbar-header-breadcrumb').find('.oxd-text--h6:nth-child(1)').invoke('text').then(value=> {
        expect(value).to.equal('Admin')
    })
    cy.get('.oxd-topbar-header-breadcrumb').find('.oxd-text--h6:nth-child(2)').invoke('text').then(value=> {
        expect(value).to.equal('User Management')
    })
})

it('Verify Admin options displayed', ()=> {
    const admin = new Admin()
    admin.validateAdminOptions()
})


it('Verify user can create an employee', ()=> {
    const admin = new Admin()
    admin.gotoUserManagementBtn()
    admin.roleMenuItems()
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', "Add User")
    admin.selectDropdown(0)
    admin.getEmployerInputField().type('Frank Odega Luck')
    admin.getAddEmployeeOptions('Frank Odega Luck').click()
    admin.populateInputField(employeeName, 'Newuser11@', 'Newuser11@')
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can filter by employee username', ()=> {
    const admin = new Admin()
    admin.employeeInputSearchField(employeeName)
    admin.clickEmployeeBtn('Search')
    admin.userExists(employeeName)
})

// it('Verify user can filter by user role', ()=> {

// })

// it('Verify user can filter by status', ()=> {

// })

// it('Verify user can filter by employee name', ()=> {

// })

// it('Verify user can edit an employee detail', ()=> {

// })

// it('Verify user can delete employee detail', ()=> {

// })
