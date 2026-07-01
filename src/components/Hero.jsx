import { ChevronDown } from 'lucide-react'
import { hero } from '../data'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <p className="text-accent font-mono text-sm mb-4 animate-float">
          Hi, my name is
        </p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6">
          <span className="gradient-text">{hero.name}</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#9ca3af] font-light mb-8 max-w-3xl mx-auto leading-relaxed">
          {hero.subtitle}
        </h2>
        <p className="text-[#6b7280] text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          I architect intelligent enterprise solutions on the Salesforce platform,
          blending deep platform expertise with cutting-edge technology to solve complex
          business challenges.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-300 glow"
          >
            {hero.cta}
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-[#374151] hover:border-primary text-[#9ca3af] hover:text-white rounded-lg font-medium transition-all duration-300"
          >
            {hero.ctaSecondary}
          </a>
        </div>
      </div>
      
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#6b7280] hover:text-white transition-colors animate-bounce"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  )
}
