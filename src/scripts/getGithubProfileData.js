export default async function GetGithubProfileData({ username }) {
  const url = `https://api.github.com/users/${username}`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json ;
  } catch (error) {
    console.error("Erro ao obter dados de perfil do Github: ", {errorMessage: error.message, Stack: error.stack})
    return {error: error.message, completeError: error}
  }
}