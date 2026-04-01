export type StepId = 
  | "inicio"
  | "apertura"
  | "no-atiende"
  | "agendar"
  | "diagnostico-1"
  | "diagnostico-2"
  | "propuesta-sin-productos"
  | "propuesta-problemas-proveedor"
  | "propuesta-ampliar-portfolio"
  | "propuesta-general"
  | "objeciones"
  | "objecion-lista"
  | "objecion-proveedor"
  | "objecion-caro"
  | "objecion-pensarlo"
  | "cierre"
  | "cierre-exito"
  | "cierre-seguimiento"
  | "cierre-no-interesado"

export interface FlowOption {
  label: string
  nextStep: StepId
  icon?: string
  diagnosticTag?: string
}

export interface FlowStep {
  id: StepId
  title: string
  script?: string
  objective?: string
  tip?: string
  options: FlowOption[]
  isEndStep?: boolean
  showPrices?: boolean
  showRecommendation?: boolean
}

// Preguntas de diagnóstico - se seleccionan 2 aleatorias por llamada
export const diagnosticQuestions = [
  {
    id: "tipo-negocio",
    question: "Contame un poco, ¿qué tipo de negocio tenés? ¿Distribuís bebidas, tenés local, restaurante...?",
    options: [
      { label: "Distribuidor de bebidas", tag: "distribuidor" },
      { label: "Local / Almacén / Vinoteca", tag: "local" },
      { label: "Restaurante / Bar", tag: "gastronomia" },
      { label: "Otro tipo de negocio", tag: "otro" },
    ]
  },
  {
    id: "trabaja-bodega",
    question: "¿Hoy estás trabajando con alguna bodega o estás buscando arrancar con vino por primera vez?",
    options: [
      { label: "Ya trabaja con bodegas", tag: "tiene-proveedor" },
      { label: "Quiere arrancar con vino", tag: "sin-productos" },
      { label: "Trabaja poco, quiere ampliar", tag: "ampliar" },
    ]
  },
  {
    id: "problemas-proveedor",
    question: "Y los vinos que tenés ahora, ¿te están funcionando bien o hay algo que te esté generando algún problema — stock, precio, calidad?",
    options: [
      { label: "Funcionan bien", tag: "sin-problemas" },
      { label: "Problemas de stock", tag: "problemas-stock" },
      { label: "Problemas de precio", tag: "problemas-precio" },
      { label: "Problemas de calidad", tag: "problemas-calidad" },
    ]
  },
  {
    id: "conoce-generosos",
    question: "¿Conocés los vinos generosos? Tipo Marsala, Oporto, Jerez... son productos con muy buen margen y clientela fiel.",
    options: [
      { label: "Sí, los trabaja", tag: "conoce-generosos" },
      { label: "Los conoce pero no vende", tag: "no-vende-generosos" },
      { label: "No los conoce", tag: "no-conoce-generosos" },
    ]
  }
]

