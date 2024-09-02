function revertUrl(canvasUrl) {
    const baseUrlMatch = canvasUrl.match(/https?:\/\/[^/]+/);
    const courseIdMatch = canvasUrl.match(/courses\/(\d+)/);
    const usageIdMatch = canvasUrl.match(/assignments\/(\d+)/);

    if (!baseUrlMatch) {
        return "Invalid URL: Base URL not found";
    }
    const baseUrl = baseUrlMatch[0];

    if (!courseIdMatch) {
        return "Course ID not found in URL";
    }
    const courseId = courseIdMatch[1];

    if (!usageIdMatch) {
        return "Usage ID not found in URL";
    }
    const usageId = usageIdMatch[1];

    // Construct the MITx URL from the Canvas URL components
    return `${baseUrl}/courses/${courseId}/blocks/${usageId}`;
}

function revertUrls() {
    const inputUrls = document.getElementById('input-urls').value.split('\n');
    const outputTextarea = document.getElementById('output-urls');
    
    const revertedUrls = inputUrls.map(url => {
        const trimmedUrl = url.trim();
        return trimmedUrl ? revertUrl(trimmedUrl) : '';
    }).filter(url => url !== '');  // Remove empty lines
    
    outputTextarea.value = revertedUrls.join('\n\n');  // Join with double newline
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('revert-btn').addEventListener('click', revertUrls);
});
