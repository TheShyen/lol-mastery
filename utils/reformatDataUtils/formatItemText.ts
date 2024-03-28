const colorMap = {
    attention: '#b9265d',
    active: '#b1d376',
    passive: '#00D2F4',
    rules: '#f17006',
    status: '#7fe193',
    lifeSteal: 'red',
    ornnbonus: '#b9265d',
    nerfedstat: '#c7b8e3',
    buffedstat: '#c7b8e3'
};
type colorMapKey = keyof typeof colorMap;
export function formatItemText(originalText: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(originalText, 'text/html');

    const applyStyles = (element: Element) => {
        const tagName: colorMapKey = element.tagName.toLowerCase() as colorMapKey;
        if (colorMap[tagName]) {
            const htmlElement = element as HTMLElement;
            htmlElement.style.color = colorMap[tagName];
        }
        Array.from(element.children).forEach(applyStyles);
    };

    Array.from(doc.body.children).forEach(applyStyles);
    return doc.body.innerHTML;
}