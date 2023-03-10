describe('template spec', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000')

		// Needed until React's Hydration problem is fixed: https://github.com/facebook/react/issues/24430
		cy.get('html').should('have.class', 'hydrated')

		cy.findByTestId('schedule-form').within(() => {
			cy.findAllByLabelText('7 - 8').should('have.length', 7).click({ multiple: true })
			cy.findAllByLabelText('17 - 18').should('have.length', 7).click({ multiple: true })
			cy.findAllByLabelText('23 - 24').should('have.length', 7).click({ multiple: true })
			cy.intercept('POST', '**/profile/scheduleinfo*').as('updateSchedule')
			cy.findByText('Guardar').click()
			cy.wait('@updateSchedule')

			/* cy.findByText('Disponibilidade atualizada com sucesso!').should('be.visible') */
		})
	})
})
