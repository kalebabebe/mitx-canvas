function convertUrl(oldUrl) {
    // Extract the base URL (e.g., "https://example.com")
    const baseUrlMatch = oldUrl.match(/https?:\/\/[^/]+/);
    if (!baseUrlMatch) {
        return "Invalid URL: Base URL not found";
    }
    const baseUrl = baseUrlMatch[0];

    // Extract the course ID (e.g., "course-v1:edX+DemoX+Demo_Course")
    const courseIdMatch = oldUrl.match(/course-v1:[^/]+/);
    if (!courseIdMatch) {
        return "Course ID not found in URL";
    }
    const courseId = courseIdMatch[0];

    // Extract the usage ID (e.g., "block-v1:edX+DemoX+Demo_Course+type@problem+block@12345")
    const usageIdMatch = oldUrl.match(/block-v1:[^/]+/);
    if (!usageIdMatch) {
        return "Usage ID not found in URL";
    }
    const usageId = usageIdMatch[0];

    // Construct and return the converted URL
    return `${baseUrl}/lti_provider/courses/${courseId}/${usageId}`;
}

function convertUrls() {
    // Get the input URLs as a list of strings, split by line
    const inputUrls = document.getElementById('input-urls').value.split('\n');
    const outputTextarea = document.getElementById('output-urls');
    
    // Trim each URL and convert it using convertUrl, filtering out empty lines
    const convertedUrls = inputUrls.map(url => {
        const trimmedUrl = url.trim();
        return trimmedUrl ? convertUrl(trimmedUrl) : '';
    }).filter(url => url !== '');  // Remove empty lines
    
    // Combine the converted URLs with a double newline and set as output
    outputTextarea.value = convertedUrls.join('\n\n');
}

// Set up the click event listener for the convert button after the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convert-btn').addEventListener('click', convertUrls);
});
