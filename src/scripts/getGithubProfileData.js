export default async function GetGithubProfileData({ username }) {
  if (!username) return null;
  const url = `https://api.github.com/users/${username}`
  try {
    const response = await fetch(url);

    if (!response.ok) {
      let message = "Unknown error";
      try {
        const json = await response.json();
        message = json.message || message;
      } catch (_) {
        // Ignore JSON parsing error
      }
      const error = new Error("Error getting profile data from GitHub API");
      error.responseStatus = response.status;
      error.text = message;

      throw error;
    }
    const json = await response.json();

    return json;
  } catch (error) {
    console.error({
      error: error.message,
      responseStatus: error.responseStatus,
      message: error.text
    })
    return {
      error: true,
      responseStatus: error.responseStatus,
      message: error.message,
      text: error.text
    };
  }
}