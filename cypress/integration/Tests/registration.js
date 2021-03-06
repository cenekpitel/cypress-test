import {randomEmail} from "../../support/index.js"
const testData = require("../../fixtures/testData.json")

// Visit website function
const visitWebsite = () => {
    cy.visit('/index.php')
}

// Enter email function
const enterEmail = (term) => {
    cy.get('#email_create')
            .type(term).should('have.value', term)
}

// Click Create account button function
const clickCreateAnAccountButton = () => {
    cy.get('button[name=SubmitCreate]').click()
}

describe('Registration test', function () {

    // Get to the Sign in / registration page
    beforeEach(() => {
        visitWebsite()
        cy.get('.login').click()
        cy.get('.page-subheading').contains('Create an account', {matchCase: false})
    })
 
    it('Enters invalid email and check error message', function () {
        enterEmail(testData.invalidEmail)
        clickCreateAnAccountButton()
        cy.get('.alert-danger')
        cy.get('#create_account_error').contains('li', 'Invalid email address.')
    })

    // Get to the Sign in / registration page
    it('Fill the registration form with valid data and check user is registered', function () {
        cy.wrap(randomEmail).as('randomEmail')
        enterEmail(randomEmail)
        clickCreateAnAccountButton()
        // Input personal informations
        cy.get('.account_creation').contains('Your personal information').parent('div').within(() => {
            cy.get('input[id=customer_firstname]').type(testData.firstname).should('have.value', testData.firstname)
            cy.get('input[id=customer_lastname]').type(testData.lastname).should('have.value', testData.lastname)
            cy.get('input[id=passwd]').type(testData.validPassword)
        })
        // Input address
        cy.get('.account_creation').contains('Your address').parent('div').within(() => {
            cy.get('input[id=address1]').type(testData.address.street).should('have.value', testData.address.street)
            cy.get('input[id=city]').type(testData.address.city).should('have.value', testData.address.city)
            cy.get('select[id=id_state]').select('Alabama').should('have.value', 1)
            cy.get('input[id=postcode]').type(testData.address.postcode).should('have.value', testData.address.postcode)
            cy.get('input[id=phone_mobile]').type(testData.phoneNumber).should('have.value', testData.phoneNumber)
            cy.get('input[id=alias]').clear().type(testData.addressAlias).should('have.value', testData.addressAlias)
        })
        // Click registration button
        cy.get('button[name=submitAccount]').click()
        cy.get('.header_user_info').find('a').contains('Sign out').should('have.attr', 'href')
        cy.get('.header_user_info').find('a').children().contains(`${testData.firstname} ${testData.lastname}`).parent().should('have.attr', 'href')
        
    })
})
