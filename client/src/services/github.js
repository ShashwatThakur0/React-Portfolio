const GITHUB_USERNAME = 'ShashwatThakur0'; // Replace with your GitHub username

export const fetchGithubProjects = async () => {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    const repos = await response.json();
    
    // Transform the data to match our project structure
    return repos.map(repo => ({
      id: repo.id,
      title: repo.name,
      description: repo.description || 'No description available',
      image: '/project-placeholder.jpg', // You can add a default image or use repo social preview if available
      technologies: [repo.language].filter(Boolean), // Add more languages if you want to parse them from repo
      liveLink: repo.homepage || '',
      githubLink: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at
    }));
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}
