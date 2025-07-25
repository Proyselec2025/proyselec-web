"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Download } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg">P</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-slate-900">PROYSELEC</h1>
              <p className="text-xs text-slate-600">Infraestructura Eléctrica</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-slate-900">PROYSELEC</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a
              href="#inicio"
              className="text-slate-700 hover:text-blue-900 transition-all duration-500 relative group font-medium text-sm xl:text-base"
            >
              Inicio
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-blue-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </a>
            <a
              href="#productos"
              className="text-slate-700 hover:text-blue-900 transition-all duration-500 relative group font-medium text-sm xl:text-base"
            >
              Productos
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-blue-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </a>
            <a
              href="#proyectos"
              className="text-slate-700 hover:text-blue-900 transition-all duration-500 relative group font-medium text-sm xl:text-base"
            >
              Proyectos
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-blue-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </a>
            <a
              href="#blog"
              className="text-slate-700 hover:text-blue-900 transition-all duration-500 relative group font-medium text-sm xl:text-base"
            >
              Blog
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-blue-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </a>
            <a
              href="#contacto"
              className="text-slate-700 hover:text-blue-900 transition-all duration-500 relative group font-medium text-sm xl:text-base"
            >
              Contacto
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-900 to-blue-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-900 text-blue-900 hover:bg-blue-50 bg-transparent hover:shadow-xl hover:scale-105 transition-all duration-300 btn-premium relative overflow-hidden text-xs lg:text-sm px-2 lg:px-4"
            >
              <Download className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Ficha Técnica</span>
              <span className="lg:hidden">Ficha</span>
            </Button>
            <Button className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 btn-premium relative overflow-hidden text-xs lg:text-sm px-2 lg:px-4">
              <Phone className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              Cotizar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 -mr-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-4">
              <a
                href="#inicio"
                className="text-slate-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#productos"
                className="text-slate-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Productos
              </a>
              <a
                href="#proyectos"
                className="text-slate-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Proyectos
              </a>
              <a
                href="#blog"
                className="text-slate-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog Técnico
              </a>
              <a
                href="#contacto"
                className="text-slate-700 hover:text-blue-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <div className="flex flex-col space-y-3 pt-4">
                <Button variant="outline" size="sm" className="border-blue-900 text-blue-900 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Ficha Técnica
                </Button>
                <Button className="bg-blue-900 hover:bg-blue-800">
                  <Phone className="w-4 h-4 mr-2" />
                  Cotizar
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
