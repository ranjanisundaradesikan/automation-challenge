/// <reference types="Cypress" />
const { Section1 } = require( '../objects/section-1' )

describe( 'Problem 1', () =>
{
  beforeEach( () =>
  {
    //Load the webpage with problem
    cy.visit( 'http://localhost:8080/./section-1.html' )
  } )

  it( 'Assert that the table is not visible', () =>
  {
    // Using not.be.visible assertion
    cy.get( '#alaya-table' ).should( 'not.be.visible' )
  } )

  it( 'After clicking the "Show table" button, assert the table is visible', () =>
  {
    //Find the button and click
    cy.get( '#table-toggle-button' ).click()
    cy.wait( 200 )
    // Using be,visible assertion
    cy.get( '#alaya-table' ).should( 'be.visible' )
  } )

  it( 'Assert that the table is 5 columns wide', () =>
  {
    //Find the table, and count columns on the header, but can do this with any row
    cy.get( '#alaya-table' )
      .find( 'tbody tr:first' )
      .find( 'th' )
      .should( 'have.length', 5 )
  } )

  it( 'Assert that the table is 10 rows long, excluding the first (header) row', () =>
  {
    //Find the table and count the rows
    cy.get( '#alaya-table' )
      .find( 'tbody tr' )
      //This next will eliminate the first header row
      .next()
      // Without header row, the table should have 10 rows in length
      .should( 'have.length', 10 )
  } )

  it( 'Assert that at least 5 entries have the role "user"', () =>
  {
    //Find the table and iterate through each rows
    cy.get( '#alaya-table' ).find( 'tr' ).each( ( $el ) =>
    {
      // if the role in the particular row is user, enter the loop
      if ( $el.text() === 'user' )
      {
        // Count added 
        $el++
        // Assertion that count is greater than 5
        expect( $el ).should.be.greaterThan( 5 );
      }

    })
  })

  it( 'Assert there are exactly 3 people older than 60 years old', () => {
    // Get the table and iterate through each row, but 3rd column
    cy.get( 'table >tbody >tr th:nth-child(3)' ).each( ( $el ) =>
    {
      // copy the text in 3rd column (date of birth) in a variable
      let dob = $el.text();
      // Take the substring to get just the year from the dateofBirth and parse it to integer
      let yob = parseInt( dob.substring( dob.length -4))
      // Check if age > 60, ten enter loop
      if ( yob > 1961 ) {
        //Add count
        $el++
        // assert if the count is exactly 3
        expect( $el ).should.be.equal( 3 );
      }
    })
  })

  it( 'Assert that the form is not visible', () =>
  {
    // Find the form and assert if not visible
    cy.get( '#alaya-form' ).should( 'not.be.visible' )
  })

  it('After clicking the "Show form" button, assert that the form is visible', () =>
  {
    //Find the button and click
    cy.get( '#form-toggle-button' ).click()
    cy.wait( 200 )
    // Assert if form is visible after clicking toggle button
    cy.get( '#alaya-form' ).should( 'be.visible' )
  })

  it('Fill in the "Name" and "Age" inputs, and assert that both inputs are filled', ()=> {
    //Need to make form visible to fill in values
    cy.get( '#form-toggle-button' ).click()
    cy.wait( 200 )
    cy.get( '#alaya-form' ).should( 'be.visible' )
    //Type in values
    cy.get( '#fullName').type( 'Ranjani Sundaradesikan')
    cy.get( '#age').type( '30')
    //Validate the values
    cy.get( '#fullName').invoke('val').then( txt => {
        expect( txt ).contains( 'Ranjani Sundaradesikan')
    })
    cy.get( '#age').invoke('val').then( txt => {
      expect( txt ).contains( '30')
    })
  })

  it('Select "Female" from the select option, and assert that the value is "female"', ()=> {
    //Need to make form visible to fill in values
    cy.get( '#form-toggle-button' ).click()
    cy.wait( 200 )
    cy.get( '#alaya-form' ).should( 'be.visible' )
    // Select
    cy.get( '#gender').select('female')
    //Validate Selection
    cy.get( '#gender').invoke('val').then( txt => {
      expect( txt ).contains( 'female')
    })
  })

  it( 'Tick the "Nurse" checkbox and assert that the value "nurse" is true', ()=> {
      //Need to make form visible to fill in values
      cy.get( '#form-toggle-button' ).click()
      cy.wait( 200 )
      cy.get( '#alaya-form' ).should( 'be.visible' )
      // Select
      cy.get( '#nurse').check();
      // validate checkbox
      cy.get( '#nurse')
      .should( 'be.visible')
      .check({ force:true })
      .should( 'be.checked' )

  })

  it( 'Click on the "Submit" button and assert that there is an alert window showing with the text "Form submitted!"', function()  {
    //Need to make form visible to fill in values
    cy.get( '#form-toggle-button' ).click()
    cy.wait( 200 )
    cy.get( '#alaya-form' ).should( 'be.visible' )
    //Fill in value
    cy.get( '#fullName').type( 'Ranjani Sundaradesikan')
    cy.get( '#age').type( '30')
    cy.get( '#gender').select('female')
    // Click submit
    cy.get( '#submit' ).click()
    //Validate alert window ; but didnt appear for me
    cy.on( 'window:alert', (txt) => {
      expect(txt).to.contains('Form submitted!')
    })
  })

})
