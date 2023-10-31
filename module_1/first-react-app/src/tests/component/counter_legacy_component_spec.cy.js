import React from 'react'
import CounterLegacy from '../../components/CounterLegacy'

describe('Component testing for counter component', () => {
  it('renders', () => {

    cy.viewport('macbook-16');
    cy.mount(<CounterLegacy />)

    // Verify initial count is 0
    cy.contains('0').should('exist');

    // Click increment button
    cy.contains('add').click();

    // Verify count is 1 after increment
    cy.contains('1').should('exist');

    // Click increment button
    cy.contains('add').click();

    // Verify count is 2 after increment
    cy.contains('2').should('exist');

    // Click increment button
    cy.contains('add').click();

    // Verify count is 3 after increment
    cy.contains('3').should('exist');

    // Click decrement button
    cy.contains('remove').click();

    // Verify count is 2 after decrement
    cy.contains('2').should('exist');

    // Click decrement button
    cy.contains('remove').click();

    // Verify count is 1 after decrement
    cy.contains('1').should('exist');
  })
})