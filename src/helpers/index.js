export function getFormatUrl(url) {
    return url.toLowerCase().split(' ').join('-');
}

export function clearFormObject(formData) {
    Object.keys(formData).forEach(function(key) {
        formData[key] = '';
    });
}