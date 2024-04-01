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
const currencyMatcher = /\/web\/index.php\/api\/v2\/admin\/pay-grades\/\d+\/currencies?/ 
const employeeMatcher = /\/web\/index.php\/api\/v2\/admin\/employment-statuses?/
const jobCatMatcher = /\/web\/index.php\/api\/v2\/admin\/job-categories?/
const workShiftMatcher = /\/web\/index.php\/api\/v2\/admin\/work-shifts?/
const locationMatcher = /\/web\/index.php\/api\/v2\/admin\/locations?/
const payGrade = 'Senior Salary'
const payGrade1 = 'Junior Salary'
const currency = 'NGN - Nigerian Naira'
const employeeStatus = 'Probation'
const employeeStatus1 = 'Fulltime Confirm'
const minSalary = 50000
const maxSalary = 50500
const minSalary1 = 20000
const maxSalary1= 20500
const jobCategory = 'Information Technology'
const jobCategory1 = 'Academia'
const workShift = 'Eastern Timezone +1'
const workShift1 = 'Eastern Timezone +3'
const fromTime = '10:15 AM'
const toTime = '4:30 PM'
const fromTime1 = '12:00 PM'
const toTime1 = '8:30 PM'

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
    admin.selectEmployeeDropdownOptions(0, currency)
    admin.populateInputField(payGrade, minSalary, maxSalary)
    admin.get_submit_btn(1)
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can edit pay grade', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(payGradeMatcher, 'response')
    admin.selectRoleMenuItems('Pay Grades')
    admin.getAddEmployeeTitle().should('have.text', 'Pay Grades')
    admin.interceptRequest(currencyMatcher, 'resp1')
    admin.executeJobTitleAction('response', payGrade, 'edit')
    admin.executeJobTitleAction('resp1', currency, 'edit')
    admin.populateInputField(payGrade1, minSalary1, maxSalary1)
    admin.get_submit_btn(0)
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Updated'))
    admin.get_submit_btn(1)
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Updated'))
})

it('Verify user can delete pay grade', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(payGradeMatcher, 'response')
    admin.selectRoleMenuItems('Pay Grades')
    admin.getAddEmployeeTitle().should('have.text', 'Pay Grades')
    admin.executeJobTitleAction('response', payGrade1, 'delete')
    admin.adminAction(()=> cy.contains("Yes, Delete").click())
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Deleted'))
})

it('Verify user can add new employment status', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.selectRoleMenuItems('Employment Status')
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', 'Add Employment Status')
    admin.employeeInputField(employeeStatus)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can edit employment status', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(employeeMatcher, 'response')
    admin.selectRoleMenuItems('Employment Status')
    admin.getAddEmployeeTitle().should('have.text', 'Employment Status')
    admin.executeJobTitleAction('response', employeeStatus, 'edit')
    admin.getAddEmployeeTitle().should('have.text', 'Edit Employment Status')
    admin.employeeInputField(employeeStatus1)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Updated'))
})

it('Verify user can delete employment status', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(employeeMatcher, 'response')
    admin.selectRoleMenuItems('Employment Status')
    admin.getAddEmployeeTitle().should('have.text', 'Employment Status')
    admin.executeJobTitleAction('response', employeeStatus1, 'delete')
    admin.adminAction(()=> cy.contains("Yes, Delete").click())
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Deleted'))
})

it('Verify user can add new job category', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.selectRoleMenuItems('Job Categories')
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', 'Add Job Category')
    admin.employeeInputField(jobCategory)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can edit job category', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(jobCatMatcher, 'response')
    admin.selectRoleMenuItems('Job Categories')
    admin.executeJobTitleAction('response', jobCategory, 'edit')
    admin.getAddEmployeeTitle().should('have.text', 'Edit Job Category')
    admin.employeeInputField(jobCategory1)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Updated'))
})

it('Verify user can delete job category', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(jobCatMatcher, 'response')
    admin.selectRoleMenuItems('Job Categories')
    admin.getAddEmployeeTitle().should('have.text', 'Job Categories')
    admin.executeJobTitleAction('response', jobCategory1, 'delete')
    admin.adminAction(()=> cy.contains("Yes, Delete").click())
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Deleted'))
})

