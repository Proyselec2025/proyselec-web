import { CheckCircle, Clock, Shield, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

export function ValueProposition() {
  const benefits = [
    {
      icon: Clock,
      title: "Reducción de Tiempos",
      description: "Hasta 40% menos tiempo en instalación de cables subterráneos",
    },
    {
      icon: Shield,
      title: "Máxima Protección",
      description: "Protege cables contra daños durante el tendido y operación",
    },
    {
      icon: Zap,
      title: "Mayor Eficiencia",
      description: "Mejora significativa en la eficiencia del proceso de instalación",
    },
    {
      icon: CheckCircle,
      title: "Calidad Garantizada",
      description: "Productos certificados que cumplen normativas internacionales",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">¿Por qué elegir Proyselec?</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Somos líderes en Colombia en suministro de lubricantes especializados para infraestructura eléctrica
            subterránea
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-500 hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-blue-900 group-hover:to-blue-800 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                  <benefit.icon className="w-8 h-8 text-blue-900 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-8 lg:p-12 text-white shadow-premium relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Disponibilidad Inmediata en Todo Colombia</h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                Contamos con stock permanente y red de distribución nacional para garantizar entregas rápidas en
                cualquier proyecto.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-4xl font-bold mb-2">🇨🇴</div>
              <div className="text-lg font-semibold">Cobertura Nacional</div>
              <div className="text-blue-200">Bogotá • Medellín • Cali • Barranquilla</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
