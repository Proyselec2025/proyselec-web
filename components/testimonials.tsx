import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ing. Carlos Mendoza",
      position: "Director de Proyectos",
      company: "EPM Telecomunicaciones",
      content:
        "Proyselec ha sido nuestro aliado estratégico en más de 20 proyectos. Su lubricante premium nos ha permitido reducir significativamente los tiempos de instalación sin comprometer la calidad.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Ing. María Rodríguez",
      position: "Supervisora de Obra",
      company: "Constructora Conconcreto",
      content:
        "La disponibilidad inmediata y la calidad constante de los productos de Proyselec nos han salvado en múltiples ocasiones. Su soporte técnico es excepcional.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Ing. Roberto Silva",
      position: "Gerente Técnico",
      company: "Celsia",
      content:
        "Llevamos 5 años trabajando con Proyselec. Su compromiso con la innovación y la sostenibilidad los convierte en el proveedor ideal para nuestros proyectos de infraestructura crítica.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Lo que Dicen Nuestros Clientes</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            La confianza de ingenieros y contratistas líderes en Colombia respalda nuestra calidad y servicio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 150}>
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center mb-6">
                    <Quote className="w-8 h-8 text-blue-900 mr-3" />
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-600 text-lg leading-relaxed mb-8 italic">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.position}</div>
                      <div className="text-sm text-blue-900 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                Únete a Más de 200 Empresas que Confían en Nosotros
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Desde pequeños contratistas hasta las empresas de infraestructura más grandes de Colombia, todos confían
                en la calidad y confiabilidad de Proyselec.
              </p>
              <button className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                Solicitar Referencias
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">98%</div>
                <div className="text-slate-600">Satisfacción del Cliente</div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">200+</div>
                <div className="text-slate-600">Empresas Activas</div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">15+</div>
                <div className="text-slate-600">Años de Experiencia</div>
              </div>
              <div className="bg-white rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-900 mb-2">24/7</div>
                <div className="text-slate-600">Soporte Técnico</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
