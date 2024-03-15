import Admin from '../pageObj/admin';
const userName = "Franklin_Odaga"
const employeeName = "Odis  Adalwin"
const password = 'Newuser11@'
const userName2 = "HarryDtester"
const password2 = 'GPSnavigation2@'
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
    admin.selectEmployeeDropdownOptions(0, 'Admin')
    admin.selectEmployeeDropdownOptions(1, 'Enabled')
    admin.getEmployeeInputField().type(employeeName)
    admin.getAddEmployeeOptions(employeeName).click()
    admin.populateInputField(userName, password, password)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can filter by employee username', ()=> {
    const admin = new Admin()
    admin.employeeInputSearchField(userName)
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists(userName)
})

it('Verify user can filter by user role', ()=> {
    const admin = new Admin()
    /**Test ADMIN user role option */
    admin.selectEmployeeDropdownOptions(0, 'Admin')
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists('Admin')
    /**Test ESS user role option */
    admin.selectEmployeeDropdownOptions(0, 'ESS')
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists('ESS')
})

it('Verify user can filter by status', ()=> {
    const admin = new Admin()
    /**Test Enabled Status */
    admin.selectEmployeeDropdownOptions(1, 'Enabled')
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists('Enabled')
    /**Test Disabled Status */
    admin.selectEmployeeDropdownOptions(1, 'Disabled')
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists('Disabled')
})

it('Verify user can filter by employee name', ()=> {
    const admin = new Admin()
    admin.getEmployeeInputField().type(employeeName)
    admin.getAddEmployeeOptions(employeeName).click()
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists(employeeName)
})

it('Verify user can edit an employee detail', ()=> {
    const admin = new Admin()
    admin.employeeInputSearchField(userName)
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists(userName)
    admin.clickEditBtn()
    admin.adminAction(()=> cy.wait(2000))
    admin.getAddEmployeeTitle().should('have.text', "Edit User")
    admin.selectEmployeeDropdownOptions(0, 'ESS')
    admin.selectEmployeeDropdownOptions(1, 'Disabled')
    admin.checkDisplayPassword()
    admin.populateInputField(userName2, password2, password2)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
    admin.employeeInputSearchField(userName2)
    admin.clickEmployeeBtn('Search')
    admin.checkValueExists(userName2)
    admin.checkValueExists('ESS')
    admin.checkValueExists('Disabled')
})

// it('Verify user can delete employee detail', ()=> {

// })
