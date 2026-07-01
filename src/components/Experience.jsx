import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { experience } from '../data'
import { useInView } from 'react-intersection-observer'

export default function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="gradient-text">Experience</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#374151] to-transparent" />
          </h2>

          <div className="space-y-8">
            {experience.map((job, i) => (
              <div
                key={i}
                className={`group relative pl-8 border-l-2 border-[#1f2937] hover:border-primary transition-colors duration-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#111827] border-2 border-[#374151] group-hover:border-primary transition-colors duration-500" />
                
                <div className="gradient-border p-6 hover:scale-[1.02] transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <span>{job.company}</span>
                        <span className="text-[#6b7280]">·</span>
                        <span className="flex items-center gap-1 text-[#6b7280] text-sm">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[#6b7280] text-sm font-mono">
                      <Calendar size={14} />
                      {job.period}
                    </span>
                  </div>
                  <p className="text-[#9ca3af] mb-4 leading-relaxed">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-mono bg-[#1f2937] text-accent rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
