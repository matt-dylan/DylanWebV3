import { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, Globe, Compass } from 'lucide-react'
import { contact } from '../data'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0a0f] ${scrolled ? 'backdrop-blur-xl border-b border-[#1f2937]' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold gradient-text">
            DW
          </a>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-[#9ca3af] hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-[#1f2937]">
              <a href={contact.socials.github} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white transition-colors" title="GitHub">
                <Github size={18} />
              </a>
              <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white transition-colors" title="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={contact.socials.trailblazer} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white transition-colors" title="Trailblazer Profile">
                <Compass size={18} />
              </a>
              <a href={`mailto:${contact.email}`} className="text-[#9ca3af] hover:text-white transition-colors" title="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#9ca3af] hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111827] border-b border-[#1f2937]">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-[#9ca3af] hover:text-white transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-[#1f2937]">
              <a href={contact.socials.github} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white" title="GitHub">
                <Github size={20} />
              </a>
              <a href={contact.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={contact.socials.trailblazer} target="_blank" rel="noopener noreferrer" className="text-[#9ca3af] hover:text-white" title="Trailblazer">
                <Compass size={20} />
              </a>
              <a href={`mailto:${contact.email}`} className="text-[#9ca3af] hover:text-white" title="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
