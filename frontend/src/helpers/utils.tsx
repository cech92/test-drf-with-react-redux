export function isEmpty(obj: any) {
    if ([null, undefined].includes(obj))
        return true;
    return Object.keys(obj).length === 0;
}

export const buildGet = (path: string, data: any) => {
    if (!isEmpty(data)) {
        var urlSearchParams = new URLSearchParams(data);
        path += '?' + urlSearchParams;
    }
    return path;
}