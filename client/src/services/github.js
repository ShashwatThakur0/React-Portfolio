const GITHUB_USERNAME = 'ShashwatThakur0'; // Replace with your GitHub username

// Function to get repository languages
async function getRepoLanguages(repoName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`);
    const languages = await response.json();
    return Object.keys(languages);
  } catch (error) {
    console.error('Error fetching languages:', error);
    return [];
  }
}

// Function to get repository readme
async function getRepoReadme(repoName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`);
    if (response.status === 404) return null;
    const data = await response.json();
    return atob(data.content); // Decode base64 content
  } catch (error) {
    console.error('Error fetching readme:', error);
    return null;
  }
}

// Main function to fetch GitHub projects
export const fetchGithubProjects = async () => {
  try {
    // Fetch repositories
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos = await response.json();

    // Fetch additional details for each repository
    const enhancedRepos = await Promise.all(
      repos.map(async (repo) => {
        // Get languages for the repository
        const languages = await getRepoLanguages(repo.name);

        // Get readme content
        const readme = await getRepoReadme(repo.name);

        // Extract topics if available
        const topics = repo.topics || [];

        // Generate a placeholder image based on repo name
        const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          repo.name
        )}&background=0D1117&color=fff&size=256`;

        return {
          id: repo.id,
          title: repo.name,
          description: repo.description || 'No description available',
          image: placeholderImage,
          technologies: [...new Set([...languages, ...topics])],
          liveLink: repo.homepage || '',
          githubLink: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          createdAt: repo.created_at,
          isPrivate: repo.private,
          readmeContent: readme,
          defaultBranch: repo.default_branch,
          size: repo.size,
          watchersCount: repo.watchers_count,
          hasIssues: repo.has_issues,
          openIssues: repo.open_issues_count,
          license: repo.license?.name,
        };
      })
    );

    // Sort repositories by update date
    return enhancedRepos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
};
