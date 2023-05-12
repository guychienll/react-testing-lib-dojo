/* eslint-disable react/prop-types */
// @ts-check
import React from 'react';
import { render } from '@testing-library/react';

describe('picture', () => {
    it('render_as_expected', () => {
        const { queryByTestId } = render(<picture></picture>);

        expect(queryByTestId('picture')).toBeInTheDocument();
    });
});
