const copy = async (text) => {
    await navigator.clipboard.writeText(text);
}
export {
    copy,
}
