import Admin from '../pageObj/admin';
const userName = "Patrick_Odaga"
const employeeName = "Odis Adalwin"
const password = 'Newuser11@'
const userName2 = "Harry_test"
const password2 = 'GPSnavigation2@'
const jobTitle = 'Junior Quality Assurance Specialist'
const jobTitle2 = 'Senior Quality Assurance'
const message = 'Testing can be fun when it is done smartly'
const message2 = "My Test philosophy is don't assume that a component cannot be broken after a code change"
const validPngFile = 'cypress/fixtures/files/Screenshot_20231129-091307.png'
const validPDFfile = 'cypress/fixtures/files/Web_Testing_Guidelines.pdf'
const invalidZipFile = 'cypress/fixtures/files/png2jpg.zip'
const invalidMp4File = 'cypress/fixtures/files/491131917992197_wm.mp4'
const largeXlsFile = 'cypress/fixtures/files/Project_Templates.xls'
const matcher = /\/web\/index.php\/api\/v2\/admin\/users?/
const jobTitleMatcher = /\/web\/index.php\/api\/v2\/admin\/job-titles?/
const payGradeMatcher = /\/web\/index.php\/api\/v2\/admin\/pay-grades?/ 
const payGrade = 'Senior Salary'
const minSalary = 50000
const maxSalary = 50500
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
    admin.employeeInputField(userName)
    admin.interceptRequest(matcher, 'response1')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response1')
    admin.checkValueExists(userName)
})

it('Verify user can filter by user role', ()=> {
    const admin = new Admin()
    /**Test ADMIN user role option */
    admin.selectEmployeeDropdownOptions(0, 'Admin')
    admin.interceptRequest(matcher, 'response2')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response2')
    admin.checkValueExists('Admin')
    /**Test ESS user role option */
    admin.selectEmployeeDropdownOptions(0, 'ESS')
    admin.interceptRequest(matcher, 'response3')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response3')
    admin.checkValueExists('ESS')
})

it('Verify user can filter by status', ()=> {
    const admin = new Admin()
    /**Test Enabled Status */
    admin.selectEmployeeDropdownOptions(1, 'Enabled')
    admin.interceptRequest(matcher, 'response4')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response4')
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
    admin.interceptRequest(matcher, 'response5')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response5')
    admin.checkValueExists(employeeName)
})

it('Verify user can edit an employee detail', ()=> {
    const admin = new Admin()
    admin.employeeInputField(userName)
    admin.interceptRequest(matcher, 'response6')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response6')
    admin.checkValueExists(userName)
    admin.clickRecordActionBtn("edit")
    admin.adminAction(()=> cy.wait(1000))
    admin.getAddEmployeeTitle().should('have.text', "Edit User")
    admin.selectEmployeeDropdownOptions(0, 'ESS')
    admin.selectEmployeeDropdownOptions(1, 'Disabled')
    admin.checkDisplayPassword()
    admin.populateInputField(userName2, password2, password2)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
    admin.employeeInputField(userName2)
    admin.interceptRequest(matcher, 'response6')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response6')
    admin.checkValueExists(userName2)
    admin.checkValueExists('ESS')
    admin.checkValueExists('Disabled')
})

it('Verify user can delete employee detail', ()=> {
    const admin = new Admin()
    admin.employeeInputField(userName2)
    admin.interceptRequest(matcher, 'response7')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response7')
    admin.checkValueExists(userName2)
    admin.clickRecordActionBtn("delete")
    admin.adminAction(()=> cy.contains("No, Cancel").click())
    admin.clickEmployeeBtn('Search')
    admin.clickRecordActionBtn("delete")
    admin.adminAction(()=> cy.contains("Yes, Delete").click())
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Deleted'))
    admin.clickEmployeeBtn('Search')
    admin.adminAction(()=> cy.validateSuccessAction('Info', 'No Records Found'))
})

it('Verify user can add new job title', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.selectRoleMenuItems('Job Titles')
    admin.getAddEmployeeTitle().should('have.text', 'Job Titles')
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', 'Add Job Title')
    admin.employeeInputField(jobTitle)
    admin.addDescription('Job Description', message)
    admin.addDescription('Note', message)
    admin.uploadFile(validPngFile).should('not.exist')
    admin.uploadFile(invalidZipFile).should('have.text', 'File type not allowed')
    admin.uploadFile(invalidMp4File).should('have.text', 'File type not allowed')
    admin.uploadFile(largeXlsFile).should('have.text', 'Attachment Size Exceeded')
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.get('div.oxd-toast-content--success').should('not.exist'))
    admin.uploadFile(validPngFile)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can edit job title', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(jobTitleMatcher, 'response8')
    admin.selectRoleMenuItems('Job Titles')
    admin.getAddEmployeeTitle().should('have.text', 'Job Titles')
    admin.executeJobTitleAction('response8', jobTitle, 'edit')
    admin.getAddEmployeeTitle().should('have.text', 'Edit Job Title')
    admin.employeeInputField(jobTitle2)
    admin.addDescription('Job Description', message2)
    admin.addDescription('Note', message2)
    admin.editUploadedFile(validPDFfile)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can delete job title', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(jobTitleMatcher, 'response9')
    admin.selectRoleMenuItems('Job Titles')
    admin.getAddEmployeeTitle().should('have.text', 'Job Titles')
    admin.executeJobTitleAction('response9', jobTitle2, 'delete')
    admin.adminAction(()=> cy.contains("Yes, Delete").click())
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Deleted'))
})

it('Verify user can add new pay grade', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(payGradeMatcher, 'response')
    admin.selectRoleMenuItems('Pay Grades')
    admin.getAddEmployeeTitle().should('have.text', 'Pay Grades')
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', 'Add Pay Grade')
    admin.employeeInputField(payGrade)
    admin.getSubmitBtn()
    admin.clickEmployeeBtn('Add')
    admin.selectEmployeeDropdownOptions(0, 'NGN - Nigerian Naira')
    admin.populateInputField(payGrade, minSalary, maxSalary)
    admin.get_submit_btn(1)
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

// it('Verify user can edit pay grade', ()=> {
//     const admin = new Admin()
//     admin.gotoAdminMenu('Job')
//     admin.interceptRequest(payGradeMatcher, 'response')
//     admin.selectRoleMenuItems('Pay Grades')
//     admin.getAddEmployeeTitle().should('have.text', 'Pay Grades')
//     admin.executeJobTitleAction('response', payGrade, 'edit')
//     admin.getAddEmployeeTitle().first().should('have.text', 'Edit Pay Grade')  
// })

// it('Verify user can delete pay grade', ()=> {

// })

// it('Verify user can add new employment status', ()=> {

// })

// it('Verify user can edit employment status', ()=> {

// })

// it('Verify user can delete employment status', ()=> {

// })