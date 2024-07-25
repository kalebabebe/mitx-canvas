function convertUrl(oldUrl) {
    const baseUrlMatch = oldUrl.match(/https?:\/\/[^/]+/);
    const courseIdMatch = oldUrl.match(/course-v1:[^/]+/);
    const usageIdMatch = oldUrl.match(/block-v1:[^/]+/);

    if (!baseUrlMatch) {
        return "Invalid URL: Base URL not found";
    }
    const baseUrl = baseUrlMatch[0];

    if (!courseIdMatch) {
        return "Course ID not found in URL";
    }
    const courseId = courseIdMatch[0];

    if (!usageIdMatch) {
        return "Usage ID not found in URL";
    }
    const usageId = usageIdMatch[0];

    return `${baseUrl}/lti_provider/courses/${courseId}/${usageId}`;
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
