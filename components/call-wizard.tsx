"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  flowSteps, 
  diagnosticQuestions, 
  priceList, 
  getRecommendation,
  productDescriptions,
  type StepId, 
  type FlowStep,
  type Recommendation
} from "@/lib/call-flow-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Phone, 
  PhoneOff, 
  Calendar, 
  Check, 
  HelpCircle, 
  Package, 
  AlertTriangle,
  Plus,
  Star,
  List,
  User,
  DollarSign,
  Clock,
  X,
  Home,
  Mail,
  Calculator,
  Wine,
  ArrowLeft,
  RotateCcw,
  MessageSquare,
  Target,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ShoppingCart
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  phone: Phone,
  "phone-off": PhoneOff,
  calendar: Calendar,
  check: Check,
  help: HelpCircle,
  package: Package,
  alert: AlertTriangle,
  plus: Plus,
  star: Star,
  list: List,
  user: User,
  dollar: DollarSign,
  clock: Clock,
  x: X,
  home: Home,
  mail: Mail,
  calculator: Calculator,
  wine: Wine
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export function CallWizard() {
  const [currentStepId, setCurrentStepId] = useState<StepId>("inicio")
  const [history, setHistory] = useState<StepId[]>([])
  const [diagnosticTags, setDiagnosticTags] = useState<string[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<typeof diagnosticQuestions>([])
  const [currentDiagnosticIndex, setCurrentDiagnosticIndex] = useState(0)

  // Seleccionar 2 preguntas aleatorias al iniciar nueva llamada
  const initializeCall = () => {
    const shuffled = shuffleArray(diagnosticQuestions)
    setSelectedQuestions(shuffled.slice(0, 2))
    setCurrentDiagnosticIndex(0)
    setDiagnosticTags([])
  }

  const currentStep = flowSteps[currentStepId]
  const recommendation = useMemo(() => getRecommendation(diagnosticTags), [diagnosticTags])

  const handleOptionClick = (nextStep: StepId, tag?: string) => {
    if (tag) {
      setDiagnosticTags(prev => [...prev, tag])
    }
    setHistory(prev => [...prev, currentStepId])
    setCurrentStepId(nextStep)
  }

  const handleDiagnosticAnswer = (tag: string) => {
    setDiagnosticTags(prev => [...prev, tag])
    
    if (currentDiagnosticIndex < 1) {
      // Ir a la segunda pregunta
      setHistory(prev => [...prev, currentStepId])
      setCurrentDiagnosticIndex(1)
      setCurrentStepId("diagnostico-2")
    } else {
      // Determinar propuesta basada en tags
      setHistory(prev => [...prev, currentStepId])
      
      if (diagnosticTags.includes("sin-productos") || tag === "sin-productos" || tag === "sin-proveedor") {
        setCurrentStepId("propuesta-sin-productos")
      } else if (diagnosticTags.includes("problemas-proveedor") || tag === "problemas-proveedor") {
        setCurrentStepId("propuesta-problemas-proveedor")
      } else if (diagnosticTags.includes("ampliar") || tag === "ampliar") {
        setCurrentStepId("propuesta-ampliar-portfolio")
      } else {
        setCurrentStepId("propuesta-general")
      }
    }
  }

  const handleBack = () => {
    if (history.length > 0) {
      const newHistory = [...history]
      const previousStep = newHistory.pop()
      setHistory(newHistory)
      setCurrentStepId(previousStep!)
      
      // Ajustar diagnostic index si volvemos
      if (previousStep === "diagnostico-1") {
        setCurrentDiagnosticIndex(0)
      }
    }
  }

  const handleReset = () => {
    setHistory([])
    setCurrentStepId("inicio")
    setDiagnosticTags([])
    setSelectedQuestions([])
    setCurrentDiagnosticIndex(0)
  }

  const handleStartCall = () => {
    initializeCall()
    handleOptionClick("apertura")
  }

  const getStepNumber = () => {
    if (currentStepId === "inicio") return 0
    if (currentStepId === "apertura") return 1
    if (currentStepId === "no-atiende" || currentStepId === "agendar") return 2
    if (currentStepId.startsWith("diagnostico")) return 2
    if (currentStepId.startsWith("propuesta")) return 3
    if (currentStepId.startsWith("objecion")) return 4
    if (currentStepId.startsWith("cierre")) return 5
    return history.length + 1
  }

  const isStartScreen = currentStepId === "inicio"
  const isDiagnosticStep = currentStepId === "diagnostico-1" || currentStepId === "diagnostico-2"

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground text-sm">Florio Sales Assistant</h1>
              <p className="text-xs text-muted-foreground">Guía de llamadas</p>
            </div>
          </div>
          
          {!isStartScreen && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                disabled={history.length === 0}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Atrás
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reiniciar
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="w-full max-w-2xl mx-auto">
          {isStartScreen ? (
            <StartScreen onStart={handleStartCall} />
          ) : isDiagnosticStep ? (
            <DiagnosticCard
              questionIndex={currentDiagnosticIndex}
              question={selectedQuestions[currentDiagnosticIndex]}
              onAnswer={handleDiagnosticAnswer}
              stepNumber={2}
            />
          ) : (
            <StepCard 
              step={currentStep} 
              stepNumber={getStepNumber()}
              onOptionClick={handleOptionClick}
              recommendation={recommendation}
              diagnosticTags={diagnosticTags}
            />
          )}
        </div>
      </main>

      {/* Progress indicator */}
      {!isStartScreen && (
        <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Paso {getStepNumber()} de 5</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-1 rounded-full transition-colors ${
                      step <= getStepNumber() ? "bg-primary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center space-y-8 py-8">
      <div className="space-y-4">
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
          <Phone className="w-10 h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Bodega Florio</h2>
          <p className="text-muted-foreground">Asistente de llamadas de ventas</p>
        </div>
      </div>

      <div className="grid gap-3 text-left max-w-md mx-auto">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Guía paso a paso</p>
            <p className="text-xs text-muted-foreground">Te indica qué decir en cada momento</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Diagnóstico inteligente</p>
            <p className="text-xs text-muted-foreground">2 preguntas aleatorias + recomendación personalizada</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Pedido mínimo: 25 cajas</p>
            <p className="text-xs text-muted-foreground">Precios actualizados Nov 2025 + sin IVA</p>
          </div>
        </div>
      </div>

      <Button 
        size="lg" 
        onClick={onStart}
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
      >
        <Phone className="w-5 h-5 mr-2" />
        Nueva Llamada
      </Button>
    </div>
  )
}

function DiagnosticCard({
  questionIndex,
  question,
  onAnswer,
  stepNumber
}: {
  questionIndex: number
  question: typeof diagnosticQuestions[0]
  onAnswer: (tag: string) => void
  stepNumber: number
}) {
  if (!question) return null

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
          {stepNumber}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Diagnóstico</h2>
          <span className="text-xs text-muted-foreground">Pregunta {questionIndex + 1} de 2</span>
        </div>
      </div>

      {/* Question */}
      <Card className="p-5 bg-card border-border">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-1 flex-1">
            <p className="text-xs font-medium text-primary uppercase tracking-wide">Preguntá</p>
            <p className="text-foreground leading-relaxed text-lg">{question.question}</p>
          </div>
        </div>
      </Card>

      {/* Objective */}
      <div className="flex items-start gap-3 px-1">
        <Target className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Objetivo</p>
          <p className="text-sm text-muted-foreground">Identificar la situación del cliente para personalizar la propuesta</p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
          Respuesta del cliente
        </p>
        <div className="grid gap-2">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto py-4 px-4 text-left hover:bg-primary/10 hover:border-primary/50 transition-colors"
              onClick={() => onAnswer(option.tag)}
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mr-3">
                <Check className="w-4 h-4 text-foreground" />
              </div>
              <span className="text-foreground">{option.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PriceListSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const categories = ["Exclusivo", "Alta Rotación", "Varietal", "Generoso"]
  
  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <List className="w-4 h-4" />
          <span>Lista de Precios (Nov 2025)</span>
        </div>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>
      
      {isExpanded && (
        <div className="space-y-4 pt-2">
          {categories.map(category => {
            const products = priceList.filter(p => p.category === category)
            return (
              <div key={category} className="space-y-2">
                <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">{category}</h4>
                <div className="grid gap-1">
                  {products.map((product, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm ${
                        product.highlight ? "bg-primary/10 border border-primary/20" : "bg-card"
                      }`}
                    >
                      <span className={product.highlight ? "font-medium text-foreground" : "text-muted-foreground"}>
                        {product.name}
                      </span>
                      <span className="font-mono text-foreground">
                        ${product.pricePerBox.toLocaleString("es-AR")}/caja
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
          <p className="text-xs text-muted-foreground text-center pt-2">
            * Precios sin IVA. Caja = 6 botellas de 750ml
          </p>
        </div>
      )}
    </div>
  )
}

function ProductItem({ product }: { product: { name: string; boxes: number; pricePerBox: number } }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const description = productDescriptions[product.name]
  
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm py-3 px-2 hover:bg-primary/5 rounded-lg transition-colors text-left"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-foreground">{product.boxes} cajas - {product.name}</span>
          {description && (
            <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          )}
        </div>
        <span className="font-mono text-muted-foreground shrink-0 ml-2">
          ${(product.boxes * product.pricePerBox).toLocaleString("es-AR")}
        </span>
      </button>
      {isExpanded && description && (
        <div className="px-2 pb-3 -mt-1">
          <p className="text-xs text-muted-foreground bg-card/50 rounded-lg p-3 border border-border/50">
            {description}
          </p>
        </div>
      )}
    </div>
  )
}

function RecommendationSection({ recommendation }: { recommendation: Recommendation }) {
  return (
    <Card className="p-4 bg-primary/5 border-primary/20">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{recommendation.title}</h4>
            <p className="text-sm text-muted-foreground">{recommendation.description}</p>
          </div>
        </div>
        
        <div className="space-y-0">
          {recommendation.products.map((product, idx) => (
            <ProductItem key={idx} product={product} />
          ))}
        </div>
        
        <div className="pt-2 border-t border-primary/20 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total: {recommendation.totalBoxes} cajas</p>
          </div>
          <p className="font-bold text-lg text-foreground">
            ${recommendation.totalPrice.toLocaleString("es-AR")}
          </p>
        </div>
        <p className="text-xs text-muted-foreground">* Precios sin IVA</p>
      </div>
    </Card>
  )
}

function StepCard({ 
  step, 
  stepNumber,
  onOptionClick,
  recommendation,
  diagnosticTags
}: { 
  step: FlowStep
  stepNumber: number
  onOptionClick: (nextStep: StepId, tag?: string) => void
  recommendation: Recommendation
  diagnosticTags: string[]
}) {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold">
          {stepNumber}
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">{step.title}</h2>
          {step.isEndStep && (
            <span className="text-xs text-primary font-medium">Fin del flujo</span>
          )}
        </div>
      </div>

      {/* Script - What to say */}
      {step.script && (
        <Card className="p-5 bg-card border-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-xs font-medium text-primary uppercase tracking-wide">Qué decir</p>
              <p className="text-foreground leading-relaxed">{step.script}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Recommendation */}
      {step.showRecommendation && (
        <RecommendationSection recommendation={recommendation} />
      )}

      {/* Price List */}
      {step.showPrices && (
        <PriceListSection />
      )}

      {/* Objective */}
      {step.objective && (
        <div className="flex items-start gap-3 px-1">
          <Target className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Objetivo</p>
            <p className="text-sm text-muted-foreground">{step.objective}</p>
          </div>
        </div>
      )}

      {/* Tip */}
      {step.tip && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <Lightbulb className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">Tip</p>
            <p className="text-sm text-foreground">{step.tip}</p>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 pt-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">
          {step.isEndStep ? "Siguiente acción" : "Respuesta del cliente"}
        </p>
        <div className="grid gap-2">
          {step.options.map((option, index) => {
            const Icon = option.icon ? iconMap[option.icon] : Check
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto py-4 px-4 text-left hover:bg-primary/10 hover:border-primary/50 transition-colors"
                onClick={() => onOptionClick(option.nextStep, option.diagnosticTag)}
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mr-3">
                  <Icon className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-foreground">{option.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
