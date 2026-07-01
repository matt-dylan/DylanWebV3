import { GraduationCap, BookOpen } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const education = {
  degree: 'Bachelor of Science in Computer Science',
  school: 'Louisiana Tech University',
  location: 'Ruston, LA',
  years: '2013 - 2017',
  certifications: [
    { name: 'Salesforce Certified Platform Developer I', icon: '🏆' },
    { name: 'Professional Scrum Master I (PSM I)', icon: '🔰' },
    { name: 'Professional Product Owner (PSPO I)', icon: '📋' },
    { name: 'Professional Scrum Developer I (PSD I)', icon: '💻' },
  ],
}

export default function Education() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="education" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="gradient-text">Education & Certifications</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#374151] to-transparent" />
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="gradient-border p-6 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <GraduationCap size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-medium text-white">
                  {education.degree}
                </p>
                <p className="text-accent font-medium">
                  {education.school}
                </p>
                <div className="flex items-center gap-4 text-[#6b7280] text-sm">
                  <span>{education.location}</span>
                  <span>•</span>
                  <span className="font-mono">{education.years}</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="gradient-border p-6 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <BookOpen size={24} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-white">Certifications</h3>
              </div>
              <div className="space-y-3">
                {education.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{cert.icon}</span>
                    <p className="text-[#e5e7eb] text-sm">{cert.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
