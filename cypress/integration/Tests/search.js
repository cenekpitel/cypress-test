const testData = require("../../fixtures/testData.json")

// Visit website function
const visitWebsite = () => {
    cy.visit('/index.php')
}

// Click Search button
const clickSearchButton = () => {
    cy.get('.button-search').click()
}

// Enter Search term
const enterSearchTerm = (term) => {
    cy.get('.search_query')
            .type(term).should('have.value', term)
}

// Check structure elemetns
const checkStructureElements = () => {
    cy.get('.home')
    .find('i').should('have.class', 'icon-home')
    cy.get('.breadcrumb')
    .find('span').should('have.class', 'navigation-pipe')
    cy.get('.breadcrumb')
    .find('span').contains('Search')
}

describe('Search test with results', function () {

    // Visit Homepage
    before(() => {
        visitWebsite()
    })

    it('Type into search field - valid term', () => {
        enterSearchTerm(testData.searchTerm)
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    // Check if first result contains etnered search term
    it('Search returns results', () => {
        checkStructureElements()
        cy.get('.product-container')
            .find('.product-name').contains(testData.searchTerm, {matchCase: false})
    })

})

describe('Search with no results', function () {

    // Visit Homepage
    before(() => {
        visitWebsite()
    })

    // Enter a search term with no results
    it('Type into search field - invalid term', () => {
        enterSearchTerm(testData.invalidSearchTerm)
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    // Check correct error message is returned
    it('Search returns no results', () => {
        cy.get('.alert-warning').contains(`No results were found for your search "${testData.invalidSearchTerm}"`)
    })
})

describe('Search with no search term', function () {
   
    // Visit Homepage
    before(() => {
        visitWebsite()
    })

    // Clicks on search button with blank search field
    it('Click the search button', function () {
        clickSearchButton()
    })

    // Check correct error message is returned
    it('Search returns no results', () => {
        checkStructureElements()
        cy.get('.alert-warning').contains('Please enter a search keyword')
    })    
})