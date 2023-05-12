/* eslint-disable react/prop-types */
// @ts-check
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Picture } from './Picture';
import { generatePictureSource } from './generatePictureSource';

describe('picture', () => {
    it('render_as_expected', async () => {
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
        expect(welcomeWordingButton).toHaveTextContent('Show welcome wording');

        welcomeWordingButton && userEvent.click(welcomeWordingButton);

        await screen.findByText('Welcome to React Testing Library!');
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
