import type { FC } from "react";
import "../styles/team-styles.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  github?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "ANUCHA TRUATMAKKHA",
    role: "Developer",
    bio: "Developed the Top Album page and integrated the iTunes Search/RSS APIs to fetch and display music and album data.",
    expertise: ["React", "Node.js", "TypeScript", "CSS"],
    github: "anuchatruatmakkha",
  },
  {
    name: "ANITA WONGCHAWALIT",
    role: "Developer",
    bio: "Built the About page and refined the UI/UX for accessibility, responsiveness, and performance.",
    expertise: ["React", "Node.js", "TypeScript", "CSS"],
    github: "doylethecat",
  },
  {
    name: "KANOKKARN MUANGJUN",
    role: "Developer",
    bio: "Designed the overall site structure and developed the Top Song page with reusable, scalable components.",
    expertise: ["React", "Node.js", "TypeScript", "CSS"],
    github: "kanokkarn13",
  },
];

const MeetTheTeam: FC = () => {
  return (
    <div className="team-container about-bw">
      {/* Hero Section */}
      <header className="team-header">
        <div className="header-content">
          <p className="header-label">Our Team</p>
          <h1 className="header-title">
            The minds behind
            <br />
            the website.
          </h1>
          <p className="header-description">
            A collective of passionate developers blending technology and creativity to craft smooth and engaging music experiences.
          </p>
        </div>
      </header>

      {/* Team Grid */}
      <section className="team-grid">
        {teamMembers.map((member, index) => (
          <article key={index} className="team-card">
            <div className="card-header">
              <div className="member-avatar" aria-hidden>
                {member.name
                  .trim()
                  .split(/\s+/)
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <p className="member-role">{member.role}</p>
              </div>
            </div>

            <p className="member-bio">{member.bio}</p>

            <div className="member-expertise">
              {member.expertise.map((skill, idx) => (
                <span key={idx} className="expertise-tag">
                  {skill}
                </span>
              ))}
            </div>

            <div className="member-links">
              {member.github && (
                <a
                  href={`https://github.com/${member.github}`}
                  className="social-link"
                  aria-label="GitHub"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* Project Overview */}
      <section className="project-overview my-8">
        <div className="card bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="p-6 md:flex md:gap-6">
            {/* Left: summary */}
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-2">About this project</h2>
              <p className="text-sm text-gray-600 mb-4">
                A modern music web application built to demonstrate a clean and scalable frontend architecture.
                The project focuses on modular design, efficient state management, and dynamic data rendering using
                real-time data from the iTunes API.
              </p>

              <p className="text-sm text-gray-600 mb-4">
                The main technologies used include{" "}
                <strong>Vite</strong> for fast bundling,{" "}
                <strong>React</strong> with <strong>TypeScript</strong> for component-based development,
                <strong>Redux Toolkit</strong> for state management,
                <strong>Tailwind CSS</strong> and <strong>DaisyUI</strong> for styling,
                and <strong>React Router DOM</strong> for seamless client-side navigation.
              </p>

              <div className="mt-6 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="text-sm font-medium text-gray-800 mb-1">
                  iTunes API Integration (Overview)
                </div>
                <ol className="list-decimal list-inside text-xs text-gray-600 space-y-1">
                  <li>
                    Fetch music and album data from the{" "}
                    <code className="px-1 bg-gray-100 rounded">/search</code> and{" "}
                    <code className="px-1 bg-gray-100 rounded">/rss</code> endpoints of the iTunes API.
                  </li>
                  <li>
                    Parse key fields such as{" "}
                    <code className="px-1 bg-gray-100 rounded">trackName</code>,{" "}
                    <code className="px-1 bg-gray-100 rounded">artistName</code>,{" "}
                    <code className="px-1 bg-gray-100 rounded">artworkUrl100</code>, and{" "}
                    <code className="px-1 bg-gray-100 rounded">previewUrl</code>.
                  </li>
                  <li>
                    Manage API data, loading, and errors globally using Redux Toolkit.
                  </li>
                  <li>
                    Render results dynamically in the Top Song and Top Album pages with reusable UI components.
                  </li>
                </ol>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://github.com/Kanokkarn13/music-app"
                  className="px-3 py-1 text-sm rounded border border-gray-300 text-gray-800 hover:bg-gray-100"
                  aria-label="View repo"
                >
                  View Repository
                </a>
              </div>
            </div>

            {/* Right: feature list */}
            <div className="md:w-1/2 mt-6 md:mt-0 grid grid-cols-1 gap-3">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100 text-gray-800">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 7v10a2 2 0 0 0 2 2h14" />
                      <path d="M17 3v4" />
                      <path d="M7 3v4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Routing</div>
                    <div className="text-xs text-gray-500">
                      Client-side pages: Home, Track Detail, Favorites, Top Album, Top Song, About
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100 text-gray-800">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20v-6" />
                      <path d="M8 12V8" />
                      <path d="M16 12v-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">State Management</div>
                    <div className="text-xs text-gray-500">
                      Centralized store using Redux Toolkit for data, loading, and error handling.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-gray-100 text-gray-800">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <path d="M7 10l5-5 5 5" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Styling</div>
                    <div className="text-xs text-gray-500">
                      Tailwind CSS + DaisyUI for a fast, consistent, and responsive UI.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetTheTeam;