it('Verify user can add work shifts', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.selectRoleMenuItems('Work Shifts')
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', 'Add Work Shift')
    admin.employeeInputField(workShift)
    admin.selectInputDateField(0)
    admin.selectWorkingTime(fromTime)
    admin.selectInputDateField(1)
    admin.selectWorkingTime(toTime)
    admin.selectInputDateField(1)
    admin.checkDurationDiff(fromTime, toTime)
    admin.getEmployeeInputField().click()
    admin.getEmployeeInputField().clear().type(employeeName)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can edit work shifts', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(workShiftMatcher, 'response')
    admin.selectRoleMenuItems('Work Shifts')
    admin.executeJobTitleAction('response', workShift, 'edit')
    admin.getAddEmployeeTitle().should('have.text', 'Edit Work Shift')
    admin.employeeInputField(workShift1)
    admin.selectInputDateField(0)
    admin.selectWorkingTime(fromTime1)
    admin.selectInputDateField(1)
    admin.selectWorkingTime(toTime1)
    admin.selectInputDateField(1)
    admin.checkDurationDiff(fromTime1, toTime1)
    admin.getEmployeeInputField().click()
    admin.getEmployeeInputField().clear().type(employeeName)
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Updated'))
})

it('Verify user can delete work shifts', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Job')
    admin.interceptRequest(workShiftMatcher, 'response')
    admin.selectRoleMenuItems('Work Shifts')
    admin.getAddEmployeeTitle().should('have.text', 'Work Shifts')
    admin.executeJobTitleAction('response', workShift1, 'delete')
    admin.adminAction(()=> cy.contains("Yes, Delete").click())
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Deleted'))
})

it('Verify user can modify general information', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Organization')
    admin.selectRoleMenuItems('General Information')
    admin.getAddEmployeeTitle().should('have.text', 'General Information')
    admin.toggleCheckbox()
    admin.getElementFromParentElem('input', 'Organization Name', ' ')
    admin.getElementFromParentElem('input', 'Registration Number', '482938')
    admin.getElementFromParentElem('input','Tax ID', 'PD4388')
    admin.getElementFromParentElem('input','Phone', '09055551111')
    admin.getElementFromParentElem('input','Fax', '1111')
    admin.getElementFromParentElem('input','Address Street 1', 'No. 1 cresent street')
    admin.getElementFromParentElem('input','Address Street 2', "Heaven's gate")
    admin.getElementFromParentElem('input','City', 'Bangalore')
    admin.getElementFromParentElem('input','State/Province', 'Karnataka')
    admin.getElementFromParentElem('input','Zip/Postal Code', '560232')
    admin.getElementFromParentElem('select','Country', 'India')
    admin.getElementFromParentElem('textarea', 'Notes', 'Dont stop testing!!!')
    admin.getSubmitBtn()
    admin.getElementFromParentElem('span', 'Organization Name', 'Required')
    admin.getElementFromParentElem('input', 'Organization Name', 'Vodafone')
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Updated'))
    admin.gotoAdminUserDropdown()
    admin.selectRoleMenuItems('About')
    admin.checkAboutInfo('Vodafone')
})

it('Verify user can add new location', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Organization')
    admin.selectRoleMenuItems('Locations')
    admin.clickEmployeeBtn('Add')
    admin.getAddEmployeeTitle().should('have.text', 'Add Location')
    admin.getElementFromParentElem('input', 'Name', 'Vodafone Head Quarter')
    admin.getElementFromParentElem('input','Phone', '09055551111')
    admin.getElementFromParentElem('textarea','Address', 'No. 1 cresent street')
    admin.getElementFromParentElem('input','City', 'Bangalore')
    admin.getElementFromParentElem('input','State/Province', 'Karnataka')
    admin.getElementFromParentElem('input','Zip/Postal Code', '560232')
    admin.getElementFromParentElem('select','Country', 'India')
    admin.getElementFromParentElem('input','Fax', '1111')
    admin.getElementFromParentElem('textarea', 'Notes', 'Dont stop testing!!!')
    admin.getSubmitBtn()
    admin.adminAction(()=> cy.validateSuccessAction('Success', 'Successfully Saved'))
})

it('Verify user can filter location by name, city, country', ()=> {
    const admin = new Admin()
    admin.gotoAdminMenu('Organization')
    admin.selectRoleMenuItems('Locations')
    admin.getElementFromParentElem('input', 'Name', 'Vodafone Head Quarter')
    admin.interceptRequest(locationMatcher, 'response1')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response1')
    admin.checkValueExists('Vodafone Head Quarter')
    admin.getElementFromParentElem('input', 'Name', ' ')
    admin.getElementFromParentElem('input','City', 'Bangalore')
    admin.interceptRequest(locationMatcher, 'response1')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response1')
    admin.checkValueExists('Bangalore')
    admin.getElementFromParentElem('input', 'City', ' ')
    admin.getElementFromParentElem('select','Country', 'India')
    admin.interceptRequest(locationMatcher, 'response1')
    admin.clickEmployeeBtn('Search')
    admin.waitForResponse('response1')
    admin.checkValueExists('India')
})

// it('Verify user can edit location', ()=> {

// })

// it('Verify user can add new organisation structure', ()=> {

// })

// it('Verify user can edit organisation structure', ()=> {

// })