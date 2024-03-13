class Admin {
    options = ["User Management", "Job", "Organization", 
    "Qualifications", "Nationalities", "Corporate Branding", "Configuration", "More"];
    getAdminOptions() {
        return cy.get('.oxd-topbar-body-nav-tab')
    }
    gotoUserManagementBtn() {
        cy.xpath('//span[text()="User Management "]').click()
    }
    roleMenuItems() {
        cy.get('a[role="menuitem"]').click()
    }
    clickEmployeeBtn(text) {
        cy.xpath(`//button[text()=" ${text} "]`).click()
    }
    getAddEmployeeTitle() {
        return cy.get('h6.orangehrm-main-title')
    }
    getAddEmployeeOptions(text) {
        return cy.xpath(`//div[@role="option"]//span[text()="${text}"][1]`)
    }
    getSubmitBtn() {
        cy.get('button[type="submit"]').click()
    }
    getEmployerInputField() {
        return cy.get('input[placeholder="Type for hints..."]')
    }
    employeeInputSearchField(employee) {
        cy.get('div[data-v-957b4417] > input').type(employee)
    }
    selectDropdown(id) {
        cy.get('div.oxd-select-text--active').each((elem, index) => {
            if(index == id) {
                cy.wrap(elem).click()
                this.getAddEmployeeOptions('Admin').click()
            }
            else {
                cy.wrap(elem).click()
                this.getAddEmployeeOptions('Enabled').click()
            }
        })
    }
    populateInputField(username, password1, password2) {
        cy.xpath('//div[contains(@class,"oxd-input-group")]//input[contains(@class,"oxd-input--active")]').each((elem, index)=> {
            if(index == 0) {
                cy.wrap(elem).type(username)
            }
            else if(index == 1) {
                cy.wrap(elem).type(password1)
            }
            else if(index == 2) {
                cy.wrap(elem).type(password2)
            }
        })
    }
    navigateToAdminModule() {
        cy.get('a[href*="viewAdminModule"]').click()
        cy.get('.oxd-topbar-header-breadcrumb').find('.oxd-text--h6:nth-child(1)').invoke('text').then(value=> {
            expect(value).to.equal('Admin')
        })
        cy.get('.oxd-topbar-header-breadcrumb').find('.oxd-text--h6:nth-child(2)').invoke('text').then(value=> {
            expect(value).to.equal('User Management')
        })
    }

    validateAdminOptions() {
        this.getAdminOptions().each(elem => {
            cy.wrap(elem).find('span').invoke('text').then(value => {
                expect(this.options.includes(value.trim())).to.be.true;
            })
        })
    }

    userExists(username) {
        cy.get('div.oxd-table-card:nth-child(1)').contains(username)
    }
    adminAction(cypressMethod) {
        cypressMethod();
    }
    filterByUserRole() {

    }
}

export default Admin;