import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { generatePictureSource, generateImageUrlWithDensity } from './util';
import { PICTURE_SOURCE_TYPE } from './constant';

function Image(props) {
    const {
        src = 'https://via.placeholder.com/300x300',
        sizes = [],
        lazy = false,
    } = props;
    const [isWelcomeWordingVisible, setIsWelcomeWordingVisible] =
        useState(false);

    const source = useMemo(() => {
        if (!src) {
            throw new Error('src is required');
        }

        const avif = generatePictureSource(src, PICTURE_SOURCE_TYPE.avif);
        const webp = generatePictureSource(src, PICTURE_SOURCE_TYPE.webp);
        const jpeg = generatePictureSource(src, PICTURE_SOURCE_TYPE.jpeg);
        return {
            avif: {
                type: avif.type,
                srcSet: generateImageUrlWithDensity({
                    originUrl: new URL(avif.src),
                    sizes,
                }),
            },
            webp: {
                type: webp.type,
                srcSet: generateImageUrlWithDensity({
                    originUrl: new URL(webp.src),
                    sizes,
                }),
            },
            jpeg: {
                src: jpeg.src,
                srcSet: generateImageUrlWithDensity({
                    originUrl: new URL(jpeg.src),
                    sizes,
                }),
                alt: '',
            },
        };
    }, [sizes, src]);

    if (lazy) {
        return (
            <>
                <picture
                    data-testid="picture"
                    onClick={() => {
                        setIsWelcomeWordingVisible(true);
                    }}
                >
                    <source
                        data-testid="picture:source:avif"
                        {...source.avif}
                    />
                    <source
                        data-testid="picture:source:webp"
                        {...source.webp}
                    />
                    <img
                        data-testid="picture:img"
                        {...source.jpeg}
                        loading="lazy"
                    />
                </picture>
                {isWelcomeWordingVisible && <div>Welcome to React</div>}
            </>
        );
    }

    return (
        <>
            <picture
                data-testid="picture"
                onClick={() => {
                    setIsWelcomeWordingVisible(true);
                }}
            >
                <source data-testid="picture:source:avif" {...source.avif} />
                <source data-testid="picture:source:webp" {...source.webp} />
                <img data-testid="picture:img" {...source.jpeg} />
            </picture>
            {isWelcomeWordingVisible && <div>Welcome to React</div>}
        </>
    );
}

Image.propTypes = {
    src: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.object),
    lazy: PropTypes.bool,
};

export {
    PICTURE_SOURCE_TYPE,
    generatePictureSource,
    generateImageUrlWithDensity,
};

export default Image;
