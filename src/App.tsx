import { useState, useEffect } from "react";
import "./App.css";
import ModelViewer from "./components/ModelViewer";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  demoUrl?: string; // URL to your project (can be local or external)
  sourceUrl?: string; // GitHub or source code URL
  thumbnail?: string; // Optional thumbnail image
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // REPLACE THESE WITH YOUR ACTUAL PROJECTS
  // Add your project URLs in the demoUrl field (can be relative paths like '/projects/project1/index.html' or external URLs)
  const projects: Project[] = [
    {
      id: 1,
      title: "3D Model Viewer",
      description:
        "Interactive 3D model viewer with real-time rendering and camera controls. Explore 3D assets with smooth navigation and detailed visualization.",
      tech: ["Three.js", "WebGL", "JavaScript"],
      category: "3D",
      demoUrl: "https://users.metropolia.fi/~walttewe/3d-model-viewer/dist/",
      sourceUrl: "https://users.metropolia.fi/~walttewe/3d-model-viewer/dist/",
      thumbnail: "./public/thumbnails/batman-thumbnail.png",
    },
    {
      id: 2,
      title: "3D rapier physics demo",
      description:
        "VR compatible 3D physics simulation using Rapier physics engine. Interact with objects in a realistic environment with gravity",
      tech: ["Three.js", "WebGL", "JavaScript", "Rapier"],
      category: "VR",
      demoUrl: "https://users.metropolia.fi/~walttewe/rapier-lab/dist/",
      sourceUrl: "https://github.com/WaltteriWe/rapier-lab",
      thumbnail: "./public/thumbnails/ball-thumb.png",
    },
    {
      id: 3,
      title: "WEBGL Stacker game",
      description:
        "3D Stacker game built with WebGL and Three.js. Stack moving blocks as high as you can while enjoying smooth graphics and engaging gameplay.",
      tech: ["Three.js", "WebGL", "JavaScript"],
      category: "WEBGL",
      demoUrl: "https://users.metropolia.fi/~walttewe/webgl-stacker/dist/",
      sourceUrl: "https://github.com/WaltteriWe/webgl-peli",
      thumbnail: "./public/thumbnails/stacker-thumb.png",
    },

    // ADD YOUR PROJECTS BELOW - Copy this template and fill in your details:
    // {
    //   id: 2,
    //   title: "Your Project Name",
    //   description: "Description of your AR/VR experience",
    //   tech: ["Three.js", "WebXR", "React"], // Technologies used
    //   category: "AR", // AR, VR, or MR
    //   demoUrl: "/projects/your-project-folder/index.html", // Path to your project
    //   sourceUrl: "https://github.com/yourusername/project", // Optional
    //   thumbnail: "/thumbnails/your-project.jpg" // Optional
    // },
  ];

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for animation
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">AR/VR Portfolio</span>
          </div>
          <ul className="nav-menu">
            <li>
              <a
                href="#home"
                onClick={() => setActiveSection("home")}
                className={activeSection === "home" ? "active" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={() => setActiveSection("projects")}
                className={activeSection === "projects" ? "active" : ""}
              >
                Projects
              </a>
            </li>
          </ul>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">3d projects</span>
              <br />
              in AR & VR
            </h1>
            <p className="hero-subtitle">
              Exploring interesting and new web technologies for immersive
              experiences.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">View Projects</button>
            </div>
          </div>
          <div className="hero-visual">
            <ModelViewer modelPath="/lego_batman.glb" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects" id="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Explore my latest work in immersive technology
          </p>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div
                  className="project-image"
                  style={{
                    backgroundImage: project.thumbnail
                      ? `url(${project.thumbnail})`
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  <div className="project-overlay">
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-buttons">
                    {project.demoUrl && (
                      <button
                        className="project-link primary"
                        onClick={() => openProjectModal(project)}
                      >
                        Launch Demo
                      </button>
                    )}
                    {project.sourceUrl && (
                      <button
                        className="project-link secondary"
                        onClick={() => window.open(project.sourceUrl, "_blank")}
                      >
                        View Code
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Waltteri Westerholm.</p>
      </footer>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div
          className={`modal-overlay ${isModalOpen ? "open" : ""}`}
          onClick={closeProjectModal}
        >
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProject.title}</h2>
              <button className="modal-close" onClick={closeProjectModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              {selectedProject.demoUrl ? (
                <iframe
                  src={selectedProject.demoUrl}
                  title={selectedProject.title}
                  className="project-iframe"
                  allow="accelerometer; camera; gyroscope; microphone; xr-spatial-tracking; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="no-demo">
                  <p>Demo not available</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <p className="modal-description">{selectedProject.description}</p>
              <div className="modal-actions">
                {selectedProject.demoUrl && (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      window.open(selectedProject.demoUrl, "_blank")
                    }
                  >
                    Open in New Tab
                  </button>
                )}
                {selectedProject.sourceUrl && (
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      window.open(selectedProject.sourceUrl, "_blank")
                    }
                  >
                    View Source Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
