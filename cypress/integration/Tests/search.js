const visitWebsite = () => {
    cy.visit('http://automationpractice.com/index.php')
}

const clickSearchButton = () => {
    cy.get('.button-search').click()
}

const enterSearchTerm = (term) => {
    cy.get('.search_query')
            .type(term).should('have.value', term)
}

describe('Search test', function () {
    before(() => {
        cy.fixture('testData').then((testData) => {
            this.testData = testData
        })   
    })

    it('Visits website', function () {
        visitWebsite()
    })

    it('Type into search field - valid term', () => {
        enterSearchTerm(this.testData.searchTerm)
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    it('Search return results', () => {
        cy.get('.product-container')
            .find('.product-name').contains(this.testData.searchTerm, {matchCase: false})
    })

    it('Visits website', function () {
        visitWebsite()
    })

    it('Type into search field - invalid term', () => {
        enterSearchTerm(this.testData.invalidSearchTerm)
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    it('Search returns no results', () => {
        cy.get('.alert-warning')
            .contains(`No results were found for your search "${this.testData.invalidSearchTerm}"`)
    })

    it('Visits website', function () {
        visitWebsite()
    })

    it('Click the search button', function () {
        clickSearchButton()
    })

    it('Search returns no results', () => {
        cy.get('.alert-warning')
            .contains('Please enter a search keyword')
    })    
})