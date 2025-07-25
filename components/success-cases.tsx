import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function SuccessCases() {
  const projects = [
    {
      id: 1,
      title: "Proyecto Metro Línea 2 - Bogotá",
      location: "Bogotá, Colombia",
      date: "2023",
      client: "Metro de Bogotá",
      description:
        "Suministro de lubricantes especializados para instalación de 45km de cables de alimentación subterránea",
      results: [
        "35% reducción en tiempo de instalación",
        "Zero incidentes de seguridad",
        "Cumplimiento 100% de cronograma",
      ],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 2,
      title: "Complejo Industrial Zona Franca",
      location: "Medellín, Colombia",
      date: "2023",
      client: "Grupo EPM",
      description: "Instalación de red eléctrica subterránea para complejo industrial de 200 hectáreas",
      results: ["50km de cables instalados", "Certificación ISO 14001", "Proyecto finalizado 2 semanas antes"],
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Urbanización Residencial Premium",
      location: "Cali, Colombia",
      date: "2022",
      client: "Constructora Bolívar",
      description: "Red eléctrica subterránea para 500 viviendas con estándares internacionales",
      results: ["100% instalación subterránea", "Certificación RETIE", "Satisfacción cliente 98%"],
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Casos de Éxito</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Proyectos destacados que demuestran nuestra experiencia y calidad en infraestructura eléctrica subterránea
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} direction={index % 2 === 0 ? "left" : "right"} delay={200}>
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift">
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  <div className={`aspect-video lg:aspect-auto ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-4 mb-4">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                            {project.date}
                          </Badge>
                          <div className="flex items-center text-slate-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {project.location}
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">{project.title}</h3>
                        <div className="flex items-center text-slate-600 mb-4">
                          <Users className="w-4 h-4 mr-2" />
                          Cliente: {project.client}
                        </div>
                      </div>

                      <p className="text-slate-600 text-lg leading-relaxed">{project.description}</p>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3">Resultados destacados:</h4>
                        <ul className="space-y-2">
                          {project.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="flex items-center text-slate-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-8 lg:p-12 shadow-inner-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">¿Tienes un proyecto en mente?</h3>
            <p className="text-slate-600 text-lg mb-6 max-w-2xl mx-auto">
              Nuestro equipo de ingenieros especializados está listo para asesorarte y desarrollar la solución perfecta
              para tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                Solicitar Asesoría Técnica
              </button>
              <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium">
                Ver Más Proyectos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
