"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Filter } from "lucide-react"

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedPresentation, setSelectedPresentation] = useState("todas")

  const products = [
    {
      id: 1,
      name: "Lubricante Premium Cable Pulling",
      category: "lubricante",
      presentation: "galon",
      description: "Lubricante de alta viscosidad para instalación de cables de media y alta tensión",
      features: ["Biodegradable", "No tóxico", "Resistente a temperaturas extremas"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "Lubricante Eco-Friendly",
      category: "lubricante",
      presentation: "cuñete",
      description: "Fórmula ecológica para proyectos con certificación ambiental",
      features: ["100% Biodegradable", "Certificación ISO 14001", "Fácil limpieza"],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Lubricante Conductivo",
      category: "conductivo",
      presentation: "galon",
      description: "Especial para cables con requerimientos de conductividad",
      features: ["Propiedades conductivas", "Anti-corrosivo", "Larga duración"],
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const categories = [
    { value: "todos", label: "Todos los productos" },
    { value: "lubricante", label: "Lubricantes estándar" },
    { value: "conductivo", label: "Lubricantes conductivos" },
  ]

  const presentations = [
    { value: "todas", label: "Todas las presentaciones" },
    { value: "galon", label: "Galón" },
    { value: "cuñete", label: "Cuñete" },
  ]

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "todos" || product.category === selectedCategory
    const presentationMatch = selectedPresentation === "todas" || product.presentation === selectedPresentation
    return categoryMatch && presentationMatch
  })

  return (
    <section id="productos" className="py-12 md:py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Catálogo de Productos</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Lubricantes especializados para cada tipo de instalación eléctrica subterránea
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-8 md:mb-12 shadow-lg border border-white/20 overflow-x-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center min-w-max sm:min-w-0">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Filter className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
              <span className="font-medium text-slate-900 text-sm md:text-base">Filtros:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base min-w-0"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedPresentation}
                onChange={(e) => setSelectedPresentation(e.target.value)}
                className="px-3 md:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base min-w-0"
              >
                {presentations.map((presentation) => (
                  <option key={presentation.value} value={presentation.value}>
                    {presentation.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:ml-auto flex-shrink-0">
              <Badge variant="secondary" className="bg-blue-100 text-blue-900 text-xs md:text-sm">
                {filteredProducts.length} productos encontrados
              </Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className={`reveal-scale stagger-${(index % 3) + 1}`}>
              <Card className="group hover:shadow-2xl transition-all duration-700 border-0 shadow-lg hover-lift hover:border-blue-200 relative overflow-hidden card-premium h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <CardHeader className="p-0">
                  <div className="aspect-video rounded-t-lg overflow-hidden bg-slate-100 relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 relative z-10 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg md:text-xl text-slate-900 group-hover:text-blue-900 transition-colors duration-300 leading-tight">
                      {product.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="ml-2 capitalize group-hover:bg-blue-50 group-hover:text-blue-900 transition-colors duration-300 text-xs flex-shrink-0"
                    >
                      {product.presentation}
                    </Badge>
                  </div>

                  <p className="text-slate-600 mb-4 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 text-sm md:text-base flex-grow">
                    {product.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-slate-900 group-hover:text-blue-900 transition-colors duration-300 text-sm md:text-base">
                      Características:
                    </h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-xs md:text-sm text-slate-600 flex items-center group-hover:text-slate-700 transition-colors duration-300"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mr-2 group-hover:bg-blue-600 transition-colors duration-300 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 btn-premium text-xs md:text-sm"
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Ficha PDF
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-900 hover:bg-blue-800 hover:shadow-lg hover:scale-105 transition-all duration-300 btn-premium text-xs md:text-sm"
                    >
                      Cotizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-blue-900 text-blue-900 hover:bg-blue-50 bg-transparent text-sm md:text-base px-6 md:px-8"
          >
            Ver Catálogo Completo
            <Download className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
