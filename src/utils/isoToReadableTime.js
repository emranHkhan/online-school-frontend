export const isoToReadableDate = (isoString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const date = new Date(isoString);
    return date.toLocaleString('en-US', options);
}