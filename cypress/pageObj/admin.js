class Admin {
    options = ["User Management", "Job", "Organization", 
    "Qualifications", "Nationalities", "Corporate Branding", "Configuration", "More"];
    data;
    index;
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
    editUploadedFile(filePath) {
        const values = ["keepCurrent", "deleteCurrent", "replaceCurrent"]
        let num = Math.round(Math.random() * values.length);
        let index = num == 0 ? 0 : num - 1;
        if(values[index] == 'keepCurrent') {
            cy.get(`input[type="radio"][value=${values[index]}]`).click({force: true})
        }
        else if(values[index] == 'deleteCurrent') {
            cy.get(`input[type="radio"][value=${values[index]}]`).click({force: true})
        }
        else {
            cy.get(`input[type="radio"][value=${values[index]}]`).click({force: true}).then(()=> {
                this.uploadFile(filePath)
            })
        }
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
    getJobTitleIndex(data, jobTitle) { 
        return new Promise((resolve, reject)=> {
            let dataIndex;
            let flag = false;
            data.forEach((value, index)=> {
                if(value.title == jobTitle) {
                    dataIndex = index
                    flag = true
                }
            })
            if(flag) {
                resolve(dataIndex)
            }
            else {
                reject(new Error('Element not found!!'))
            }
        })
    }
    jobTitleAction(action, index) {
        const actions = []
        cy.get('div[data-v-c423d1fa]').each(value => {
            actions.push(value)
        }).then(()=> {
            if(action == "edit") {
                cy.wrap(actions[index]).find('button:nth-child(2)').click()
            }
            else if(action == "delete") {
                cy.wrap(actions[index]).find('button:nth-child(1)').click()
            }
        })
    }
    executeJobTitleAction(resp, title, action) {
        cy.wait(`@${resp}`).then(interception=> {
            let data = interception.response.body.data
            expect(interception.response.statusCode).to.eq(200);
            this.getJobTitleIndex(data, title).then(dataIndex => {
                this.jobTitleAction(action, dataIndex)
            })
        })
    }
}

export default Admin;