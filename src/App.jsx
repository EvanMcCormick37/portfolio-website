import { useState, useCallback, useMemo } from 'react';
import {Github, ChevronUp, Mail, Phone, MapPin, Linkedin} from 'lucide-react';
import emailjs from "@emailjs/browser";
import './App.css';

//============================================
// PERSONAL INFO
//============================================
const personalInfo={
    title: "About Me",
    text: "Hey y'all! I'm an avid Data Scientist and Software Developer with 3 years of experience in full-stack development. Earlier this year, I completed my Master's in Data Science at University of Colorado Boulder (May 2025) with a focus in Machine Learning, Reinforcement Learning, LLMs and Big Data Architecture. I'm passionate about using statistics, ML engineering, and software design to develop innovative solutions to complex problems. Check out my skills and deployed projects here!",
    photoURL: "/assets/EvDevMojo.jpg",
    resumeURL: "/assets/Resume.pdf"
  }

//============================================
// CONTACT INFO
//============================================
const contactInfo={
  email: "evdevmojo@gmail.com",
  phone: "(+1 US) 315 381 5247",
  location: "Clinton, NY 13323",
  social: {
    github: "https://github.com/EvanMcCormick37",
    linkedin: "https://www.linkedin.com/in/evan-mccormick-2793371a5/",
    substack: "https://evmojo37.substack.com/"
  }
}

//============================================
// PROJECT DATA
//============================================
const projects=[
    {
    title: "Distracted LLM: A full-stack RAG Application",
    description: "Built A full-stack RAG application on a budget of 0$, using REST API, containerization, cloud compute and serverless API proxying. Backend: Python, ChromaDB, SentenceTransformers, Gemini-2.0-flash. Front-end: React, Vite, TailwindCSS. API: FastAPI, Axios. Deployment and hosting: Docker, Google Cloud Compute, Vercel",
    tags: ["Python","Docker","CGP","RAG","REST API","Database Management","React"],
    image: "/assets/DLLM.png",
    githubUrl: "https://github.com/EvanMcCormick37/full-stack-RAG",
    readMoreUrl:"https://evmojo37.substack.com/p/distracted-llm",
    liveUrl: "https://full-stack-rag-neon.vercel.app/",
  },
  {
    title: "The Embodied Communication Game: A Task for Reinforcement-Learning Agents",
    description: "Analyzed RL agent performance in a game requiring the formation of novel communication systems without explicit channels. Implemented and evaluated reinforcement learning models in custom RL environments.",
    tags: ["Machine Learning","Reinforcement Learning","Python","Keras","TensorFlow","Gymnasium","StableBaselines3"],
    image: "/assets/ECG.png",
    githubUrl: "https://github.com/EvanMcCormick37/independent-study-F24-learning-RL-with-gymnasium",
    readMoreUrl: "https://independent-study-f24-learning-rl-w.vercel.app/",
  },
  {
    title: "Text Mining Public Opinion on the Transgender Rights Movement in the News",
    description: "Analyzed transgender rights coverage across the political spectrum using web-scraped news data. Applied clustering, topic modeling, and rule-mining to categorize and characterize the text. Implemented various supervised learning models (Naive-Bayes, Decision Trees, SVMs), plus neural networks for sentiment analysis—revealing key trends in media representation of transgender issues.",
    tags: ["Data Science","Text Mining","Sentiment Analysis","Clustering","ARM","LDA","Python","R"],
    image: "/assets/TM.png",
    githubUrl: "https://github.com/EvanMcCormick37/Text-Mining-Research-Project-Spring-2024",
    readMoreUrl: "https://text-mining-research-project-spring.vercel.app/",
  },
  {
    title: "Data Science Substack: Bouldering Elo on MountainProject",
    description: "Scraped tick data for boulders in Colorado from MountainProject. Analyzed the data, used various models to predict V-grade estimates with other data, and created a match-making system to estimate climber strength and boulder difficulty without use of personal V-grade estimations.",
    tags: ["Data Science", "Data Mining", "Data Visualization", "Data Communication", "Python"],
    image:"/assets/MP.jpg",
    githubUrl: "https://github.com/EvanMcCormick37/climbing-grade-predictions-without-user-grades",
    readMoreUrl: "https://evmojo37.substack.com/p/who-needs-v-grades",
  },
  {
    title: "Data Science Substack: Designing a Chess Puzzle App w. Database",
    description: "Designed a Chess Puzzle Evaluation App for Android using Kotlin. Aggregated and filtered online position databases to create a curated database of positions from which useful positions could be selected at random. Trained a neural network to evaluate positions and used the model's error to estimate puzzle difficulty",
    tags: ["Data Science", "Data Mining", "Database Management", "Data Communication", "Kotlin", "Firebase"],
    image: "/assets/CG.png",
    githubUrl: "https://github.com/EvanMcCormick37/ChessEvaluator",
    readMoreUrl: "https://evmojo37.substack.com/p/chess-app-part-ii-the-positions-strike",
  }
];