// Lista de precios por caja (6 unidades) - Noviembre 2025
export const priceList = [
  // EXCLUSIVOS
  { name: "Gamba di Pernice Rosso", category: "Exclusivo", pricePerBox: 51600, pricePerBottle: 8600, units: 6, highlight: true },
  { name: "Gamba di Pernice Rosato", category: "Exclusivo", pricePerBox: 51600, pricePerBottle: 8600, units: 6, highlight: true },
  { name: "Nebbiolo Florio", category: "Exclusivo", pricePerBox: 51600, pricePerBottle: 8600, units: 6 },
  { name: "Espumante Florio", category: "Exclusivo", pricePerBox: 51600, pricePerBottle: 8600, units: 6 },
  { name: "MaDeRo Espumante Rosato", category: "Exclusivo", pricePerBox: 51600, pricePerBottle: 8600, units: 6 },
  
  // ALTA ROTACIÓN
  { name: "Moscato Florio", category: "Alta Rotación", pricePerBox: 47340, pricePerBottle: 7890, units: 6, highlight: true },
  { name: "Dolce Florio Blanco", category: "Alta Rotación", pricePerBox: 51600, pricePerBottle: 8600, units: 6, highlight: true },
  { name: "Dolce Florio Rosado", category: "Alta Rotación", pricePerBox: 51600, pricePerBottle: 8600, units: 6 },
  { name: "MaDeRo Blanco Dulce Natural", category: "Alta Rotación", pricePerBox: 49530, pricePerBottle: 8255, units: 6 },
  { name: "Tinto Dulce Patero", category: "Alta Rotación", pricePerBox: 41580, pricePerBottle: 6930, units: 6 },
  
  // VARIETALES
  { name: "Malbec Florio", category: "Varietal", pricePerBox: 47340, pricePerBottle: 7890, units: 6, highlight: true },
  { name: "Chardonnay Florio", category: "Varietal", pricePerBox: 51600, pricePerBottle: 8600, units: 6 },
  { name: "MaDeRo Reserva Malbec", category: "Varietal", pricePerBox: 52590, pricePerBottle: 8765, units: 6 },
  { name: "Targa Florio", category: "Varietal", pricePerBox: 51600, pricePerBottle: 8600, units: 6 },
  
  // GENEROSOS
  { name: "Marsala Florio", category: "Generoso", pricePerBox: 37380, pricePerBottle: 6230, units: 6 },
  { name: "Oporto Florio", category: "Generoso", pricePerBox: 37380, pricePerBottle: 6230, units: 6 },
  { name: "Mistela Florio", category: "Generoso", pricePerBox: 47340, pricePerBottle: 7890, units: 6 },
  { name: "Jerez Florio", category: "Generoso", pricePerBox: 34450, pricePerBottle: 5742, units: 6 },
]

// Descripciones de productos para mostrar en propuestas
export const productDescriptions: Record<string, string> = {
  "Gamba di Pernice Rosso": "Vino tinto con burbujas, hecho con Bonarda. Muy aromático y fresco, con notas a frutos rojos y equilibrio entre dulzor y acidez. Ideal para pastas, carnes suaves o tablas de quesos. Casi no tiene competencia en el mercado - excelente margen.",
  "Gamba di Pernice Rosato": "Versión rosada del Gamba, más fresco y ligero. Burbujas suaves con notas a frutos rojos y flores. Perfecto para el verano, aperitivos o como entrada. Muy elegido por mujeres jóvenes. Producto único en el mercado.",
  "Espumante Florio": "Fresco, frutado y equilibrado, con notas cítricas y de frutos rojos. Burbujas suaves muy agradables. Perfecto para brindis, aperitivos o eventos. Acompaña pescados y mariscos. Muy buena rotación.",
  "Moscato Florio": "Dulce natural con notas florales y frutales intensas. Bajo en alcohol, muy refrescante. Ideal para postres, brindis o solo. Categoría en crecimiento constante. Alta rotación garantizada.",
  "Dolce Florio Blanco": "El que más rota. Fresco, aromático, con notas cítricas tipo pomelo. Equilibrio entre dulzor y acidez. Para previas, reuniones, verano o aperitivo. Muy elegido por jóvenes y mujeres. Se vende solo.",
  "Dolce Florio Rosado": "Versión rosada del Dolce, con notas a frutos rojos y frutillas. Fresco y dulce. Perfecto para el público joven que busca algo diferente. Complemento ideal del Dolce Blanco.",
  "Malbec Florio": "El clásico que siempre se mueve. Equilibrado, con notas a frutas rojas como ciruela. Perfil suave y fácil de tomar. Funciona con carnes, parrilla, pastas o quesos. Volumen de venta constante.",
  "Marsala Florio": "Vino generoso siciliano, con notas a pasas, almendras y caramelo. Ideal para cocina gourmet o como digestivo. Producto diferenciador para clientes que buscan algo especial.",
  "Nebbiolo Florio": "Varietal italiano premium. Elegante, con taninos firmes y notas a rosas y frutos rojos. Para conocedores y ocasiones especiales. Producto de nicho con excelente margen.",
  "MaDeRo Espumante Rosato": "Espumante rosado con burbujas finas. Fresco, frutal, con notas a frutillas y flores. Ideal para celebraciones y brindis. Presentación atractiva que llama la atención.",
  "MaDeRo Blanco Dulce Natural": "Dulce natural con perfil frutal intenso. Similar al Moscato pero con personalidad propia. Ideal para el público que busca vinos dulces accesibles.",
  "Tinto Dulce Patero": "Vino dulce artesanal, elaborado con uvas pisadas a pie. Sabor intenso a frutas rojas maduras. Producto tradicional con historia. Ideal para postres y sobremesa.",
  "Chardonnay Florio": "Blanco seco clásico con notas a frutas tropicales y manteca. Versátil para mariscos, pescados o pollo. Varietal conocido que se vende fácil.",
  "MaDeRo Reserva Malbec": "Malbec con crianza en roble. Más complejo y estructurado. Para clientes que buscan algo más premium. Excelente relación precio-calidad.",
  "Targa Florio": "Blend premium de la bodega. Equilibrado y elegante, con buen cuerpo. Para ocasiones especiales o regalos. Presentación distintiva.",
  "Oporto Florio": "Vino generoso estilo Oporto. Dulce e intenso con notas a frutos secos. Para postres, chocolates o solo. Clásico que nunca falla.",
  "Mistela Florio": "Dulce natural con mosto concentrado. Muy aromático con notas a uvas frescas. Ideal como aperitivo o con postres. Producto tradicional argentino.",
  "Jerez Florio": "Vino generoso seco estilo andaluz. Notas a frutos secos y almendras. Para aperitivos o tapas. Producto diferenciador para conocedores."
}

