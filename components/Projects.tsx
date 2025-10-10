'use client';

import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "Yatayat",
      description: "A comprehensive transportation management system built with modern web technologies. Features real-time tracking, route optimization, and user-friendly interface.",
      image: "/projects/yatayat.jpg",
      link: "https://yatayat.vercel.app",
      tags: ["Next.js", "React", "Tailwind CSS"]
    },
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard for seamless online shopping experience.",
      image: "/projects/ecommerce.jpg",
      link: "#",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, team collaboration features, and productivity analytics.",
      image: "/projects/taskmanager.jpg",
      link: "#",
      tags: ["TypeScript", "Express", "PostgreSQL"]
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard displaying real-time weather data, forecasts, and climate trends with beautiful visualizations.",
      image: "/projects/weather.jpg",
      link: "#",
      tags: ["React", "API Integration", "Charts"]
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for social media metrics, engagement tracking, and audience insights with comprehensive reporting tools.",
      image: "/projects/analytics.jpg",
      link: "#",
      tags: ["Vue.js", "Python", "Data Viz"]
    },
    {
      title: "Blog Platform",
      description: "Modern blogging platform with markdown support, SEO optimization, and content management system for writers and creators.",
      image: "/projects/blog.jpg",
      link: "#",
      tags: ["Next.js", "MDX", "CMS"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Projects
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and experience in web development
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to gradient background if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 flex items-center justify-center">
                  <div className="text-white text-4xl font-bold opacity-30">
                    {project.title.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  View Project
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
