import { useInView } from 'react-intersection-observer'
import { about } from '../data'

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2 })

  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="gradient-text">{about.title}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#374151] to-transparent" />
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6 text-[#9ca3af] leading-relaxed">
              {about.bio.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="gradient-border p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#6b7280] text-center">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
