import type { FC } from "react";
import "../styles/team-styles.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "ANUCHA TRUATMAKKHA",
    role: "Developer",
    bio: "Full-stack architect with a passion for building scalable systems. Dedicated to crafting elegant solutions to complex problems through clean code and thoughtful design..",
    expertise: ["React", "Node.js", "TypeScript","CSS"],
    github: "anuchatruatmakkha",
    linkedin: "anucha truatmakkha",
    twitter: "banajank",
  },
  {
    name: "ANITA WONGCHAWALIT",
    role: "Developer",
    bio: "UI/UX enthusiast who transforms designs into pixel-perfect, performant interfaces. Obsessed with accessibility and user experience.",
    expertise:  ["React", "Node.js", "TypeScript","CSS"],
    github: "doylethecat",
    linkedin: "Anita Wongchawalit",
  },
  {
    name: "KANOKKARN MUANGJUN",
    role: "Developer",
    bio: "Database wizard and API architect. Specializes in building robust, high-performance backend systems that scale.",
    expertise: ["React", "Node.js", "TypeScript","CSS"],
    github: "kanokkarn13",
    twitter: "KANOKKARN MUANGJUN",
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
            A collective of passionate creators and developers shaping the future of music experiences. We blend technology and creativity to bring sound to life.
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
                  .split(" ")
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
                <a href={`https://github.com/${member.github}`} className="social-link" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              )}
              {member.linkedin && (
                <a href={`https://linkedin.com/in/${member.linkedin}`} className="social-link" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              )}
              {member.twitter && (
                <a href={`https://twitter.com/${member.twitter}`} className="social-link" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

<section className="project-overview my-8">
  <div className="card bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200">
    <div className="p-6 md:flex md:gap-6">
      {/* Left: summary */}
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">About this project</h2>
        <p className="text-sm text-gray-600 mb-4">
          A compact music-app demo showcasing a modern frontend stack with routing, global state and API integration. Built for clarity, performance and easy extensibility.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">Vite</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">React</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">TypeScript</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">React Router</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">Redux Toolkit</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">TailwindCSS</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">daisyUI</span>
          <span className="px-2 py-1 text-xs rounded border border-gray-300 bg-gray-50 text-gray-700">Axios</span>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="https://github.com/Kanokkarn13/music-app"
            className="px-3 py-1 text-sm rounded border border-gray-300 text-gray-800 hover:bg-gray-100"
            aria-label="View repo"
          >
            View repo
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
              <div className="text-xs text-gray-500">Client-side pages: Home, Track detail, Favorites, Top Album, About</div>
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
              <div className="text-sm font-medium text-gray-800">State</div>
              <div className="text-xs text-gray-500">Redux Toolkit for loading, errors, pagination and search</div>
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
              <div className="text-xs text-gray-500">TailwindCSS + daisyUI for quick, consistent UI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Footer CTA */}
      <footer className="team-footer">
        <div className="footer-content">
          <h2 className="footer-title">Want to join us?</h2>
          <p className="footer-description">
            We're always looking for talented developers who share our passion for excellence.
          </p>
          <a
            href="https://th.jobsdb.com"
            className="footer-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Open Positions
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MeetTheTeam;

