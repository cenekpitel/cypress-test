const testData = require("../../fixtures/testData.json")
import 'cypress-file-upload';

describe('Contact us form', function () {
    before(() => {
        // Enter the contact us page
        cy.visit('/index.php')
        cy.get('#contact-link').find('a').contains('Contact us').click()
    })

    // Check some elements present on th Contact Us form
    it('Check page elements', function() {
        cy.get('#center_column').within(() => {
            cy.get('h1').contains('Customer service - Contact us', {matchCase: false})
            cy.get('h3').contains('send a message', {matchCase: false})
            cy.get('.col-md-3').within(() => {
                cy.get('.form-group').find('label').contains('Subject Heading')
                cy.get('select[id=id_contact]').contains('Choose', {matchCase: false})
                cy.get('.form-group').find('label').contains('Order reference')
            })
            cy.get('.col-md-9').children('.form-group').within(() => {
                cy.get('label').contains('Message')
                cy.get('.form-control')
            })
        })
    })
    
    it('Fills email and order reference fields', function () {
        cy.get('#center_column').within(() => {
            cy.get('.col-md-3').within(() => {
                cy.get('input[id=email]').type(testData.validEmail).should('have.value', testData.validEmail)
                cy.get('input[id=id_order]').type(testData.orderReference).should('have.value', testData.orderReference)
            })
        })
    })

    it('Checks and fill content of Subject heading dropdown', function() {
        cy.get('#center_column').within(() => {
            cy.get('.col-md-3').within(() => {
                cy.get('select[id=id_contact]').select('Webmaster').should('have.value', 1)
                cy.get('p[id=desc_contact1]').should('be.visible')
                cy.get('p[id=desc_contact2]').should('not.be.visible')
                cy.get('select[id=id_contact]').select('Customer service').should('have.value', 2)
                cy.get('p[id=desc_contact2]').should('be.visible')
                cy.get('p[id=desc_contact1]').should('not.be.visible')
            })
        })
    })

    it('Upload a file', function () {
    cy.get('span[class=filename]').should('have.text', 'No file selected')
    cy.fixture('testPNG.png').then(fileContent => {
        cy.get('input[type="file"]').attachFile({
            fileContent: fileContent.toString(),
            fileName: 'testPNG.png',
            mimeType: 'image/png'
            });
        });
    cy.get('span[class=filename]').should('have.text', 'testPNG.png')
    })

    it('Fills message form', function () {
        cy.get('.col-md-9').children('.form-group').within(() => {
            cy.get('label').contains('Message')
            cy.get('textarea[class=form-control]').type(testData.textMessage).should('have.value', testData.textMessage)
        })
    })

    it('Clicks on Submit button', function () {
        cy.get('#center_column').within(() => {
            cy.get('select[id=id_contact]').select('Webmaster').should('have.value', 1)
            cy.get('select[id=id_contact]').select('Customer service').should('have.value', 2)
            cy.get('.submit').within(() => {
                cy.get('button[id=submitMessage]').click()
            })
        })
    })

    it('Check success message after submitting', function () {
        cy.get('p[class=alert-success]').should('have.value', 'Your message has been successfully sent to our team.')
    })
})