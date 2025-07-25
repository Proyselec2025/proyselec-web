"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    project: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Contacto y Cotización</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Nuestro equipo de ingenieros especializados está listo para asesorarte en tu próximo proyecto
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Phone className="w-5 h-5 mr-2 text-blue-900" />
                  Teléfono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-2">Línea Nacional:</p>
                <p className="text-xl font-semibold text-slate-900">+57 (1) 234-5678</p>
                <p className="text-slate-600 mt-2">WhatsApp:</p>
                <p className="text-xl font-semibold text-slate-900">+57 300 123-4567</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Mail className="w-5 h-5 mr-2 text-blue-900" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-2">Ventas:</p>
                <p className="text-lg font-semibold text-slate-900">ventas@proyselec.com</p>
                <p className="text-slate-600 mt-2">Soporte Técnico:</p>
                <p className="text-lg font-semibold text-slate-900">soporte@proyselec.com</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <MapPin className="w-5 h-5 mr-2 text-blue-900" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-2">Oficina Principal:</p>
                <p className="text-slate-900">Calle 100 #15-20, Piso 8</p>
                <p className="text-slate-900">Bogotá, Colombia</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Clock className="w-5 h-5 mr-2 text-blue-900" />
                  Horarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-2">Lunes a Viernes:</p>
                <p className="text-slate-900">8:00 AM - 6:00 PM</p>
                <p className="text-slate-600 mt-2">Sábados:</p>
                <p className="text-slate-900">8:00 AM - 12:00 PM</p>
                <p className="text-sm text-blue-900 mt-2 font-medium">Soporte 24/7 para emergencias</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-transparent"></div>
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">Solicitar Cotización</CardTitle>
                <p className="text-slate-600">Completa el formulario y te contactaremos en menos de 24 horas</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Nombre Completo *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-300 focus-premium"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Email Corporativo *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="tu@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Empresa *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">Teléfono *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+57 300 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Tipo de Proyecto *</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecciona el tipo de proyecto</option>
                      <option value="residencial">Proyecto Residencial</option>
                      <option value="comercial">Proyecto Comercial</option>
                      <option value="industrial">Proyecto Industrial</option>
                      <option value="infraestructura">Infraestructura Pública</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">Detalles del Proyecto</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe tu proyecto: longitud de cables, tipo de instalación, cronograma, etc."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" size="lg" className="flex-1 bg-blue-900 hover:bg-blue-800">
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Solicitud
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Directo
                    </Button>
                  </div>

                  <p className="text-sm text-slate-500 text-center">
                    * Campos obligatorios. Respetamos tu privacidad y no compartimos tu información.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">¿Necesitas Atención Inmediata?</h3>
            <p className="text-blue-100 text-lg">
              Nuestro equipo está disponible para emergencias y consultas urgentes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Phone className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h4 className="font-semibold mb-2">Llamada Directa</h4>
              <p className="text-blue-100 text-sm mb-4">Habla con un ingeniero ahora</p>
              <Button variant="secondary" className="w-full">
                Llamar Ahora
              </Button>
            </div>
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h4 className="font-semibold mb-2">WhatsApp Business</h4>
              <p className="text-blue-100 text-sm mb-4">Chat en tiempo real</p>
              <Button variant="secondary" className="w-full">
                Abrir WhatsApp
              </Button>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blue-200" />
              <h4 className="font-semibold mb-2">Email Directo</h4>
              <p className="text-blue-100 text-sm mb-4">Respuesta en 2 horas</p>
              <Button variant="secondary" className="w-full">
                Enviar Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
