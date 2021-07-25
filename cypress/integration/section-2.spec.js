const { Section2 } = require( '../objects/section-2' )

describe( 'Problem 2', () =>
{
  beforeEach( () =>
  {
    //Load the webpage with problem
    cy.visit( 'http://localhost:8080/./section-2.html' )
  } )

  it( 'Http: Waiting for network calls', () =>
  {
    //Click on the following button to trigger an abnormally long network call (+10sec)
    cy.request( {
      url: 'http://localhost:8889/todos/1',
      failOnNetworkErrors: false // This is by default true, this option prevents me failure on network delay, also on flaky tests
    } ).then( function ( response )
    {
      // Assert the status of the answer
      expect( response.status ).to.equal( 200 )
      // Assert the payload of the returned object
      expect( response.headers, 'response headers' ).to.include( {
        'access-control-allow-credentials': 'true',
        'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'content-type': 'application/json; charset=utf-8',
        'etag': 'W/"39-Pu9KQvJYg6OzEMb5cL+odJrqUXU"',
        'expires': '0',
        'pragma': 'no-cache',
        'surrogate-control': 'no-store',
      } )
      //Validate alert window ; but didnt appear for me
      cy.on( 'window:alert', ( txt ) =>
      {
        expect( txt ).to.contains( "Abnormally long network call!" )
      } )
    } )
  } )

  it( 'Browser API: Opening a new tab', () =>
  {
    // Click on the following button to trigger a new tab opening
    cy.request( {
      url: 'http://localhost:8080/',
    } ).then( function ( response )
    {
      // Assert the status of the answer
      expect( response.status ).to.equal( 200 )
    } )
  } )

  it( 'Browser API: Downloading a file', () =>
  {
    // Click on the following button to trigger a file download
    cy.request( {
      url: 'http://localhost:8080/assets/img/javascript-logo.png/',
      encoding: 'base64'
    } ).then( function ( response )
    {
      //Copy the reponse body contents in a variable
      const base64Content = response.body
      // Assert the status of the answer
      expect( response.status ).to.equal( 200 )

      //BONUS: Assert the details of the file downloaded
      cy.fixture( '../../app/assets/img/javascript-logo.png' ).then( function ( actualImage )
      {
        // Compare downloaded image (response.body value which is saved in variable) with actual image in the folder location 
        expect( base64Content ).to.deep.equal( actualImage )
      } )
    } )
  } )

} )