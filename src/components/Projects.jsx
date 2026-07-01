import { Github, ExternalLink, Star } from 'lucide-react'
import { projects } from '../data'
import { useInView } from 'react-intersection-observer'

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-4">
            <span className="gradient-text">Projects</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#374151] to-transparent" />
          </h2>
          <p className="text-[#6b7280] mb-12 ml-10">
            A selection of projects I've built and contributed to
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.name}
                className={`group gradient-border p-6 hover:scale-[1.02] transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {project.featured && (
                  <div className="flex items-center gap-1 text-accent text-xs font-mono mb-3">
                    <Star size={12} fill="currentColor" />
                    Featured
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-[#9ca3af] text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs font-mono bg-[#1f2937] text-[#9ca3af] rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-[#9ca3af] hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[#9ca3af] hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
