"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, RotateCcw, Info, CheckCircle, ArrowDown, Zap, Target, TrendingUp } from "lucide-react"

type Units = "english" | "metric"
type Condition = "good" | "fair"
type Bends = "low" | "medium" | "high"

interface LubricantParams {
  diameter: number
  runLength: number
  units: Units
  condition: Condition
  bends: Bends
}

interface LubricantResult {
  quantity: number
  units: "gallons" | "quarts" | "liters"
  notes: string[]
}

function calculateLubricant(params: LubricantParams): LubricantResult {
  const { diameter, runLength, units, condition, bends } = params

  if (runLength <= 0 || runLength > 500000 || isNaN(runLength)) {
    throw new Error("La longitud debe ser un número positivo menor a 500,000.")
  }

  // Convert diameter to mm if input is in inches
  const sizeInMM = units === "metric" ? diameter : Math.round(diameter * 25.4)
  const multiplier = units === "metric" ? 0.00075 : 0.0015
  const baselineQuantity = sizeInMM * runLength * multiplier

  let additional = 0
  const notes: string[] = []

  // Condición del ducto
  if (condition === "fair") {
    additional += baselineQuantity * 0.25
    notes.push("Condición regular o deficiente: se añadió 25%.")
  }

  // Curvatura acumulada
  if (bends === "medium") {
    additional += baselineQuantity * 0.1
    notes.push("Curvatura media: se añadió 10%.")
  } else if (bends === "high") {
    additional += baselineQuantity * 0.25
    notes.push("Curvatura alta: se añadió 25%.")
  }

  // Longitud extensa
  const longRun = (units === "english" && runLength > 500) || (units === "metric" && runLength > 150)
  if (longRun) {
    additional += baselineQuantity * 0.1
    notes.push("Longitud extensa: se añadió 10%.")
  }

  let quantity = baselineQuantity + additional
  let resultUnits: LubricantResult["units"]

  // Formateo y redondeo según unidades
  if (units === "english") {
    if (quantity < 1) {
      quantity = Math.ceil(40 * quantity) / 10 // cuartos de galón
      resultUnits = "quarts"
    } else {
      quantity = Math.ceil(quantity * 10) / 10 // galones
      resultUnits = "gallons"
    }
  } else {
    quantity = Math.ceil(quantity) // litros
    resultUnits = "liters"
  }

  return {
    quantity,
    units: resultUnits,
    notes,
  }
}

