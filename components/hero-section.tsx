"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Phone, MessageCircle, Zap, Shield, Clock } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="inicio"
      className="pt-16 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background elements - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Interactive cursor effect - desktop only */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl pointer-events-none transition-all duration-300 ease-out hidden lg:block"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 text-xs md:text-sm font-medium shadow-lg animate-fade-in-up border border-yellow-200">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
                Disponibilidad Inmediata en Colombia
                <Zap className="w-3 h-3 md:w-4 md:h-4 ml-2" />
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-slate-900 leading-tight animate-fade-in-up text-balance">
                Lubricantes Premium para
                <span className="gradient-text block mt-2"> Instalación Eléctrica Subterránea</span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed animate-fade-in-up max-w-2xl mx-auto lg:mx-0">
                Reduce tiempos de obra y mejora la eficiencia del tendido eléctrico con nuestros lubricantes
                especializados de <span className="font-semibold text-blue-900">alta calidad certificada</span>.
              </p>
            </div>

            {/* Enhanced feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 animate-fade-in-up max-w-lg mx-auto lg:max-w-none">
              <div className="text-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300 hover-lift">
                <Clock className="w-6 h-6 md:w-8 md:h-8 text-blue-900 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-900">40% Menos</div>
                <div className="text-xs text-slate-600">Tiempo de Instalación</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300 hover-lift">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-900">100% Seguro</div>
                <div className="text-xs text-slate-600">Certificado RETIE</div>
              </div>
              <div className="text-center p-3 md:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/80 transition-all duration-300 hover-lift">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-sm font-semibold text-slate-900">8:00AM - 5:00PM</div>
                <div className="text-xs text-slate-600">Soporte Técnico</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in-up max-w-md mx-auto lg:max-w-none">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-base md:text-lg px-6 md:px-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group w-full sm:w-auto"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-pulse" />
                Solicitar Cotización
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-300 text-slate-700 text-base md:text-lg px-6 md:px-8 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-blue-300 hover:text-blue-900 transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Descargar Catálogo
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4 md:space-x-8 pt-4 md:pt-6 animate-fade-in-up">
              <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold gradient-text">15+</div>
                <div className="text-xs md:text-sm text-slate-600">Años de Experiencia</div>
              </div>
              <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
              <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold gradient-text">500+</div>
                <div className="text-xs md:text-sm text-slate-600">Proyectos Completados</div>
              </div>
              <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>
              <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold gradient-text">24h</div>
                <div className="text-xs md:text-sm text-slate-600">Tiempo de Respuesta</div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-right mt-8 lg:mt-0">
            <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xl relative group max-w-md mx-auto lg:max-w-none">
              <img
                src="/placeholder.svg?height=600&width=600&text=Instalación+Cables+Subterráneos"
                alt="Instalación de cables subterráneos con lubricante"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating info card - adjusted for mobile */}
            <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl border border-white/40 animate-float hover:shadow-3xl transition-all duration-300 hover-lift max-w-xs">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-lg md:rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 md:w-7 md:h-7 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm md:text-lg">Soporte 24/7</div>
                  <div className="text-xs md:text-sm text-slate-600">Asesoría técnica especializada</div>
                  <div className="text-xs text-green-600 font-medium mt-1">• En línea ahora</div>
                </div>
              </div>
            </div>

            {/* Floating stats - adjusted for mobile */}
            <div
              className="absolute -top-3 md:-top-6 -right-3 md:-right-6 bg-white/90 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl border border-white/40 animate-float hover:shadow-2xl transition-all duration-300"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold gradient-text">90%</div>
                <div className="text-xs text-slate-600">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
