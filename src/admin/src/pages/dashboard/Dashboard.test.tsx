import React from 'react'
import { render, screen } from '@testing-library/react'

import Dashboard from './Dashboard'

describe('测试空状态', () => {
	it('测试默认控状态', () => {
		render(<Dashboard />)
		const text = screen.getByText('ppp')
		expect(text).toBeInTheDocument()
	})
})
