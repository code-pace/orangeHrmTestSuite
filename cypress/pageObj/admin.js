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
    gotoAdminUserDropdown() {
        cy.get('.oxd-userdropdown-tab').click()
    }
    roleMenuItems() {
        cy.get('a[role="menuitem"]').click()
    }
    selectRoleMenuItems(menuItem) {
        cy.xpath(`//a[@role="menuitem" and text()="${menuItem}"]`).click()
    }
    checkAboutInfo(message) {
        cy.get('.orangehrm-about-text').contains(message)
    }
    clickEmployeeBtn(text) {
        cy.xpath(`//button[text()=" ${text} "]`).click()
    }
    getAddEmployeeTitle() {
        return cy.get('h6.orangehrm-main-title')
    }
    get_header_title(index, message) {
        const elems = []
        cy.get('h6.orangehrm-main-title').each(elem => {
            elems.push(elem)
        }).then(()=> {
            cy.wrap(elems[index]).should('have.text', message)
        }) 
    }
    getAddEmployeeOptions(text) {
        return cy.get('div[role="option"]').contains(text)
    }
    getSubmitBtn() {
        cy.get('button[type="submit"]').click()
    }
    get_submit_btn(index) {
        const elems = []
        cy.get('button[type="submit"]').each(elem => {
            elems.push(elem)
        }).then(()=> {
            cy.wrap(elems[index]).click()
        })
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
    toggleCheckbox() {
        cy.get('input[type="checkbox"]').check({force: true})
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
        this.toggleCheckbox()
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
    populateInputField(value1, value2, value3) {
        const elems = []
        cy.xpath('//div[contains(@class,"oxd-input-group")]//input[contains(@class,"oxd-input--active")]').each((elem)=> {
            if(!elem.prop('disabled')) {
                elems.push(elem)
            }
        }).then(()=> {
            elems.forEach((elem, index)=> {
                if(index == 0) {
                    cy.wrap(elem).clear().type(value1)
                }
                else if(index == 1) {
                    cy.wrap(elem).clear().type(value2)
                }
                else if(index == 2) {
                    cy.wrap(elem).clear().type(value3)
                }
            })
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
                if(typeof value.title !== 'undefined' && value.title == jobTitle) {
                    dataIndex = index
                    flag = true
                }
                else if(typeof value.name !== 'undefined' && value.name == jobTitle) {
                    dataIndex = index
                    flag = true
                }
                else if(typeof value.currencyType !== 'undefined' && jobTitle.includes(value.currencyType.name)) {
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
    isElementExist() {
        cy.get('div[data-v-8a31f039]').then(el => {
            if(el.length > 0) {
                return cy.wrap(el)
            }else {
                return cy.get('div[data-v-c423d1fa]')
            }
        })
    }
    jobTitleAction(action, index) {
        const actions = []
        cy.get(action == 'add' ? 'div[data-v-8a31f039]' : 'div[data-v-c423d1fa]').each(value => {
            actions.push(value)
        }).then(()=> {
            if(action == "edit") {
                cy.wrap(actions[index]).find('button:nth-child(2)').click()
            }
            else if(action == "delete") {
                cy.wrap(actions[index]).find('button:nth-child(1)').click()
            }
            else {
                cy.wrap(actions[index]).find('button:nth-child(3)').click()
            }
        })
    }
    subunitAction(action, index, unitTitle) {
        const elems = []
        cy.get('div.oxd-tree-node-wrapper').each(elem => {
            elems.push(elem)
        }).then(()=> {
            cy.wrap(elems[index]).find('span.oxd-tree-node-toggle > button').click()
            cy.contains(unitTitle).parent().then(el => {
                if(action == 'edit') {
                    cy.wrap(el).find('button:nth-child(2)').click()
                }
                else if(action == 'delete') {
                    cy.wrap(el).find('button:nth-child(1)').click()
                }
                else {
                    cy.wrap(el).find('button:nth-child(3)').click()
                }
            })
        })
    }
    executeJobTitleAction(resp, title, action) {
            cy.wait(`@${resp}`).then(interception=> {
            let response = interception.response;
            let data;
            if(response.url.includes('subunits')) {
                data = response.body.data[0].children
            }
            else {
                data = response.body.data
            }
            expect(response.statusCode).to.eq(200);
            this.getJobTitleIndex(data, title).then(dataIndex => {
                this.jobTitleAction(action, dataIndex)
            })
        })
    }
    executeSubunitAction(resp, title, unitTitle, action) {
        cy.wait(`@${resp}`).then(interception=> {
            let response = interception.response;
            let data;
            if(response.url.includes('subunits')) {
                data = response.body.data[0].children
            }
            else {
                data = response.body.data
            }
            expect(response.statusCode).to.eq(200);
            this.getJobTitleIndex(data, title).then(dataIndex => {
                this.subunitAction(action, dataIndex, unitTitle)
            })
        })
    }
    selectInputDateField(index) {
        const elems = []
        cy.get('input[placeholder="hh:mm"]').each(elem => {
            elems.push(elem)
        }).then(()=> {
            cy.wrap(elems[index]).click()
        })
    }
    timeBreakDown(time1) {
        let hour, mins, daytime;
        const time = time1.split(' ')
        daytime = time[time.length - 1].trim()
        hour = Number(time[0].split(':')[0].trim())
        mins = Number(time[0].split(':')[time.length - 1].trim())
        return {daytime, hour, mins}
    }
    changeHourCountBtn(action) {
        if(action == 'down') {
            cy.get('.oxd-time-hour-input-down').click()
        }
        else {
            cy.get('.oxd-time-hour-input-up').click()
        }
    }
    changeMinsCountBtn(action) {
        if(action == 'down') {
            cy.get('.oxd-time-minute-input-down').click()
        }
        else {
            cy.get('.oxd-time-minute-input-up').click()
        }
    }
    updateHour(hr) {
        cy.get('input.oxd-time-hour-input-text')
            .invoke('val')
            .then(hour => {
                hour = Number(hour)
                if(hour == hr) {
                    cy.log('hours: ' + hr)
                    return;
                }
                else if(hour > hr) {
                    this.changeHourCountBtn('down')
                    this.updateHour(hr)
                }
                else if(hour < hr) {
                    this.changeHourCountBtn('up')
                    this.updateHour(hr)
                }
            })
    }
    
    updateMins(mins) {
        cy.get('input.oxd-time-minute-input-text')
            .invoke('val')
            .then(min => {
                min = Number(min)
                if(min == mins) {
                    cy.log('mins: ' + min)
                    return;
                }
                else if(min > mins) {
                    this.changeMinsCountBtn('down')
                    this.updateMins(mins)
                }
                else if(min < mins) {
                    this.changeMinsCountBtn('up')
                    this.updateMins(mins)
                }
            })
    }
    updateDayTime(dt) {
        cy.get(`input[value=${dt}]`).click()
    }
    selectWorkingTime(time) {
        let {daytime, hour, mins} = this.timeBreakDown(time)
        this.updateHour(hour)
        this.updateMins(mins)
        this.updateDayTime(daytime)
    }
    getTimeDiff(FromTime, ToTime) {
        let fromTime = this.timeBreakDown(FromTime)
        let toTime = this.timeBreakDown(ToTime)
        let fromMins, toMins
        if(fromTime.daytime == 'AM') {
            fromMins = fromTime.hour !== 12 ? 
                    (fromTime.hour * 60) + fromTime.mins : 
                    0 + fromTime.mins;
        }
        if(fromTime.daytime == 'PM') {
            fromMins = fromTime.hour !== 12 ?
                    ((fromTime.hour + 12) * 60) + fromTime.mins :
                    (fromTime.hour * 60) + fromTime.mins;
        }
        if(toTime.daytime == 'AM') {
            toMins = toTime.hour !== 12 ?
                    (toTime.hour * 60) + toTime.mins :
                    0 + toTime.mins;
        }
        if(toTime.daytime == 'PM') {
            toMins = toTime.hour !== 12 ? 
                    ((toTime.hour + 12) * 60) + toTime.mins :
                    (toTime.hour * 60) + toTime.mins;
        }
        let timeDiffInMins = fromMins - toMins
        let timeDiffInHours = timeDiffInMins / 60
        timeDiffInHours = timeDiffInHours.toString()
        return timeDiffInHours.startsWith('-') ? timeDiffInHours.slice(1) : timeDiffInHours;
    }
    checkDurationDiff(FromTime, ToTime) {
        cy.get('.orangehrm-workshift-duration').invoke('text').then(value => {
            expect(value).to.contain(this.getTimeDiff(FromTime, ToTime))
        })
    }
    getElementFromParentElem(elemType, fieldName, message) {
        const elems = []
        cy.get('div.oxd-input-field-bottom-space').each(value => elems.push(value))
        .then(()=> {
            let newElem = elems.filter(value => value.text().includes(fieldName))
            elemType == 'input' ? cy.wrap(newElem[0]).find('input').clear().type(message) :
            elemType == 'span' ? cy.wrap(newElem[0]).find('span').contains(message) :
            elemType == 'textarea' ? cy.wrap(newElem[0]).find('textarea').clear().type(message) :
            this.selectEmployeeDropdownOptions(0, message)
        });
    }
}

export default Admin;