//============================================
// TAG COMPONENT
//============================================
const Tag=({ children, index })=> {
  const tagClasses=[
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

//============================================
// PROJECT CARD COMPONENT
//============================================
const ProjectCard=({ project })=> {
  const [imageError, setImageError]=useState(false);

  return (
    <article className="project-card">
      {/* Project Image/Screenshot */}
      <div className="project-image-container">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="project-image loaded"
            onError={()=> setImageError(true)}
            href={project.liveUrl?? null}
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
          {project.tags.sort().map((tag, index)=> (
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
            href={project.readMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <span>Read More</span>
          </a>
          {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            >
            <span>Try it Live!</span>
          </a>
          )}
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

//============================================
// PERSONAL INFO CARD COMPONENT
//============================================
const PersonalCard=({title, text, photoURL, resumeURL})=> {

  const allSkills = useMemo(()=>{

    const flatTags = projects.flatMap(project => project.tags);

    const tagCounts = flatTags.reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    },{});

    return Object.entries(tagCounts)
      .map(([tag, count])=>({tag, count}))
      .sort((a,b)=>b.count - a.count || a.tag.localeCompare(b.tag));
  },[projects]);

  return (
    <div className="personal-card">
      {/* AboutMe section with Photo */}
      <div className="about-section">
        <div className="about-header">
          <h1 className="about-title">{title}</h1>
          <img src={photoURL} alt="profile" className="about-photo"/>
        </div>
        <p className="about-text">{text}</p>
      </div>
      {/* Skills section */}
      <div className="skills-section">
        <h2 className="skills-title">Skills</h2>
        <div className="skills-container">
          {allSkills.map((skill,index)=>(
            <Tag key={index} index={index}>{`${skill.tag} (${skill.count})`}</Tag>
          ))}
        </div>
      </div>
      {/* Resume Link */}
      <div className="resume-section">
        <a
          href={resumeURL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View Resume
        </a>
      </div>
    </div>
  )
}

//============================================
// CONTACT CARD COMPONENT
//============================================
const ContactCard=({ email, phone, location, social })=> {
  const [formData, setFormData]=useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit=(e)=> {
    e.preventDefault();

    const serviceId="service_2zjpfup";
    const templateId="template_onzvo93";
    const publicKey="Ia45PidZGRXBo8lZi";

    const templateParams={
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: "evdev.mojo@gmail.com"
    };

    setFormData({
      name: '',
      email: '',
      message: '',
    });

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) =>{
        console.log(response.status, response.text);
      });
  };

  const handleChange=(e)=> {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-card">
      {/* Left Side - Contact Info */}
      <div className="contact-info">
        <h2 className="contact-heading">Contact Info</h2>
        <div className="contact-details">
          {/* Email */}
          <div className="contact-item">
            <div className="contact-icon">
              <Mail size={20}/>
            </div>
            <a href={`mailto:${email}`} className="contactValue">{email}</a>
          </div>

          {/* Phone */}
          <div className="contact-item">
            <div className="contact-icon">
              <Phone size={20}/>
            </div>
            <div>
              <a href={`tel:${phone.replace(/\s/g, '')}`} className="contact-value">{phone}</a>
            </div>
          </div>  

          {/* Location */}
          <div className="contact-item">
            <div className="contact-icon">
              <MapPin size={20}/>
            </div>
            <div>
              <div className="contact-value">{location}</div>
            </div>
          </div>

          {/* Socials */}
          <div className="contact-socials">
            <a href={social.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <img src="/assets/LI.png" alt="LinkedIn" className="social-logo"/>
            </a>
            <a href={social.substack} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Substack">
              <img src="/assets/Substack.png" alt="Substack" className="social-logo"/>
            </a>
          </div>
        </div>
      </div>
      {/* Right Side - Contact Form */}
      <div className = "contact-form-container">
      <p className="contact-description">Shoot me a message here!</p>

        {/* Email */}
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Message */}
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary contact-submit">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
//============================================
// SECTION CARD COMPONENT
//============================================
const SectionCard=({ children, name })=> {
  const [isOpen, setIsOpen]=useState(false);
  const toggle=useCallback(()=>{
    setIsOpen(prev=> !prev);
  }, []);

  return (
    <div className="section-card">
      {!isOpen &&
      <button className="section-header" onClick={toggle}>
        <span className="section-title">{name}</span>
      </button>
      }
      {isOpen && 
      <div className="section-content">
        {children}
        <button className="section-close" onClick={toggle}>
          <ChevronUp size={20}></ChevronUp>
        </button>
      </div>
      }
    </div>
  )
}

//============================================
// HEADER COMPONENT
//============================================
const Header=()=> {
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

//============================================
// MAIN APP COMPONENT
//============================================
function App() {

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Personal Info Section */}
        <SectionCard name={"Me"}>
          <PersonalCard {...personalInfo}/>
        </SectionCard>
        {/* Project Section */}
        <SectionCard name={"Projects"}>
          <div className="project-grid">
            {projects.map((project, index)=> (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </SectionCard>
        {/* Contact Section */}
        <SectionCard name={"Contact"}>
          <ContactCard {...contactInfo}/>
        </SectionCard>
      </main>
    </div>
  );
}

export default App;