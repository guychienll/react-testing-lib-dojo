/* eslint-disable react/prop-types */
// @ts-check
import React from 'react';
import { render } from '@testing-library/react';

const Picture = () => <picture data-testid="picture"></picture>;

describe('picture', () => {
    it('render_as_expected', () => {
        const { queryByTestId } = render(<Picture />);

        expect(queryByTestId('picture')).toBeInTheDocument();

        expect(queryByTestId('picture:img')).not.toBeNull();
    });
});
