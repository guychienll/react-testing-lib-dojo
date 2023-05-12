/* eslint-disable react/prop-types */
// @ts-check
import React from 'react';
import { render, screen } from '@testing-library/react';

const Picture = ({ src, alt }) => {
    return (
        <>
            <picture data-testid="picture">
                <source
                    data-testid="picture:source:avif"
                    srcSet={generatePictureSource(src, 'avif')}
                />
                <source
                    data-testid="picture:source:webp"
                    srcSet={generatePictureSource(src, 'webp')}
                />
                <img data-testid="picture:img" src={src} alt={alt} />
            </picture>
        </>
    );
};

describe('picture', () => {
    it('render_as_expected', () => {
        const props = {
            src: 'https://via.placeholder.com/300x300.jpg',
            alt: 'testing image',
        };
        const { queryByTestId } = render(<Picture {...props} />);

        expect(queryByTestId('picture')).toBeInTheDocument();

        const imageElem = queryByTestId('picture:img');
        expect(imageElem).not.toBeNull();
        expect(imageElem).toHaveAttribute('src', props.src);
        expect(imageElem).toHaveAttribute('alt', props.alt);

        const webpSourceElem = queryByTestId('picture:source:webp');
        expect(webpSourceElem).not.toBeNull();
        expect(webpSourceElem).toHaveAttribute(
            'srcSet',
            `https://via.placeholder.com/300x300.webp`
        );

        const avifSourceElem = queryByTestId('picture:source:avif');
        expect(avifSourceElem).not.toBeNull();
        expect(avifSourceElem).toHaveAttribute(
            'srcSet',
            `https://via.placeholder.com/300x300.avif`
        );

        const welcomeWordingButton = screen.queryByTestId(
            'picture:button:show-welcome-wording'
        );
        expect(welcomeWordingButton).not.toBeNull();
    });
});

describe('generate_picture_src_set', () => {
    it('webp', () => {
        const webp = generatePictureSource(
            'https://via.placeholder.com/300x300.jpg',
            'webp'
        );
        expect(webp).toBe('https://via.placeholder.com/300x300.webp');
    });
});

function generatePictureSource(src, type) {
    let fullUrl = null;

    if (src.indexOf('http') > -1 || src.indexOf('https') > -1) {
        fullUrl = new URL(src);
    } else {
        fullUrl = new URL(`https://${src}`);
    }

    const urlWithoutExtension = fullUrl.href.split('.').slice(0, -1).join('.');

    return `${urlWithoutExtension}.${type}`;
}
