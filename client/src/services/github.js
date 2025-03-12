const GITHUB_USERNAME = 'ShashwatThakur0'; // Replace with your GitHub username

// Function to get repository languages
async function getRepoLanguages(repoName) {
  try {
    console.log(`Fetching languages for repo: ${repoName}`);
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`);
    if (!response.ok) {
      console.warn(`Failed to fetch languages for ${repoName}: ${response.status}`);
      return [];
    }
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
    console.log(`Fetching readme for repo: ${repoName}`);
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`);
    if (response.status === 404) {
      console.warn(`No readme found for ${repoName}`);
      return null;
    }
    if (!response.ok) {
      console.warn(`Failed to fetch readme for ${repoName}: ${response.status}`);
      return null;
    }
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
    console.log(`Fetching repositories for user: ${GITHUB_USERNAME}`);
    // Fetch repositories
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch repositories: ${response.status}`);
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    const repos = await response.json();
    console.log(`Fetched ${repos.length} repositories`);

    if (repos.length === 0) {
      console.warn('No repositories found');
      return [];
    }

    // Fetch additional details for each repository
    const enhancedRepos = await Promise.all(
      repos.map(async (repo) => {
        try {
          console.log(`Processing repo: ${repo.name}`);
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
        } catch (error) {
          console.error(`Error processing repo ${repo.name}:`, error);
          // Return a basic version of the repo if there's an error
          return {
            id: repo.id,
            title: repo.name,
            description: repo.description || 'No description available',
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(repo.name)}&background=0D1117&color=fff&size=256`,
            technologies: [],
            githubLink: repo.html_url,
            updatedAt: repo.updated_at,
          };
        }
      })
    );

    // Sort repositories by update date
    return enhancedRepos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Return an empty array if there's an error
    return [];
  }
};
