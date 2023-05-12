/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { generatePictureSource } from './generatePictureSource';

export const Picture = ({ src, alt }) => {
    const [isWelcomeWordingVisible, setisWelcomeWordingVisible] =
        useState(false);
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
            <button
                data-testid="picture:button:show-welcome-wording"
                onClick={() => {
                    setisWelcomeWordingVisible(true);
                }}
            >
                Show welcome wording
            </button>
            {isWelcomeWordingVisible && (
                <h1>Welcome to React Testing Library!</h1>
            )}
        </>
    );
};
