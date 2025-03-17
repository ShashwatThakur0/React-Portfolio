const GITHUB_USERNAME = 'ShashwatThakur0'; // Replace with your GitHub username

// Use environment variable for GitHub token (safer approach)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Flag to always use fallback projects (for development/testing)
const USE_FALLBACK = import.meta.env.VITE_USE_FALLBACK_PROJECTS === 'true';

// Centralized fetch function with error handling and authorization
async function fetchGitHubAPI(url, customHeaders = {}) {
  // If we're using fallback projects, don't make API calls
  if (USE_FALLBACK) {
    console.log('Using fallback projects instead of GitHub API');
    return null;
  }

  try {
    console.log(`Fetching from GitHub API: ${url}`);

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      ...customHeaders
    };

    // Use the token for authentication to avoid rate limiting
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
      console.log('Using GitHub token for authentication');
    } else {
      console.warn('No GitHub token provided. Rate limits may apply.');
    }

    const response = await fetch(url, { headers });

    if (response.status === 403 && response.headers.get('X-RateLimit-Remaining') === '0') {
      console.error('GitHub API rate limit exceeded. Consider adding a token.');
      throw new Error('GitHub API rate limit exceeded');
    }

    if (response.status === 404) {
      console.warn(`Resource not found: ${url}`);
      return null;
    }

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from GitHub API: ${url}`, error);
    return null;
  }
}

// Function to get repository languages
async function getRepoLanguages(repoName) {
  const languages = await fetchGitHubAPI(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`);
  if (!languages) return [];
  return Object.keys(languages);
}

// Function to get repository topics
async function getRepoTopics(repoName) {
  const topicsData = await fetchGitHubAPI(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/topics`,
    { 'Accept': 'application/vnd.github.mercy-preview+json' }
  );

  if (!topicsData || !topicsData.names) return [];
  return topicsData.names;
}

// Function to get repository readme
async function getRepoReadme(repoName) {
  const readmeData = await fetchGitHubAPI(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`);
  if (!readmeData || !readmeData.content) return null;

  try {
    return atob(readmeData.content); // Decode base64 content
  } catch (error) {
    console.error('Error decoding readme content:', error);
    return null;
  }
}

// Main function to fetch GitHub projects
export const fetchGithubProjects = async () => {
  // If fallback mode is enabled, immediately return fallback projects
  if (USE_FALLBACK) {
    console.log('Using fallback projects (environment variable setting)');
    return getFallbackProjects();
  }

  try {
    console.log(`Fetching repositories for user: ${GITHUB_USERNAME}`);

    // Fetch repositories - increased to 30 repos and excluded forks
    const repos = await fetchGitHubAPI(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30&type=owner&fork=false`
    );

    if (!repos || repos.length === 0) {
      console.warn('No repositories found or error fetching repositories');
      return getFallbackProjects(); // Return fallback projects instead of empty array
    }

    console.log(`Fetched ${repos.length} repositories`);

    // Process repositories in parallel
    const enhancedRepos = await Promise.all(
      repos.map(async (repo) => {
        try {
          if (repo.fork || repo.archived) {
            console.log(`Skipping forked or archived repo: ${repo.name}`);
            return null; // Skip forked repositories
          }

          console.log(`Processing repo: ${repo.name}`);

          // Get repository details in parallel
          const [languages, topics, readme] = await Promise.all([
            getRepoLanguages(repo.name),
            getRepoTopics(repo.name),
            getRepoReadme(repo.name)
          ]);

          // Generate a placeholder image based on repo name
          const placeholderImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            repo.name
          )}&background=0D1117&color=fff&size=256`;

          return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),  // Format the name for display
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
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description || 'No description available',
            image: `https://ui-avatars.com/api/?name=${encodeURIComponent(repo.name)}&background=0D1117&color=fff&size=256`,
            technologies: [],
            githubLink: repo.html_url,
            updatedAt: repo.updated_at,
          };
        }
      })
    );

    // Filter out null entries (skipped repos) and sort by update date
    const filteredRepos = enhancedRepos.filter(repo => repo !== null);

    // If we got actual repos, return them; otherwise fall back
    if (filteredRepos.length > 0) {
      // Sort repositories by update date (most recent first)
      return filteredRepos.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else {
      console.warn('No valid repositories found, using fallback projects');
      return getFallbackProjects();
    }
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Return fallback projects if there's an error
    return getFallbackProjects();
  }
};

// Fallback projects in case GitHub API fails
function getFallbackProjects() {
  return [
    {
      id: 1,
      title: "Portfolio Website",
      description: "My personal portfolio website built with React, TailwindCSS, and Framer Motion. Features a modern UI with smooth animations and responsive design.",
      image: "https://ui-avatars.com/api/?name=Portfolio&background=0D1117&color=fff&size=256",
      technologies: ["React", "JavaScript", "Tailwind CSS", "Framer Motion"],
      liveLink: "#",
      githubLink: "https://github.com/ShashwatThakur0/React-Portfolio",
      stars: 5,
      forks: 2,
      updatedAt: new Date().toISOString(),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with user authentication, product management, cart functionality, and secure payment processing via Stripe.",
      image: "https://ui-avatars.com/api/?name=E-Commerce&background=0D1117&color=fff&size=256",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      liveLink: "#",
      githubLink: "https://github.com/ShashwatThakur0/ecommerce-app",
      stars: 8,
      forks: 3,
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() // 60 days ago
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A drag-and-drop task management application with user authentication, task categorization, priorities, due dates, and real-time updates.",
      image: "https://ui-avatars.com/api/?name=Task-App&background=0D1117&color=fff&size=256",
      technologies: ["React", "TypeScript", "Redux", "Firebase"],
      liveLink: "#",
      githubLink: "https://github.com/ShashwatThakur0/task-manager",
      stars: 6,
      forks: 2,
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days ago
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Real-time weather application that displays current weather conditions, forecasts, and historical data using external weather APIs.",
      image: "https://ui-avatars.com/api/?name=Weather&background=0D1117&color=fff&size=256",
      technologies: ["React", "JavaScript", "Chart.js", "OpenWeather API"],
      liveLink: "#",
      githubLink: "https://github.com/ShashwatThakur0/weather-app",
      stars: 4,
      forks: 1,
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString() // 120 days ago
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Real-time chat application supporting private messaging, group chats, file sharing, and message notifications.",
      image: "https://ui-avatars.com/api/?name=Chat-App&background=0D1117&color=fff&size=256",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveLink: "#",
      githubLink: "https://github.com/ShashwatThakur0/chat-app",
      stars: 7,
      forks: 2,
      updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
      createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString() // 150 days ago
    }
  ];
}