// Recomendaciones personalizadas según diagnóstico
export interface Recommendation {
  title: string
  description: string
  products: { name: string; boxes: number; pricePerBox: number }[]
  totalBoxes: number
  totalPrice: number
}

export function getRecommendation(diagnosticTags: string[]): Recommendation {
  // Mínimo 25 cajas
  
  // Para quien quiere arrancar con vino por primera vez
  if (diagnosticTags.includes("sin-productos")) {
    return {
      title: "Pack Inicio",
      description: "Ideal para arrancar. Productos fáciles de vender con alta rotación garantizada.",
      products: [
        { name: "Dolce Florio Blanco", boxes: 8, pricePerBox: 51600 },
        { name: "Gamba di Pernice Rosato", boxes: 6, pricePerBox: 51600 },
        { name: "Espumante Florio", boxes: 6, pricePerBox: 51600 },
        { name: "Moscato Florio", boxes: 5, pricePerBox: 47340 },
      ],
      totalBoxes: 25,
      totalPrice: 8 * 51600 + 6 * 51600 + 6 * 51600 + 5 * 47340
    }
  }
  
  // Para gastronomía (restaurante/bar)
  if (diagnosticTags.includes("gastronomia")) {
    return {
      title: "Pack Gastronomía",
      description: "Selección premium para acompañar comidas. Varietales + exclusivos para maridaje.",
      products: [
        { name: "Malbec Florio", boxes: 7, pricePerBox: 47340 },
        { name: "Chardonnay Florio", boxes: 5, pricePerBox: 51600 },
        { name: "Gamba di Pernice Rosso", boxes: 5, pricePerBox: 51600 },
        { name: "Espumante Florio", boxes: 5, pricePerBox: 51600 },
        { name: "Marsala Florio", boxes: 3, pricePerBox: 37380 },
      ],
      totalBoxes: 25,
      totalPrice: 7 * 47340 + 5 * 51600 + 5 * 51600 + 5 * 51600 + 3 * 37380
    }
  }
  
  // Para quien tiene problemas con proveedor actual
  if (diagnosticTags.includes("problemas-stock") || diagnosticTags.includes("problemas-precio") || diagnosticTags.includes("problemas-calidad")) {
    return {
      title: "Pack Solución",
      description: "Productos de alta rotación con stock garantizado y precio directo de bodega.",
      products: [
        { name: "Dolce Florio Blanco", boxes: 8, pricePerBox: 51600 },
        { name: "Malbec Florio", boxes: 7, pricePerBox: 47340 },
        { name: "Moscato Florio", boxes: 6, pricePerBox: 47340 },
        { name: "Gamba di Pernice Rosso", boxes: 4, pricePerBox: 51600 },
      ],
      totalBoxes: 25,
      totalPrice: 8 * 51600 + 7 * 47340 + 6 * 47340 + 4 * 51600
    }
  }
  
  // Para quien no conoce los generosos
  if (diagnosticTags.includes("no-conoce-generosos") || diagnosticTags.includes("no-vende-generosos")) {
    return {
      title: "Pack con Generosos",
      description: "Incluye generosos para diferenciar tu oferta. Excelente margen y clientela fiel.",
      products: [
        { name: "Dolce Florio Blanco", boxes: 6, pricePerBox: 51600 },
        { name: "Malbec Florio", boxes: 5, pricePerBox: 47340 },
        { name: "Gamba di Pernice Rosso", boxes: 5, pricePerBox: 51600 },
        { name: "Marsala Florio", boxes: 4, pricePerBox: 37380 },
        { name: "Oporto Florio", boxes: 3, pricePerBox: 37380 },
        { name: "Moscato Florio", boxes: 2, pricePerBox: 47340 },
      ],
      totalBoxes: 25,
      totalPrice: 6 * 51600 + 5 * 47340 + 5 * 51600 + 4 * 37380 + 3 * 37380 + 2 * 47340
    }
  }
  
  // Para distribuidores
  if (diagnosticTags.includes("distribuidor")) {
    return {
      title: "Pack Distribuidor",
      description: "Mix completo para ofrecer variedad a tus clientes. Alta rotación + exclusivos.",
      products: [
        { name: "Dolce Florio Blanco", boxes: 6, pricePerBox: 51600 },
        { name: "Moscato Florio", boxes: 5, pricePerBox: 47340 },
        { name: "Malbec Florio", boxes: 5, pricePerBox: 47340 },
        { name: "Gamba di Pernice Rosso", boxes: 5, pricePerBox: 51600 },
        { name: "Espumante Florio", boxes: 4, pricePerBox: 51600 },
      ],
      totalBoxes: 25,
      totalPrice: 6 * 51600 + 5 * 47340 + 5 * 47340 + 5 * 51600 + 4 * 51600
    }
  }
  
  // Para quien quiere ampliar portfolio
  if (diagnosticTags.includes("ampliar")) {
    return {
      title: "Pack Variedad",
      description: "Amplia variedad para testear qué funciona mejor en tu zona.",
      products: [
        { name: "Gamba di Pernice Rosso", boxes: 5, pricePerBox: 51600 },
        { name: "Dolce Florio Blanco", boxes: 5, pricePerBox: 51600 },
        { name: "Malbec Florio", boxes: 5, pricePerBox: 47340 },
        { name: "Moscato Florio", boxes: 5, pricePerBox: 47340 },
        { name: "Espumante Florio", boxes: 5, pricePerBox: 51600 },
      ],
      totalBoxes: 25,
      totalPrice: 5 * 51600 + 5 * 51600 + 5 * 47340 + 5 * 47340 + 5 * 51600
    }
  }
  
  // Recomendación por defecto
  return {
    title: "Pack Inicial Recomendado",
    description: "Mix equilibrado con los productos que mejor funcionan.",
    products: [
      { name: "Gamba di Pernice Rosso", boxes: 6, pricePerBox: 51600 },
      { name: "Dolce Florio Blanco", boxes: 7, pricePerBox: 51600 },
      { name: "Moscato Florio", boxes: 6, pricePerBox: 47340 },
      { name: "Malbec Florio", boxes: 6, pricePerBox: 47340 },
    ],
    totalBoxes: 25,
    totalPrice: 6 * 51600 + 7 * 51600 + 6 * 47340 + 6 * 47340
  }
}

