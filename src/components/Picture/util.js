function generatePictureSource(src, type) {
    let fullUrl = '';

    if (src.indexOf('http') > -1 || src.indexOf('https') > -1) {
        fullUrl = new URL(src);
    } else {
        fullUrl = new URL(`https://${src}`);
    }

    return {
        src: `${fullUrl}.${type}`,
        type: `image/${type}`,
    };
}

function generateImageUrlWithDensity({ originUrl, sizes = [] }) {
    if (sizes.length <= 0) {
        return originUrl.href;
    }

    const extension = originUrl.pathname.split('.').slice(-1)[0];

    const withoutSizePathname = originUrl.pathname
        .split('.')
        .slice(0, -1)
        .join('')
        .split('/')
        .slice(0, -1)
        .join('/');

    const result = sizes.reduce((acc, cur, index) => {
        let accumulator = acc;

        index > 0 && (accumulator += ', ');
        accumulator += `${originUrl.origin}${withoutSizePathname}/${cur.width}x${cur.height}.${extension} ${cur.density}x`;

        return accumulator;
    }, '');

    return result;
}

export { generatePictureSource, generateImageUrlWithDensity };
