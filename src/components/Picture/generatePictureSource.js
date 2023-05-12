export function generatePictureSource(src, type) {
    let fullUrl = null;

    if (src.indexOf('http') > -1 || src.indexOf('https') > -1) {
        fullUrl = new URL(src);
    } else {
        fullUrl = new URL(`https://${src}`);
    }

    const urlWithoutExtension = fullUrl.href.split('.').slice(0, -1).join('.');

    return `${urlWithoutExtension}.${type}`;
}
