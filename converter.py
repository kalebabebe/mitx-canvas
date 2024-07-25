import re

def convert_url(old_url):
    # Extract the base URL up to the domain
    base_url = re.search(r'https?://[^/]+', old_url).group()
    # Extract the course ID
    course_id_match = re.search(r'course-v1:[^/]+', old_url)
    if course_id_match:
        course_id = course_id_match.group()
    else:
        return "Course ID not found in URL"
    # Extract the usage ID
    usage_id_match = re.search(r'block-v1:[^/]+', old_url)
    if usage_id_match:
        usage_id = usage_id_match.group()
    else:
        return "Usage ID not found in URL"
    # Construct the new URL
    new_url = f"{base_url}/lti_provider/courses/{course_id}/{usage_id}"
    return new_url

# Prompt for old URL
if __name__ == "__main__":
    old_url = input("Enter the old URL: ")
    new_url = convert_url(old_url)
    print("Converted URL:", new_url)