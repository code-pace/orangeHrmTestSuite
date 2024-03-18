class Admin {
    options = ["User Management", "Job", "Organization", 
    "Qualifications", "Nationalities", "Corporate Branding", "Configuration", "More"];
    getAdminOptions() {
        return cy.get('.oxd-topbar-body-nav-tab')
    }
    gotoUserManagementBtn() {
        cy.xpath('//span[text()="User Management "]').click()
    }
    gotoAdminMenu(menu) {
        cy.xpath(`//span[text()="${menu} "]`).click()
    }
    roleMenuItems() {
        cy.get('a[role="menuitem"]').click()
    }
    selectRoleMenuItems(menuItem) {
        cy.xpath(`//a[@role="menuitem" and text()="${menuItem}"]`).click()
    }
    clickEmployeeBtn(text) {
        cy.xpath(`//button[text()=" ${text} "]`).click()
    }
    getAddEmployeeTitle() {
        return cy.get('h6.orangehrm-main-title')
    }
    getAddEmployeeOptions(text) {
        return cy.get('div[role="option"]').contains(text)
        //return cy.xpath(`//div[@role="option"]//span[text()="${text}"][1]`)
    }
    getSubmitBtn() {
        cy.get('button[type="submit"]').click()
    }
    getEmployeeInputField() {
        return cy.get('input[placeholder="Type for hints..."]')
    }
    employeeInputField(employee) {
        cy.get('div[data-v-957b4417] > input.oxd-input--active').clear().type(employee)
    }
    addDescription(field, message) {
        const fields = []
        cy.get('textarea.oxd-textarea--active').each(value=> {
            fields.push(value)
        }).then(()=> {
            if(field == 'Job Description') {
                cy.wrap(fields[0]).clear().type(message)
            }
            else if(field == 'Note') {
                cy.wrap(fields[0]).clear().type(message)
            }
        })
    }
    checkDisplayPassword() {
        cy.get('input[type="checkbox"]').should('not.be.checked')
        cy.xpath('//div[contains(@class,"oxd-input-group")]//input[contains(@class,"oxd-input--active")]').each((elem, index)=> {
            if(index == 1) {
                cy.wrap(elem).should('not.be.visible')
            }
            else if(index == 2) {
                cy.wrap(elem).should('not.be.visible')
            }
        })
        cy.get('input[type="checkbox"]').check({force: true})

    }
   selectEmployeeDropdownOptions(id, options) {
    const dropdown = []
    cy.get('div.oxd-select-text--active').each(value => {
        dropdown.push(value)
    }).then(()=> {
        cy.wrap(dropdown[id]).click()
        this.getAddEmployeeOptions(options).click()
    })
   }
   clickRecordActionBtn(action) {
    const actions = []
    cy.get('div[data-v-c423d1fa]').each(value => {
        actions.push(value)
    }).then(()=> {
        if(action == "edit") {
            cy.wrap(actions[0]).find('button:nth-child(2)').click()
        }
        else if(action == "delete") {
            cy.wrap(actions[0]).find('button:nth-child(1)').click()
        }  
    })
   }
    populateInputField(username, password1, password2) {
        cy.xpath('//div[contains(@class,"oxd-input-group")]//input[contains(@class,"oxd-input--active")]').each((elem, index)=> {
            if(index == 0) {
                cy.wrap(elem).clear().type(username)
            }
            else if(index == 1) {
                cy.wrap(elem).clear().type(password1)
            }
            else if(index == 2) {
                cy.wrap(elem).clear().type(password2)
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

    checkValueExists(name) {
        const records = []
        cy.get('div.oxd-table-card:nth-child(1)').each(value => {
            records.push(value)
        }).then(()=> {
            cy.wrap(records[0]).contains(name)
        })
    }
    adminAction(cypressMethod) {
        cypressMethod();
    }
    uploadFile(filePath) {
        cy.get('input[type="file"].oxd-file-input').selectFile(filePath, { force: true })
        cy.wait(1000)
        cy.get('div.oxd-file-input-div').invoke('text').then(value => {
            expect(filePath).to.include(value)
        })
        return cy.get('span.oxd-input-field-error-message')
    }
    interceptRequest(url, resp) {
        cy.intercept({
            method: 'GET',
            url: url
        }).as(resp)
    }
    waitForResponse(resp) {
        cy.wait(`@${resp}`).then(interception=> {
            expect(interception.response.statusCode).to.eq(200);
        })
        cy.wait(1000)
    }
}

export default Admin;