import { queryByTestId } from '@testing-library/dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Image, { generateImageUrlWithDensity, generatePictureSource } from './';

describe('image', () => {
    it('render_as_expected', () => {
        render(<Image />);
        const pictureElement = screen.getByTestId('picture');

        expect(pictureElement).toBeInTheDocument();

        const avifSourceElement = queryByTestId(
            pictureElement,
            'picture:source:avif'
        );
        expect(avifSourceElement).not.toBeNull();
        expect(avifSourceElement).toHaveAttribute('srcSet');
        expect(avifSourceElement.getAttribute('type')).toBe('image/avif');

        const webpSrouceElement = queryByTestId(
            pictureElement,
            'picture:source:webp'
        );
        expect(webpSrouceElement).not.toBeNull();
        expect(webpSrouceElement).toHaveAttribute('srcSet');
        expect(webpSrouceElement.getAttribute('type')).toBe('image/webp');

        const imageElement = queryByTestId(pictureElement, 'picture:img');
        expect(imageElement).not.toBeNull();
        expect(imageElement).toHaveAttribute('src');
        expect(imageElement).toHaveAttribute('alt');
    });

    it('render_lazy_image_elem_should_with_loading_lazy', () => {
        render(<Image lazy />);
        const pictureElement = screen.getByTestId('picture');

        const imageElement = queryByTestId(pictureElement, 'picture:img');
        expect(imageElement.getAttribute('loading')).toBe('lazy');
    });

    it('when_picture_elem_be_clicked_would_show_welcome_wording_lazy', async () => {
        render(<Image lazy />);
        const pictureElement = screen.getByTestId('picture');

        await waitFor(() => {
            expect(screen.queryByText('Welcome to React')).toBeNull();
        });

        pictureElement.click();

        await waitFor(() => {
            expect(screen.queryByText('Welcome to React')).not.toBeNull();
        });
    });

    it('when_picture_elem_be_clicked_would_show_welcome_wording_not_lazy', async () => {
        render(<Image />);
        const pictureElement = screen.getByTestId('picture');

        await waitFor(() => {
            expect(screen.queryByText('Welcome to React')).toBeNull();
        });

        pictureElement.click();

        await waitFor(() => {
            expect(screen.queryByText('Welcome to React')).not.toBeNull();
        });
    });
});

describe('generate_picture_source', () => {
    it('happy_path', () => {
        const src = 'https://via.placeholder.com/300x300';
        const type = 'avif';
        const expected = {
            src: `${src}.${type}`,
            type: `image/${type}`,
        };
        expect(generatePictureSource(src, type)).toMatchObject(expected);
    });

    it('src_without_protocol', () => {
        const src = '//via.placeholder.com/300x300';
        const type = 'avif';
        const expected = {
            src: `https://via.placeholder.com/300x300.${type}`,
            type: `image/${type}`,
        };
        expect(generatePictureSource(src, type)).toMatchObject(expected);
    });

    it('webp', () => {
        const src = '//via.placeholder.com/300x300';
        const type = 'webp';
        const expected = {
            src: `https://via.placeholder.com/300x300.${type}`,
            type: `image/${type}`,
        };
        expect(generatePictureSource(src, type)).toMatchObject(expected);
    });
});

describe('generate_image_url_with_densitity', () => {
    it('happy_path', () => {
        const originUrl = new URL('https://via.placeholder.com/300x300.jpeg');
        const sizes = [
            {
                width: 300,
                height: 300,
                density: 1,
            },
            {
                width: 600,
                height: 600,
                density: 2,
            },
        ];
        const expected =
            'https://via.placeholder.com/300x300.jpeg 1x, https://via.placeholder.com/600x600.jpeg 2x';
        expect(generateImageUrlWithDensity({ originUrl, sizes })).toBe(
            expected
        );
    });

    it('without_sizes', () => {
        const originUrl = new URL('https://via.placeholder.com/300x300.jpeg');
        const sizes = [];

        const expected = 'https://via.placeholder.com/300x300.jpeg';

        expect(generateImageUrlWithDensity({ originUrl, sizes })).toEqual(
            expected
        );
    });
});
