import { useState } from 'react';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import './App.css';

// ============================================
// PROJECT DATA
// ============================================
const projects = [
  {
    id: 1,
    title: "The Embodied Communication Game: A Task for Reinforcement-Learning Agents",
    description: "Analyzed RL agent performance in a game requiring the formation of novel communication systems without explicit channels. Implemented and evaluated reinforcement learning models in custom RL environments.",
    tags: ["Machine Learning","Reinforcement Learning","Python","Keras","Gymnasium","StableBaselines3"],
    image: "/images/ECG.png",
    githubUrl: "https://github.com/EvanMcCormick37/independent-study-F24-learning-RL-with-gymnasium",
    liveUrl: "https://independent-study-f24-learning-rl-w.vercel.app/",
  },
  {
    id: 2,
    title: "Text Mining Public Opinion on the Transgender Rights Movement in the News",
    description: "Analyzed transgender rights coverage across the political spectrum using web-scraped news data. Applied clustering, topic modeling, and rule-mining to categorize and characterize the text. Implemented various supervised learning models (Naive-Bayes, Decision Trees, SVMs), plus neural networks for sentiment analysis—revealing key trends in media representation of transgender issues.",
    tags: ["Data Science","Text Mining","Sentiment Analysis","NLP","Unsupervised Learning","Clustering","ARM","LDA","Python","R"],
    image: "/images/TextMining.png",
    githubUrl: "https://github.com/EvanMcCormick37/Text-Mining-Research-Project-Spring-2024",
    liveUrl: "https://text-mining-research-project-spring.vercel.app/",
  },
  {
    id: 3,
    title: "Data Science Substack: Bouldering Elo on MountainProject",
    description: "Scraped tick data for boulders in Colorado from MountainProject. Analyzed the data, used various models to predict V-grade estimates with other data, and created a match-making system to estimate climber strength and boulder difficulty without use of personal V-grade estimations.",
    tags: ["Data Science", "Data Mining", "Data Visualization", "Data Communication", "Python"],
    image:"/images/MP.jpg",
    githubUrl: "https://github.com/EvanMcCormick37/climbing-grade-predictions-without-user-grades",
    liveUrl: "https://evmojo37.substack.com/p/who-needs-v-grades",
  },
  {
    id: 4,
    title: "Data Science Substack: Designing a Chess Puzzle App w. Database",
    description: "Designed a Chess Puzzle Evaluation App for Android using Kotlin. Aggregated and filtered online position databases to create a curated database of positions from which useful positions could be selected at random. Trained a neural network to evaluate positions and used the model's error to estimate puzzle difficulty",
    tags: ["Data Science", "Data Mining", "Statistics", "Database Management", "Data Communication", "Kotlin", "JavaScript", "Firebase"],
    image: "/images/CG.png",
    githubUrl: "https://github.com/EvanMcCormick37/ChessEvaluator",
    liveUrl: "https://evmojo37.substack.com/p/chess-app-part-ii-the-positions-strike",
  }
];

// ============================================
// TAG COMPONENT
// ============================================
const Tag = ({ children, index }) => {
  const tagClasses = [
    'tag-blue',
    'tag-green', 
    'tag-purple',
    'tag-red',
    'tag-yellow',
    'tag-indigo',
    'tag-pink',
    'tag-gray'
  ];

  return (
    <span
      className={`tag ${tagClasses[index % tagClasses.length]}`}
    >
      {children}
    </span>
  );
};

// ============================================
// PROJECT CARD COMPONENT
// ============================================
const ProjectCard = ({ project }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="project-card">
      {/* Project Image/Screenshot */}
      <div className="project-image-container">
        {!imageError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="project-image loaded"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="project-image-placeholder">
            <div className="text-center">
              <div className="text-center"></div>
              <p className="text-center">{project.title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="project-content">
        {/* Title */}
        <h2 className="project-title">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <Tag key={index} index={index}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Description */}
        <p className="project-description">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="project-buttons">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>Read More</span>
          </a>
          
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <span>Visit</span>
            <ExternalLink size={16} />
          </a>
          
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="View on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </article>
  );
};

// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">
          Evan McCormick
        </h1>
        <p className="header-subtitle">
          Data Science, Machine Learning, Software Engineering
        </p>
      </div>
    </header>
  );
};

// ============================================
// MORE PROJECTS BUTTON COMPONENT
// ============================================
const MoreProjectsButton = ({ showAll, onClick, projectCount }) => {
  if (projectCount <= 4) return null;

  return (
    <div className="more-projects-section">
      <button
        onClick={onClick}
        className="more-projects-btn"
      >
        <span>
          {showAll ? 'Show Less' : 'More Projects'}
        </span>
        <ChevronDown
          size={20}
          className={`chevron-icon ${
            showAll ? 'rotated' : ''
          }`}
        />
      </button>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Project Grid */}
        <div className="project-grid">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;