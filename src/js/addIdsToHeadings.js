import { JSDOM } from 'jsdom';
export function generateSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function addIdsToHeadings(htmlString) {
    
    
    // Create a JSDOM instance from the HTML string
    const dom = new JSDOM(htmlString);
    
    // Get the document object
    const doc = dom.window.document;
    
    // Get all heading elements
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Iterate over each heading and add an id attribute
    headings.forEach(heading => {
        const slug = generateSlug(heading.textContent);
        heading.setAttribute('id', slug);
    });
    
    // Serialize the modified HTML and return it
    return dom.serialize();
}