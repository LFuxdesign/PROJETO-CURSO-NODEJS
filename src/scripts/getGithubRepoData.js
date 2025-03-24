import { useState, useEffect } from "react";

const cacheRepo = {};

export default function GetGithubRepoData(userName, repoName) {
  const [repoData, setRepoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userName) return;

    if (cacheRepo[userName]) {
      setRepoData(cacheRepo[userName]);
      return;
    }

    fetch(`https://api.github.com/repos/${userName}/${repoName}`)
      .then((res) => {
        if (!res.ok) throw new Error("Repositório não encontrado");
        return res.json();
      })
      .then((repoData) => {
        cacheRepo[userName] = repoData;
        setRepoData(repoData);
      })
      .catch(setError)
  }, [userName, repoName]);

  return { repoData, error };
}