export const flowSteps: Record<StepId, FlowStep> = {
  inicio: {
    id: "inicio",
    title: "Iniciar Llamada",
    objective: "Preparate para la llamada. El sistema seleccionará 2 preguntas de diagnóstico aleatorias.",
    options: [
      { label: "Nueva Llamada", nextStep: "apertura", icon: "phone" }
    ]
  },

  apertura: {
    id: "apertura",
    title: "Apertura",
    script: "Hola [Nombre], soy [tu nombre] de Bodega Florio. Te llamo porque estamos trabajando con distribuidores de la zona y tengo algo que puede interesarte. ¿Tenés un minuto?",
    objective: "Romper el hielo y validar si puede hablar",
    options: [
      { label: "Puede hablar ahora", nextStep: "diagnostico-1", icon: "check" },
      { label: "No puede hablar", nextStep: "agendar", icon: "calendar" },
      { label: "No atiende", nextStep: "no-atiende", icon: "phone-off" }
    ]
  },

  "no-atiende": {
    id: "no-atiende",
    title: "No Atiende",
    script: "Enviá un WhatsApp:",
    tip: "\"Hola [Nombre], soy [tu nombre] de Bodega Florio. Te llamé recién pero no pude comunicarme. Tenemos una propuesta exclusiva para distribuidores de tu zona. ¿Te puedo llamar en otro momento?\"",
    objective: "Dejar mensaje y abrir canal de comunicación",
    options: [
      { label: "Volver al inicio", nextStep: "inicio", icon: "home" }
    ]
  },

  agendar: {
    id: "agendar",
    title: "Agendar Llamada",
    script: "Perfecto, ¿cuándo te queda mejor que te llame? ¿Mañana a la mañana o a la tarde?",
    objective: "Conseguir un compromiso de horario",
    tip: "Anotá el horario y poné recordatorio",
    options: [
      { label: "Agendado - Volver al inicio", nextStep: "inicio", icon: "check" }
    ]
  },

  "diagnostico-1": {
    id: "diagnostico-1",
    title: "Diagnóstico - Pregunta 1",
    objective: "Primera pregunta de diagnóstico (seleccionada aleatoriamente)",
    options: [] // Se llenan dinámicamente
  },

  "diagnostico-2": {
    id: "diagnostico-2",
    title: "Diagnóstico - Pregunta 2",
    objective: "Segunda pregunta de diagnóstico",
    options: [] // Se llenan dinámicamente
  },

  "propuesta-sin-productos": {
    id: "propuesta-sin-productos",
    title: "Propuesta: Nueva Categoría",
    script: "Perfecto, entonces te cuento: Florio tiene productos únicos que no vas a encontrar en otro lado. El Gamba di Pernice es un vino dulce natural que se vende solo - la gente lo prueba y vuelve. Y el margen que te deja es excelente porque comprás directo de bodega.",
    objective: "Mostrar oportunidad de abrir nueva categoría rentable",
    tip: "Enfocate en que es una categoría nueva = nuevos clientes = más ventas",
    showPrices: true,
    showRecommendation: true,
    options: [
      { label: "Muestra interés", nextStep: "cierre", icon: "star" },
      { label: "Tiene dudas", nextStep: "objeciones", icon: "help" },
      { label: "Pide precios", nextStep: "objecion-lista", icon: "list" }
    ]
  },

  "propuesta-problemas-proveedor": {
    id: "propuesta-problemas-proveedor",
    title: "Propuesta: Solución a Problemas",
    script: "Te entiendo perfectamente. Mirá, nosotros somos distribuidores oficiales de Florio, trabajamos directo con la bodega. Eso significa: precio real de mayorista sin intermediarios, stock permanente (nunca te quedás sin mercadería), y envío gratis en GBA. Además te garantizo exclusividad en tu zona.",
    objective: "Posicionarse como solución a los problemas actuales",
    tip: "Hacé énfasis en lo que le falla hoy: si es precio, resaltá el precio. Si es stock, resaltá el stock.",
    showPrices: true,
    showRecommendation: true,
    options: [
      { label: "Muestra interés", nextStep: "cierre", icon: "star" },
      { label: "Tiene dudas", nextStep: "objeciones", icon: "help" },
      { label: "Pide precios", nextStep: "objecion-lista", icon: "list" }
    ]
  },

  "propuesta-ampliar-portfolio": {
    id: "propuesta-ampliar-portfolio",
    title: "Propuesta: Ampliar Portfolio",
    script: "Genial, entonces esto te va a interesar. Florio tiene 3 líneas que se complementan perfecto: los exclusivos como Gamba di Pernice para clientes premium, los de alta rotación como Moscato que vuelan, y los varietales clásicos. Te armo un mix inicial para que pruebes y veas qué funciona mejor en tu zona.",
    objective: "Mostrar variedad y flexibilidad",
    tip: "El mínimo de compra son 25 cajas. Ofrecé armar un pedido personalizado según su clientela.",
    showPrices: true,
    showRecommendation: true,
    options: [
      { label: "Muestra interés", nextStep: "cierre", icon: "star" },
      { label: "Tiene dudas", nextStep: "objeciones", icon: "help" },
      { label: "Pide precios", nextStep: "objecion-lista", icon: "list" }
    ]
  },

  "propuesta-general": {
    id: "propuesta-general",
    title: "Propuesta General",
    script: "Te cuento en dos palabras: somos distribuidores exclusivos de Bodega Florio. Tenemos vinos que no conseguís en otro lado, precio directo de bodega, envío gratis en GBA, y te garantizamos exclusividad en tu zona. ¿Qué tipo de productos te interesan más? ¿Algo dulce, espumante, o varietales clásicos?",
    objective: "Presentación general para seguir diagnosticando",
    showPrices: true,
    showRecommendation: true,
    options: [
      { label: "Le interesa dulce/espumante", nextStep: "propuesta-sin-productos", icon: "wine" },
      { label: "Le interesa variedad", nextStep: "propuesta-ampliar-portfolio", icon: "plus" },
      { label: "Muestra interés general", nextStep: "cierre", icon: "star" },
      { label: "Tiene objeciones", nextStep: "objeciones", icon: "help" }
    ]
  },

  objeciones: {
    id: "objeciones",
    title: "Manejo de Objeciones",
    objective: "Seleccioná la objeción que plantea el cliente",
    options: [
      { label: "\"Mandame la lista de precios\"", nextStep: "objecion-lista", icon: "list" },
      { label: "\"Ya tengo proveedor\"", nextStep: "objecion-proveedor", icon: "user" },
      { label: "\"Es caro\"", nextStep: "objecion-caro", icon: "dollar" },
      { label: "\"Lo voy a pensar\"", nextStep: "objecion-pensarlo", icon: "clock" }
    ]
  },

  "objecion-lista": {
    id: "objecion-lista",
    title: "Objeción: Lista de Precios",
    script: "Sí, te la mando sin problema. Pero dejame preguntarte: si los precios te cierran, ¿arrancarías con un pedido de prueba de 25 cajas? Porque además de los precios, este mes tenemos un bonus de caja de degustación gratis en el primer pedido.",
    objective: "No perder el control de la conversación - comprometer antes de mandar lista",
    tip: "Siempre buscá un compromiso antes de enviar la lista. Mínimo: 25 cajas.",
    showPrices: true,
    options: [
      { label: "Acepta condición", nextStep: "cierre", icon: "check" },
      { label: "Solo quiere la lista", nextStep: "cierre-seguimiento", icon: "mail" },
      { label: "Tiene otra objeción", nextStep: "objeciones", icon: "help" }
    ]
  },

  "objecion-proveedor": {
    id: "objecion-proveedor",
    title: "Objeción: Ya Tiene Proveedor",
    script: "Perfecto, no te digo que lo cambies. Te propongo algo: hacé un pedido de prueba de 25 cajas, compará precios, calidad y servicio. Si no te convence, seguís con tu proveedor de siempre. Pero si te funciona mejor, ganamos los dos. ¿Qué te parece?",
    objective: "Posicionarse como alternativa sin riesgo",
    tip: "No ataques al proveedor actual, ofrecé comparación",
    showPrices: true,
    showRecommendation: true,
    options: [
      { label: "Acepta probar", nextStep: "cierre", icon: "check" },
      { label: "No quiere cambiar nada", nextStep: "cierre-seguimiento", icon: "calendar" },
      { label: "Tiene otra objeción", nextStep: "objeciones", icon: "help" }
    ]
  },

  "objecion-caro": {
    id: "objecion-caro",
    title: "Objeción: Es Caro",
    script: "Entiendo. Pero mirá: estás comprando directo de bodega, sin intermediarios. El margen que te queda es mayor que con otros proveedores. Además, estos productos se venden solos - el Gamba di Pernice tiene clientes que lo buscan específicamente. ¿Querés que hagamos números juntos?",
    objective: "Cambiar el foco de precio a rentabilidad",
    tip: "Enfocate en el margen, no en el precio. Mostrale la lista para que vea los precios reales.",
    showPrices: true,
    options: [
      { label: "Quiere ver números", nextStep: "cierre", icon: "calculator" },
      { label: "Sigue pensando que es caro", nextStep: "cierre-seguimiento", icon: "calendar" },
      { label: "Tiene otra objeción", nextStep: "objeciones", icon: "help" }
    ]
  },

  "objecion-pensarlo": {
    id: "objecion-pensarlo",
    title: "Objeción: Lo Voy a Pensar",
    script: "Dale, entiendo. Pero dejame preguntarte: ¿qué es lo que te hace dudar? Porque capaz puedo ayudarte a resolver eso ahora. ¿Es el precio, el producto, o querés consultar con alguien?",
    objective: "Identificar la objeción real detrás del \"lo pienso\"",
    tip: "El \"lo pienso\" siempre esconde algo - descubrí qué es",
    options: [
      { label: "Era el precio", nextStep: "objecion-caro", icon: "dollar" },
      { label: "Era el proveedor", nextStep: "objecion-proveedor", icon: "user" },
      { label: "Realmente necesita tiempo", nextStep: "cierre-seguimiento", icon: "calendar" },
      { label: "Se destrabó - muestra interés", nextStep: "cierre", icon: "star" }
    ]
  },

  cierre: {
    id: "cierre",
    title: "Cierre",
    script: "Genial. Entonces, ¿arrancamos con el pedido inicial de 25 cajas? Te muestro la recomendación basada en lo que me contaste:",
    objective: "Cerrar el pedido - mínimo 25 cajas",
    tip: "Siempre sugerí el pedido personalizado según el diagnóstico",
    showRecommendation: true,
    options: [
      { label: "Cierra pedido", nextStep: "cierre-exito", icon: "check" },
      { label: "Quiere pensarlo", nextStep: "cierre-seguimiento", icon: "calendar" },
      { label: "No le interesa", nextStep: "cierre-no-interesado", icon: "x" }
    ]
  },

  "cierre-exito": {
    id: "cierre-exito",
    title: "Pedido Cerrado",
    script: "Excelente. Te paso los datos para el pedido por WhatsApp. El envío es gratis en GBA y te llega en 48-72hs. Cualquier duda me escribís. ¡Gracias por la confianza!",
    objective: "Confirmar y dar siguientes pasos",
    isEndStep: true,
    options: [
      { label: "Nueva llamada", nextStep: "inicio", icon: "phone" }
    ]
  },

  "cierre-seguimiento": {
    id: "cierre-seguimiento",
    title: "Agendar Seguimiento",
    script: "Perfecto, lo entiendo. ¿Cuándo te llamo para retomar? ¿El jueves o viernes de esta semana te queda bien?",
    objective: "Conseguir compromiso de fecha para seguimiento",
    tip: "Siempre dar opciones concretas de fecha, no preguntas abiertas",
    isEndStep: true,
    options: [
      { label: "Nueva llamada", nextStep: "inicio", icon: "phone" }
    ]
  },

  "cierre-no-interesado": {
    id: "cierre-no-interesado",
    title: "No Interesado",
    script: "Entiendo, no hay problema. Te dejo mi contacto por si en algún momento necesitás. ¡Éxitos!",
    objective: "Cerrar amablemente dejando puerta abierta",
    isEndStep: true,
    options: [
      { label: "Nueva llamada", nextStep: "inicio", icon: "phone" }
    ]
  }
}
