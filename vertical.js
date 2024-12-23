function convertUrl(oldUrl) {
    // First, check if it's a valid URL
    const baseUrlMatch = oldUrl.match(/https?:\/\/[^/]+/);
    if (!baseUrlMatch) {
        return "Invalid URL: Base URL not found";
    }
    const baseUrl = baseUrlMatch[0];

    // Extract the course ID
    const courseIdMatch = oldUrl.match(/course-v1:[^/]+/);
    if (!courseIdMatch) {
        return "Course ID not found in URL";
    }
    const courseId = courseIdMatch[0];

    // Look for the vertical block ID (it should be the last block in the URL)
    const verticalBlockMatch = oldUrl.match(/block-v1:[^/]+\+type@vertical\+block@[^/]+/);
    if (!verticalBlockMatch) {
        return "Vertical block ID not found in URL";
    }
    const verticalBlockId = verticalBlockMatch[0];

    return `${baseUrl}/lti_provider/courses/${courseId}/${verticalBlockId}`;
}

function convertUrls() {
    const inputUrls = document.getElementById('input-urls').value.split('\n');
    const outputTextarea = document.getElementById('output-urls');
    
    const convertedUrls = inputUrls.map(url => {
        const trimmedUrl = url.trim();
        return trimmedUrl ? convertUrl(trimmedUrl) : '';
    }).filter(url => url !== '');  // Remove empty lines
    
    outputTextarea.value = convertedUrls.join('\n\n');  // Join with double newline
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convert-btn').addEventListener('click', convertUrls);
});