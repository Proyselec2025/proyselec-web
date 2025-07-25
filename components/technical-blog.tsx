import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react"

export function TechnicalBlog() {
  const articles = [
    {
      id: 1,
      title: "Guía Completa: Instalación de Cables Subterráneos según RETIE 2023",
      excerpt:
        "Todo lo que necesitas saber sobre las nuevas normativas colombianas para instalación eléctrica subterránea y cómo cumplir con los estándares de seguridad.",
      category: "Normativas",
      author: "Ing. Technical Team",
      date: "15 Dic 2023",
      readTime: "8 min",
      image: "/placeholder.svg?height=250&width=400",
    },
    {
      id: 2,
      title: "5 Errores Comunes en el Uso de Lubricantes para Cables",
      excerpt:
        "Evita los errores más frecuentes que pueden comprometer la integridad de tus instalaciones eléctricas y aprende las mejores prácticas del sector.",
      category: "Tips Técnicos",
      author: "Ing. Carlos Mendoza",
      date: "08 Dic 2023",
      readTime: "6 min",
      image: "/placeholder.svg?height=250&width=400",
    },
    {
      id: 3,
      title: "Sostenibilidad en Proyectos Eléctricos: Lubricantes Biodegradables",
      excerpt:
        "Descubre cómo los lubricantes ecológicos están revolucionando la industria eléctrica y contribuyendo a proyectos más sostenibles.",
      category: "Sostenibilidad",
      author: "Ing. María Rodríguez",
      date: "01 Dic 2023",
      readTime: "7 min",
      image: "/placeholder.svg?height=250&width=400",
    },
  ]

  return (
    <section id="blog" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Blog Técnico</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Mantente actualizado con las últimas tendencias, normativas y mejores prácticas en infraestructura eléctrica
            subterránea
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                    {article.category}
                  </Badge>
                  <span className="text-sm text-slate-500">{article.readTime} lectura</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-900 transition-colors leading-tight">
                  {article.title}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed">{article.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  <button className="text-blue-900 hover:text-blue-700 font-medium flex items-center">
                    Leer más
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-900 mr-3" />
                <h3 className="text-2xl font-bold text-slate-900">Suscríbete a Nuestro Boletín Técnico</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Recibe mensualmente artículos técnicos, actualizaciones normativas y consejos prácticos directamente en
                tu correo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium">
                  Suscribirse
                </button>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="text-4xl font-bold text-blue-900 mb-2">2,500+</div>
              <div className="text-lg font-semibold text-slate-900">Profesionales Suscritos</div>
              <div className="text-slate-600">Ingenieros y técnicos especializados</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            Ver Todos los Artículos
          </button>
        </div>
      </div>
    </section>
  )
}
