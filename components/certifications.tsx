import { Shield, Award, CheckCircle, Globe } from "lucide-react"

export function Certifications() {
  const certifications = [
    {
      icon: Shield,
      title: "ISO 9001:2015",
      description: "Sistema de Gestión de Calidad certificado",
      color: "bg-blue-100 text-blue-900",
    },
    {
      icon: Globe,
      title: "ISO 14001",
      description: "Gestión Ambiental y Sostenibilidad",
      color: "bg-green-100 text-green-900",
    },
    {
      icon: Award,
      title: "RETIE",
      description: "Cumplimiento normativa eléctrica colombiana",
      color: "bg-yellow-100 text-yellow-900",
    },
    {
      icon: CheckCircle,
      title: "ICONTEC",
      description: "Productos certificados por ICONTEC",
      color: "bg-purple-100 text-purple-900",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Certificaciones de Calidad</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Nuestros productos y procesos cumplen con los más altos estándares internacionales de calidad y seguridad
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 text-center shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className={`w-16 h-16 ${cert.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <cert.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{cert.title}</h3>
              <p className="text-slate-600">{cert.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Compromiso con la Excelencia</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Mantenemos las certificaciones más exigentes del sector para garantizar que cada producto que entregamos
                cumple con los estándares más altos de calidad, seguridad y sostenibilidad ambiental.
              </p>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg font-semibold">Productos Certificados</div>
              <div className="text-slate-400">Calidad garantizada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
