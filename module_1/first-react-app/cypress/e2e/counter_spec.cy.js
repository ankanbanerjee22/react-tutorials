describe('E2E test for counter legacy component', () => {
  // it('increments and decrements the counter correctly', () => {

  //   cy.visit('http://localhost:3000');

  //   // Get the CounterLegacy collapsible elements and open them
  //   cy.contains('Counter Legacy').click();

  //   const incrementButton = cy.contains('add');
  //   const decrementButton = cy.contains('remove');

  //   // Get the initial count value
  //   cy.get('.text-input.center-align.counter-style').should('have.text', '0');

  //   // increment counter value
  //   incrementButton.click();
  //   cy.get('.text-input.center-align.counter-style').should('have.text', '1');

  //   // decrement counter value
  //   decrementButton.click();
  //   cy.get('.text-input.center-align.counter-style').should('have.text', '0');

  //   //decrement button when count is already 0, should show an alert
  //   decrementButton.click();
  //   cy.on('window:alert', (text) => {
  //     expect(text).to.equal('Your count value is going to be negative');
  //   });
  //   // Verify the count goes to negative post alerting
  //   cy.get('.text-input.center-align.counter-style').should('have.text', '-1');
  // });

});