export function LubricantCalculator() {
  const [formData, setFormData] = useState({
    diameter: "",
    runLength: "",
    units: "metric" as Units,
    condition: "good" as Condition,
    bends: "low" as Bends,
  })

  const [result, setResult] = useState<LubricantResult | null>(null)
  const [error, setError] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const diameterOptions = [
    { value: "19", labelDesktop: "19 mm", labelMobile: "19mm", metric: 19, english: 0.75 },
    { value: "25", labelDesktop: "25 mm", labelMobile: "25mm", metric: 25, english: 1 },
    { value: "38", labelDesktop: "38 mm", labelMobile: "38mm", metric: 38, english: 1.5 },
    { value: "51", labelDesktop: "51 mm", labelMobile: "51mm", metric: 51, english: 2 },
    { value: "76", labelDesktop: "76 mm", labelMobile: "76mm", metric: 76, english: 3 },
    { value: "102", labelDesktop: "102 mm", labelMobile: "102mm", metric: 102, english: 4 },
    { value: "127", labelDesktop: "127 mm", labelMobile: "127mm", metric: 127, english: 5 },
    { value: "152", labelDesktop: "152 mm", labelMobile: "152mm", metric: 152, english: 6 },
    { value: "203", labelDesktop: "8 Inch (203 mm)", labelMobile: '8" (203mm)', metric: 203, english: 8 },
    { value: "254", labelDesktop: "10 Inch (254 mm)", labelMobile: '10" (254mm)', metric: 254, english: 10 },
    { value: "304", labelDesktop: "12 Inch (304 mm)", labelMobile: '12" (304mm)', metric: 304, english: 12 },
  ]

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-scroll to results when calculation is complete
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }
  }, [result])

  const handleCalculate = async () => {
    try {
      setError("")
      setIsCalculating(true)

      if (!formData.diameter || !formData.runLength) {
        setError("Por favor complete todos los campos requeridos.")
        setIsCalculating(false)
        return
      }

      const selectedDiameter = diameterOptions.find((opt) => opt.value === formData.diameter)
      if (!selectedDiameter) {
        setError("Por favor seleccione un diámetro válido.")
        setIsCalculating(false)
        return
      }

      const diameter = formData.units === "metric" ? selectedDiameter.metric : selectedDiameter.english
      const runLength = Number.parseFloat(formData.runLength)

      if (isNaN(runLength) || runLength <= 0) {
        setError("La longitud debe ser un número positivo.")
        setIsCalculating(false)
        return
      }

      const params: LubricantParams = {
        diameter,
        runLength,
        units: formData.units,
        condition: formData.condition,
        bends: formData.bends,
      }

      // Simulate calculation delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500))

      const calculationResult = calculateLubricant(params)
      setResult(calculationResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error en el cálculo")
    } finally {
      setIsCalculating(false)
    }
  }

  const handleReset = () => {
    setFormData({
      diameter: "",
      runLength: "",
      units: "metric",
      condition: "good",
      bends: "low",
    })
    setResult(null)
    setError("")
  }

  const getUnitLabel = (field: string) => {
    if (field === "length") {
      return formData.units === "metric" ? "metros" : "pies"
    }
    return ""
  }

  const isFormComplete = formData.diameter && formData.runLength

  // Don't render until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <section className="py-8 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8 md:mb-12 lg:mb-16 xl:mb-20">
            <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs md:text-sm lg:text-base font-medium shadow-lg mb-6 lg:mb-8 border border-blue-200">
              <Calculator className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2" />
              Herramienta Técnica Especializada
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 lg:mb-6 leading-tight px-2">
              Calculadora de Lubricante para Cables
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 max-w-4xl mx-auto px-4 leading-relaxed">
              Calcule automáticamente la cantidad exacta de lubricante necesaria para su instalación eléctrica
              subterránea
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-blue-50/30 via-slate-50/50 to-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header - Escalable para pantallas grandes */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 xl:mb-20">
          <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 text-xs md:text-sm lg:text-base font-medium shadow-lg mb-6 lg:mb-8 border border-blue-200">
            <Calculator className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 mr-2" />
            <span className="hidden sm:inline">Herramienta Técnica Especializada</span>
            <span className="sm:hidden">Herramienta Técnica</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-4 lg:mb-6 leading-tight px-2">
            Calculadora de Lubricante para Cables
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-600 max-w-4xl mx-auto px-4 leading-relaxed">
            Calcule automáticamente la cantidad exacta de lubricante necesaria para su instalación eléctrica subterránea
          </p>
        </div>

        {/* Layout Principal - Responsive Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 max-w-7xl mx-auto">
          {/* Formulario - Adaptable a pantallas grandes */}
          <div className="xl:col-span-7">
            <Card className="border-0 shadow-lg md:shadow-xl lg:shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden h-fit">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/10 to-blue-50/30"></div>
              <CardHeader className="relative z-10 pb-4 lg:pb-6 px-4 md:px-6 lg:px-8 py-4 lg:py-6">
                <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-900 flex items-center justify-center xl:justify-start">
                  <Calculator className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-2 lg:mr-3 text-blue-900" />
                  Parámetros de Instalación
                </CardTitle>
                <p className="text-sm lg:text-base text-slate-600 mt-2 text-center xl:text-left">
                  Complete los datos de su proyecto para obtener el cálculo preciso
                </p>
              </CardHeader>
              <CardContent className="relative z-10 px-4 md:px-6 lg:px-8 pb-6 lg:pb-8">
                {/* Sistema de Unidades - Mejorado para pantallas grandes */}
                <div className="mb-6 lg:mb-8">
                  <label className="block text-sm lg:text-base font-semibold text-slate-900 mb-3 lg:mb-4 text-center xl:text-left">
                    Sistema de Unidades *
                  </label>
                  <div className="grid grid-cols-2 gap-3 lg:gap-4 max-w-md mx-auto xl:mx-0">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, units: "metric", diameter: "", runLength: "" })}
                      className={`p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl border-2 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105 ${
                        formData.units === "metric"
                          ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg"
                          : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div className="font-semibold">Métrico</div>
                      <div className="text-xs lg:text-sm text-slate-500 mt-1">mm • metros • litros</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, units: "english", diameter: "", runLength: "" })}
                      className={`p-3 lg:p-4 xl:p-5 rounded-lg lg:rounded-xl border-2 transition-all duration-300 text-sm lg:text-base font-medium hover:scale-105 ${
                        formData.units === "english"
                          ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg"
                          : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      <div className="font-semibold">Imperial</div>
                      <div className="text-xs lg:text-sm text-slate-500 mt-1">pulgadas • pies • galones</div>
                    </button>
                  </div>
                </div>

                {/* Parámetros Principales - Grid mejorado para pantallas grandes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
                  {/* Diámetro del Ducto */}
                  <div>
                    <label className="block text-sm lg:text-base font-semibold text-slate-900 mb-2 lg:mb-3">
                      Diámetro del Ducto *
                    </label>
                    <select
                      value={formData.diameter}
                      onChange={(e) => setFormData({ ...formData, diameter: e.target.value })}
                      className="w-full px-3 lg:px-4 py-3 lg:py-4 border border-slate-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white text-sm lg:text-base hover:border-blue-300"
                    >
                      <option value="">Seleccione diámetro del conducto</option>
                      {diameterOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.labelDesktop}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Longitud Total */}
                  <div>
                    <label className="block text-sm lg:text-base font-semibold text-slate-900 mb-2 lg:mb-3">
                      Longitud Total de Instalación *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.runLength}
                        onChange={(e) => setFormData({ ...formData, runLength: e.target.value })}
                        placeholder={`Ingrese la longitud en ${getUnitLabel("length")}`}
                        className="w-full px-3 lg:px-4 py-3 lg:py-4 pr-16 lg:pr-20 border border-slate-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm lg:text-base hover:border-blue-300"
                        min="0"
                        step="0.1"
                      />
                      <div className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-sm lg:text-base text-slate-500 font-medium bg-slate-50 px-2 py-1 rounded">
                        {getUnitLabel("length")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Condición del Ducto - Mejorado para pantallas grandes */}
                <div className="mb-6 lg:mb-8">
                  <label className="block text-sm lg:text-base font-semibold text-slate-900 mb-3 lg:mb-4">
                    Condición del Ducto
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: "good" })}
                      className={`p-4 lg:p-5 xl:p-6 rounded-lg lg:rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                        formData.condition === "good"
                          ? "border-green-500 bg-green-50 text-green-900 shadow-lg"
                          : "border-slate-300 bg-white text-slate-700 hover:border-green-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-green-600" />
                        <div className="font-semibold text-sm lg:text-base">Bueno</div>
                      </div>
                      <div className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                        Conducto nuevo o en excelente estado, sin obstrucciones ni daños
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, condition: "fair" })}
                      className={`p-4 lg:p-5 xl:p-6 rounded-lg lg:rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                        formData.condition === "fair"
                          ? "border-yellow-500 bg-yellow-50 text-yellow-900 shadow-lg"
                          : "border-slate-300 bg-white text-slate-700 hover:border-yellow-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <Info className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-yellow-600" />
                        <div className="font-semibold text-sm lg:text-base">Regular/Deficiente</div>
                      </div>
                      <div className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                        Conducto con desgaste, obstrucciones o daños menores (+25% lubricante)
                      </div>
                    </button>
                  </div>
                </div>

                {/* Curvas - Grid mejorado para pantallas grandes */}
                <div className="mb-8 lg:mb-10">
                  <label className="block text-sm lg:text-base font-semibold text-slate-900 mb-3 lg:mb-4">
                    Curvas Acumulativas en la Instalación
                  </label>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                    {[
                      {
                        value: "low",
                        label: "Instalación Recta",
                        shortLabel: "≤ 180°",
                        desc: "Pocas curvas o instalación principalmente recta",
                        icon: Target,
                      },
                      {
                        value: "medium",
                        label: "Curvatura Moderada",
                        shortLabel: "181° - 360°",
                        desc: "Curvas moderadas en la instalación (+10%)",
                        icon: TrendingUp,
                      },
                      {
                        value: "high",
                        label: "Múltiples Curvas",
                        shortLabel: "> 360°",
                        desc: "Instalación con múltiples curvas complejas (+25%)",
                        icon: Zap,
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, bends: option.value as Bends })}
                        className={`p-4 lg:p-5 xl:p-6 rounded-lg lg:rounded-xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                          formData.bends === option.value
                            ? "border-blue-500 bg-blue-50 text-blue-900 shadow-lg"
                            : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex justify-center mb-2 lg:mb-3">
                          <option.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                        </div>
                        <div className="font-semibold text-sm lg:text-base mb-1">{option.label}</div>
                        <div className="text-xs lg:text-sm text-slate-600 mb-2">{option.desc}</div>
                        <div className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {option.shortLabel}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botones de Acción - Mejorados para pantallas grandes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  <Button
                    onClick={handleCalculate}
                    disabled={!isFormComplete || isCalculating}
                    className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 py-4 lg:py-5 text-base lg:text-lg font-medium"
                    size="lg"
                  >
                    {isCalculating ? (
                      <>
                        <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Calculando...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                        Calcular Cantidad Necesaria
                        {isFormComplete && <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5 ml-2 animate-bounce" />}
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent py-4 lg:py-5 text-base lg:text-lg hover:scale-105 transition-all duration-300"
                  >
                    <RotateCcw className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                    Reiniciar Formulario
                  </Button>
                </div>

                {/* Error Message - Mejorado */}
                {error && (
                  <div className="mt-6 p-4 lg:p-5 bg-red-50 border border-red-200 rounded-lg lg:rounded-xl">
                    <div className="flex items-start text-red-800 text-sm lg:text-base">
                      <Info className="w-5 h-5 lg:w-6 lg:h-6 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con información adicional para pantallas grandes */}
          <div className="xl:col-span-5 space-y-6">
            {/* Tips y Consejos */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg lg:text-xl text-slate-900 flex items-center">
                  <Info className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-blue-600" />
                  Consejos de Instalación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base text-slate-900">Preparación del Conducto</h4>
                    <p className="text-xs lg:text-sm text-slate-600 mt-1">
                      Inspeccione y limpie el conducto antes de la instalación para optimizar el uso del lubricante.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base text-slate-900">Aplicación Uniforme</h4>
                    <p className="text-xs lg:text-sm text-slate-600 mt-1">
                      Aplique el lubricante de manera uniforme en toda la superficie del cable para mejores resultados.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-sm lg:text-base text-slate-900">Margen de Seguridad</h4>
                    <p className="text-xs lg:text-sm text-slate-600 mt-1">
                      Siempre considere un 10-15% adicional para imprevistos durante la instalación.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Especificaciones Técnicas */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg lg:text-xl text-slate-900 flex items-center">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-green-600" />
                  Especificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-lg lg:text-xl font-bold text-blue-900">±5%</div>
                    <div className="text-xs lg:text-sm text-slate-600">Precisión del Cálculo</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-lg lg:text-xl font-bold text-green-900">ISO 9001</div>
                    <div className="text-xs lg:text-sm text-slate-600">Estándar de Calidad</div>
                  </div>
                </div>
                <div className="text-xs lg:text-sm text-slate-600 text-center mt-4">
                  Cálculos basados en estándares internacionales de la industria eléctrica
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resultados - Optimizados para pantallas grandes */}
        {result && (
          <div ref={resultRef} className="mt-8 lg:mt-12 xl:mt-16 space-y-6 lg:space-y-8">
            <Card className="border-0 shadow-xl lg:shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden animate-fade-in-up">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50/30 to-white"></div>
              <CardHeader className="relative z-10 text-center px-4 lg:px-8 py-6 lg:py-8">
                <CardTitle className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-900 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 lg:w-10 lg:h-10 mr-3 lg:mr-4 text-green-600" />
                  Resultado del Cálculo
                </CardTitle>
                <p className="text-base lg:text-lg text-slate-600 mt-2">
                  Cantidad optimizada para su proyecto específico
                </p>
              </CardHeader>
              <CardContent className="relative z-10 px-4 lg:px-8 pb-6 lg:pb-8">
                {/* Resultado Principal - Destacado para pantallas grandes */}
                <div className="text-center mb-8 lg:mb-12">
                  <div className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-blue-900 mb-4 animate-scale-in">
                    {result.quantity}
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-slate-600 font-medium mb-2">
                    {result.units === "gallons" && "Galones"}
                    {result.units === "quarts" && "Cuartos de Galón"}
                    {result.units === "liters" && "Litros"}
                  </div>
                  <div className="text-sm lg:text-base text-slate-500">
                    Cantidad estimada de lubricante necesaria para su instalación
                  </div>
                </div>

                {/* Grid de información para pantallas grandes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
                  {/* Factores Considerados */}
                  {result.notes.length > 0 && (
                    <div className="lg:col-span-2 xl:col-span-2 bg-white/60 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-blue-200">
                      <h4 className="font-semibold text-slate-900 mb-4 flex items-center text-base lg:text-lg">
                        <Info className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-blue-600" />
                        Factores Aplicados en el Cálculo:
                      </h4>
                      <ul className="space-y-3">
                        {result.notes.map((note, index) => (
                          <li key={index} className="text-sm lg:text-base text-slate-700 flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="leading-relaxed">{note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recomendación */}
                  <div className="bg-yellow-50 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-yellow-200">
                    <div className="flex items-start">
                      <Info className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="text-sm lg:text-base text-yellow-800">
                        <strong className="block mb-2">Recomendación Técnica:</strong>
                        <p className="leading-relaxed">
                          Considere adquirir un 10-15% adicional como margen de seguridad para imprevistos durante la
                          instalación.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción - Mejorados para pantallas grandes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 py-4 lg:py-5 text-base lg:text-lg font-medium hover:scale-105"
                    size="lg"
                  >
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                    Solicitar Cotización para {result.quantity}{" "}
                    {result.units === "gallons" ? "Galones" : result.units === "quarts" ? "Cuartos" : "Litros"}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 py-4 lg:py-5 text-base lg:text-lg font-medium hover:scale-105 transition-all duration-300 bg-transparent"
                    size="lg"
                    onClick={handleReset}
                  >
                    <Calculator className="w-5 h-5 lg:w-6 lg:h-6 mr-2" />
                    Calcular Nuevo Proyecto
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Información Técnica Expandida para pantallas grandes */}
            <Card className="border-0 shadow-lg lg:shadow-xl">
              <CardContent className="p-4 lg:p-6">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-slate-900 font-semibold hover:text-blue-900 transition-colors text-base lg:text-lg">
                    <span className="flex items-center">
                      <Info className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-blue-600" />
                      Información Técnica Detallada
                    </span>
                    <div className="transform group-open:rotate-180 transition-transform duration-200">
                      <ArrowDown className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                  </summary>
                  <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 text-base lg:text-lg">Metodología</h4>
                      <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                        Cálculo basado en estándares internacionales de la industria eléctrica, considerando diámetro
                        del conducto, longitud total y condiciones específicas del sitio de instalación.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 text-base lg:text-lg">Factores de Ajuste</h4>
                      <ul className="text-sm lg:text-base text-slate-600 space-y-2">
                        <li>• Condición del ducto: +25% para conductos deteriorados</li>
                        <li>• Curvatura moderada: +10% adicional</li>
                        <li>• Curvatura alta: +25% adicional</li>
                        <li>• Instalaciones extensas: +10% por longitud</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3 text-base lg:text-lg">Precisión y Validez</h4>
                      <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
                        Las estimaciones son válidas para condiciones estándar de instalación. Proyectos con
                        características especiales pueden requerir ajustes adicionales por parte de nuestros ingenieros.
                      </p>
                    </div>
                  </div>
                </details>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
