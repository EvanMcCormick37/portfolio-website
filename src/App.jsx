import { useState } from 'react';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';

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
];

// ============================================
// TAG COMPONENT
// ============================================
const Tag = ({ children, index }) => {
  const colors = [
    'bg-blue-100 text-blue-700 hover:bg-blue-200',
    'bg-orange-100 text-orange-700 hover:bg-orange-200',
    'bg-green-100 text-green-700 hover:bg-green-200',
    'bg-purple-100 text-purple-700 hover:bg-purple-200',
    'bg-teal-100 text-teal-700 hover:bg-teal-200',
    'bg-pink-100 text-pink-700 hover:bg-pink-200',
    'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  ];

  return (
    <span
      className={`
        px-3 py-1.5 text-xs font-bold rounded-full
        transition-colors duration-200
        ${colors[index % colors.length]}
      `}
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
    <article className="
      bg-white rounded-2xl shadow-md overflow-hidden
      hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300
      flex flex-col h-full
      border border-gray-100
    ">
      {/* Project Image/Screenshot */}
      <div className="relative h-64 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
        {!imageError ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mx-auto mb-4 opacity-20"></div>
              <p className="text-gray-400 font-semibold text-lg">{project.title}</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
          {project.title}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <Tag key={index} index={index}>
              {tag}
            </Tag>
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-4">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 bg-orange-500 hover:bg-orange-600
              text-white font-bold py-3 px-4 rounded-xl
              transition-all duration-200
              flex items-center justify-center gap-2
              shadow-md hover:shadow-lg
              active:scale-95
            "
          >
            <span>Read More</span>
          </a>
          
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 bg-white border-2 border-blue-500
              text-blue-600 hover:bg-blue-50 hover:border-blue-600
              font-bold py-3 px-4 rounded-xl
              transition-all duration-200
              flex items-center justify-center gap-2
              shadow-md hover:shadow-lg
              active:scale-95
            "
          >
            <span>Visit</span>
            <ExternalLink size={16} />
          </a>
          
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-gray-100 hover:bg-gray-800 hover:text-white
              text-gray-700 p-3 rounded-xl
              transition-all duration-200
              flex items-center justify-center
              shadow-md hover:shadow-lg
              active:scale-95
            "
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
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Evan McCormick
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Data Science, Machine Learning, and Software Engineering portfolio
          </p>
        </div>
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
    <div className="flex justify-center mt-12">
      <button
        onClick={onClick}
        className="
          bg-white hover:bg-orange-50
          text-orange-600 font-bold py-4 px-8
          rounded-xl shadow-lg hover:shadow-xl
          transition-all duration-200
          flex items-center gap-3
          border-2 border-orange-500
          active:scale-95
        "
      >
        <span className="text-lg">
          {showAll ? 'Show Less' : 'More Projects'}
        </span>
        <ChevronDown
          size={20}
          className={`transform transition-transform duration-300 ${
            showAll ? 'rotate-180' : ''
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 auto-rows-fr">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;