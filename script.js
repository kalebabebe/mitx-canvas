let pyodide;

async function loadPyodideAndPackages() {
    try {
        pyodide = await loadPyodide();
        await pyodide.loadPackage("micropip");
        await pyodide.runPythonAsync(`
            import micropip
            await micropip.install('regex')
        `);
        console.log("Pyodide loaded successfully");
        document.getElementById('convert-btn').disabled = false;
    } catch (error) {
        console.error("Error loading Pyodide:", error);
        document.getElementById('output-urls').value = "Error loading Pyodide. Please refresh the page and try again.";
    }
}

async function convertUrls() {
    if (!pyodide) {
        alert("Pyodide is not loaded yet. Please wait and try again.");
        return;
    }

    const inputUrls = document.getElementById('input-urls').value.split('\n');
    const outputTextarea = document.getElementById('output-urls');
    
    outputTextarea.value = 'Converting...';

    const pythonCode = `
import re
def convert_url(old_url):
    base_url = re.search(r'https?://[^/]+', old_url).group()
    course_id_match = re.search(r'course-v1:[^/]+', old_url)
    if course_id_match:
        course_id = course_id_match.group()
    else:
        return "Course ID not found in URL"
    usage_id_match = re.search(r'block-v1:[^/]+', old_url)
    if usage_id_match:
        usage_id = usage_id_match.group()
    else:
        return "Usage ID not found in URL"
    new_url = f"{base_url}/lti_provider/courses/{course_id}/{usage_id}"
    return new_url

def convert_urls(urls):
    return [convert_url(url) for url in urls]

urls = ${JSON.stringify(inputUrls)}
result = convert_urls(urls)
print(result)
    `;

    try {
        const result = await pyodide.runPythonAsync(pythonCode);
        outputTextarea.value = result.replace(/[[\]']/g, '').replace(/,/g, '\n');
    } catch (error) {
        outputTextarea.value = `Error: ${error.message}`;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convert-btn').addEventListener('click', convertUrls);
    document.getElementById('convert-btn').disabled = true;
    loadPyodideAndPackages();
});