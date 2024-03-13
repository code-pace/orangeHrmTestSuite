/// <reference types= ‘cypress’>
class Dashboard {
    flag = false;
    todoListItem = [];
    quickLaunchOptions = [];
    locator;
    getTitles() {
        return cy.get('div[data-v-133d244a] > p.oxd-text--p')
    }
    getListOfTodos() {
        return cy.get('div.orangehrm-todo-list-item', {timeout: 10000})
    }
    getQuickLaunchActions() {
        return cy.get('div.orangehrm-quick-launch-card')
    }
    getAttendanceCard() {
        return cy.get('p.orangehrm-attendance-card-state');
    }
    getAttendanceBtn() {
        console.log('--inside attendance card--')
        return cy.get('button.orangehrm-attendance-card-action')
    }
    /**loader should be in utility class */
    getLoadingSpinner() {
        return cy.get('div.oxd-loading-spinner-container', {timeout: 10000})
    }
    getAttendanceTitle() {
        return cy.get('h6.orangehrm-main-title')
    }
    getValuesOfTodos() {
        return this.getListOfTodos().each(action => {
            cy.wrap(action).find('p').invoke('text').then(value => {
                this.todoListItem.push(value)
            })
        })
    }
    getQuickLaunchValues() {
        return this.getQuickLaunchActions().each(action => {
            cy.wrap(action).find('p').invoke('text').then(value => {
                this.quickLaunchOptions.push(value)
            })
        })
    }
    /**Url Locator should be in utility class */
    getCurrentUrlLocation() {
        cy.location().then( location => {
            this.locator = location.href
        })
    }
    validateTitle(title) {
        const titles = this.getTitles().each(elem => {
            cy.wrap(elem).invoke('text').then(value => {
                if (value.includes(title)) {
                    this.flag = true
                }
            }) 
        })
        titles.then(()=> expect(this.flag).to.be.true)
    }
    validateTodoActions() {
        this.getValuesOfTodos().then(()=> {
            this.todoListItem.forEach(value => {
                cy.contains(value).click()
                let a = value.split(' ')
                let b = a.filter((i, index) => index == 0)
                let x = b[0].trim()
                x = x.slice(1, -1)
                let numOfActivity = Number.parseInt(x)
                let todoName = ""
                let c = a.filter((i, index) => index != 0)
                c.forEach(value => todoName += ` ${value}`)
                todoName = todoName.trim()

                this.getLoadingSpinner().should('not.exist')
                try {
                    let title;
                    value.includes(todoName) ? 
                    cy.contains('Record Found').invoke('text').then(value => {
                        title = value
                        expect(title).to.contain(`${numOfActivity}`)
                    }) :
                    cy.contains('Records Found').invoke('text').then(value => {
                        title = value
                        expect(title).to.contain(`${numOfActivity}`)
                    });
                } 
                catch (error) {
                  // Log the error, but continue with the test
                  cy.log('Assertion failed:', error.message);
                }
                
                cy.visit(this.locator)
                try {
                    cy.get('div.orangehrm-todo-list-item').should('be.visible')
                } catch (AssertionError) {
                    cy.contains('No Pending Actions to Perform');
                }
            })
        })
    }
    validateQuickLaunchOptions() {
        this.getQuickLaunchActions().then(()=> {
            this.quickLaunchOptions.forEach((value, index) => {
                cy.get(`.orangehrm-quick-launch-card:nth-child(${index + 1})`).click()
                let x = value.trim()
                cy.get('.orangehrm-background-container').should('be.visible')
                cy.get('.orangehrm-main-title').should('contain.text', x)
                cy.visit(this.locator)
                cy.get('div.orangehrm-quick-launch-card').should('be.visible')
            })
        })
    }
    gotoTimeAtWork() {
        this.getAttendanceCard().invoke('text').then(value => {
            this.getAttendanceBtn().click()
            this.getLoadingSpinner().should('not.exist')
            this.getAttendanceTitle().should('have.text', value.trim() == 'Punched In' ? 'Punch Out': 'Punch In')
        })
    }
    validateEmployeeLeave() {
        cy.get('.orangehrm-leave-card-icon').click()
        cy.get('.orangehrm-modal-header').should('contain', 'Employees on Leave Today')
        cy.get('.orangehrm-modal-header').should('contain', 'Configurations')
        this.getLoadingSpinner().should('not.exist')
        cy.get('input[type="checkbox"]').then(input => {
            if(!input.checked) {
                cy.wrap(input).click({force: true})
            }
        })
        cy.get('input[type="checkbox"]').should('be.checked')
        cy.get('button[type="submit"]').click()
    }
}

export default Dashboard;