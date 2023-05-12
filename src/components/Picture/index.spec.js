/* eslint-disable react/prop-types */
// @ts-check
import React from 'react';
import { render } from '@testing-library/react';

const Picture = (props) => {
    const { src, alt } = props;
    return (
        <picture data-testid="picture">
            <img data-testid="picture:image" src={src} alt={alt}></img>
        </picture>
    );
};

describe('picture', () => {
    it('render_as_expected', () => {
        const props = {
            src: 'https://via.placeholder.com/300x300.jpg',
            alt: 'test',
        };
        const { queryByTestId } = render(<Picture {...props} />);

        expect(queryByTestId('picture')).toBeInTheDocument();

        const imageElem = queryByTestId('picture:image');
        expect(imageElem).not.toBeNull();
        expect(imageElem).toHaveAttribute('src', props.src);
        expect(imageElem).toHaveAttribute('alt', props.alt);
    });
});
