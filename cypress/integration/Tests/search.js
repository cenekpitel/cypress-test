const testData = require("../../fixtures/testData.json")

const visitWebsite = () => {
    cy.visit('/index.php')
}

const clickSearchButton = () => {
    cy.get('.button-search').click()
}

const enterSearchTerm = (term) => {
    cy.get('.search_query')
            .type(term).should('have.value', term)
}

const checkStructureElements = () => {
    cy.get('.home')
    .find('i').should('have.class', 'icon-home')
    cy.get('.breadcrumb')
    .find('span').should('have.class', 'navigation-pipe')
    cy.get('.breadcrumb')
    .find('span').contains('Search')
}

describe('Search test', function () {

    it('Visits website', function () {
        visitWebsite()
    })

    it('Type into search field - valid term', () => {
        enterSearchTerm(testData.searchTerm)
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    it('Search returns results', () => {
        checkStructureElements()
        cy.get('.product-container')
            .find('.product-name').contains(testData.searchTerm, {matchCase: false})
    })

})

describe('Search with no results', function () {

    it('Visits website', function () {
        visitWebsite()
    })

    it('Type into search field - invalid term', () => {
        enterSearchTerm(testData.invalidSearchTerm)
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    it('Search returns no results', () => {
        
        cy.get('.alert-warning')
            .contains(`No results were found for your search "${testData.invalidSearchTerm}"`)
    })

    it('Visits website', function () {
        visitWebsite()
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    it('Search returns no results', () => {
        checkStructureElements()
        cy.get('.alert-warning')
            .contains('Please enter a search keyword')
    })    
})