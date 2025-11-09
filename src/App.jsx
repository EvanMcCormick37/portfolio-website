import { useState, useCallback } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import './App.css';

// ============================================
// PROJECT DATA
// ============================================
const projects = [
  {
    title: "The Embodied Communication Game: A Task for Reinforcement-Learning Agents",
    description: "Analyzed RL agent performance in a game requiring the formation of novel communication systems without explicit channels. Implemented and evaluated reinforcement learning models in custom RL environments.",
    tags: ["Machine Learning","Reinforcement Learning","Python","Keras","Gymnasium","StableBaselines3"],
    image: "/images/ECG.PNG",
    githubUrl: "https://github.com/EvanMcCormick37/independent-study-F24-learning-RL-with-gymnasium",
    liveUrl: "https://independent-study-f24-learning-rl-w.vercel.app/",
  },
  {
    title: "Text Mining Public Opinion on the Transgender Rights Movement in the News",
    description: "Analyzed transgender rights coverage across the political spectrum using web-scraped news data. Applied clustering, topic modeling, and rule-mining to categorize and characterize the text. Implemented various supervised learning models (Naive-Bayes, Decision Trees, SVMs), plus neural networks for sentiment analysis—revealing key trends in media representation of transgender issues.",
    tags: ["Data Science","Text Mining","Sentiment Analysis","NLP","Unsupervised Learning","Clustering","ARM","LDA","Python","R"],
    image: "/images/TM.PNG",
    githubUrl: "https://github.com/EvanMcCormick37/Text-Mining-Research-Project-Spring-2024",
    liveUrl: "https://text-mining-research-project-spring.vercel.app/",
  },
  {
    title: "Data Science Substack: Bouldering Elo on MountainProject",
    description: "Scraped tick data for boulders in Colorado from MountainProject. Analyzed the data, used various models to predict V-grade estimates with other data, and created a match-making system to estimate climber strength and boulder difficulty without use of personal V-grade estimations.",
    tags: ["Data Science", "Data Mining", "Data Visualization", "Data Communication", "Python"],
    image:"/images/MP.JPG",
    githubUrl: "https://github.com/EvanMcCormick37/climbing-grade-predictions-without-user-grades",
    liveUrl: "https://evmojo37.substack.com/p/who-needs-v-grades",
  },
  {
    title: "Data Science Substack: Designing a Chess Puzzle App w. Database",
    description: "Designed a Chess Puzzle Evaluation App for Android using Kotlin. Aggregated and filtered online position databases to create a curated database of positions from which useful positions could be selected at random. Trained a neural network to evaluate positions and used the model's error to estimate puzzle difficulty",
    tags: ["Data Science", "Data Mining", "Statistics", "Database Management", "Data Communication", "Kotlin", "JavaScript", "Firebase"],
    image: "/images/CG.PNG",
    githubUrl: "https://github.com/EvanMcCormick37/ChessEvaluator",
    liveUrl: "https://evmojo37.substack.com/p/chess-app-part-ii-the-positions-strike",
  },
  {
    title: "Linear Model Generator for Numeric Datasets",
    description: "Developed a Python Streamlit application for generating and visualizing linear models for numeric datasets. Deployed application on Streamlit Cloud.",
    tags: ["Data Science", "Machine Learning", "Python", "Data Visualization", "Streamlit", "Data Communication"],
    image: "/images/LMG.PNG",
    githubUrl: "https://github.com/EvanMcCormick37/StreamlitLMApp",
    liveUrl: "https://linearmodelgenerator.streamlit.app/",
  }
];

const personalInfo = {
    title: "About Me",
    text: "Hey y'all! I'm an avid Data Scientist and Software Developer with 3 years of experience in full-stack development. Earlier this year, I completed my Master's in Data Science at University of Colorado Boulder (May 2025) with a focus in Machine Learning, Reinforcement Learning, LLMs and Big Data Architecture. I'm passionate about using statistics, ML engineering, and software design to develop innovative solutions to complex problems. Check out my skills and deployed projects here!"
  }

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
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="project-image loaded"
            onError={() => setImageError(true)}
          />
      </div>

      {/* Card Content */}
      <div className="project-content">
        {/* Title */}
        <h2 className="project-title">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="project-tags">
          {project.tags.sort().map((tag, index) => (
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
// PERSONAL INFO CARD COMPONENT
// ============================================
const PersonalCard = ({title, text}) => {
  return (
    <div className = "personal-card">
      <h1 className = "personal-title">{title}</h1>
      <p className = "personal-text">{text}</p>
      <></>
    </div>
  )
}

// ============================================
// SECTION CARD COMPONENT
// ============================================
const SectionCard = ({ children, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(()=>{
    setIsOpen(prev => !prev);
  }, []);

  return (
    <div className = "section-card">
      {!isOpen &&
      <button className = "section-header" onClick={toggle}>
        <span className = "section-title">{name}</span>
      </button>
      }
      {isOpen && 
      <div className = "section-content">
        {children}
        <button className = "section-close" onClick={toggle}>
          <ChevronUp size={20}></ChevronUp>
        </button>
      </div>
      }
    </div>
  )
}

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
// MAIN APP COMPONENT
// ============================================
function App() {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Personal Info Section */}
        <SectionCard name = {"Me"}>
          <PersonalCard {...personalInfo}></PersonalCard>
        </SectionCard>
        {/* Project Section */}
        <SectionCard name = {"Projects"}>
          <div className="project-grid">
            {displayedProjects.map((project) => (
              <ProjectCard project={project} />
            ))}
          </div>
        </SectionCard>
      </main>
    </div>
  );
}

export default App;