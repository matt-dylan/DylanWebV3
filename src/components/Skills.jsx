import { skills } from '../data'
import { useInView } from 'react-intersection-observer'

function SkillBar({ name, level, inView }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#e5e7eb]">{name}</span>
        <span className="text-xs font-mono text-accent">{level}%</span>
      </div>
      <div className="h-2 bg-[#1f2937] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ width: inView ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

function SkillCategory({ category, inView }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-primary rounded-full" />
        {category.name}
      </h3>
      <div className="space-y-4">
        {category.items.map((skill) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} inView={inView} />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 flex items-center gap-4">
            <span className="gradient-text">Skills</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[#374151] to-transparent" />
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {skills.categories.map((category, i) => (
              <SkillCategory
                key={category.name}
                category={category}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
