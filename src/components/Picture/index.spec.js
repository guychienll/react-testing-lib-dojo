/* eslint-disable react/prop-types */
// @ts-check
import React from 'react';
import { render } from '@testing-library/react';

const Picture = ({ src }) => (
    <picture data-testid="picture">
        <img data-testid="picture:img" src={src} alt="" />
    </picture>
);

describe('picture', () => {
    it('render_as_expected', () => {
        const props = {
            src: 'https://via.placeholder.com/300x300.jpg',
        };
        const { queryByTestId } = render(<Picture {...props} />);

        expect(queryByTestId('picture')).toBeInTheDocument();

        const imageElem = queryByTestId('picture:img');
        expect(imageElem).not.toBeNull();
        expect(imageElem).toHaveAttribute('src', props.src);
    });
});
