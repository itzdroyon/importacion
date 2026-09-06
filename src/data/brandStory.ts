export interface StoryBlock {
  kicker: string;
  title: string;
  body: string;
  tone: string; // background color for this chapter
}

export const storyBlocks: StoryBlock[] = [
  {
    kicker: "Quiénes somos",
    title: "Una boutique de importación, no un concesionario más.",
    body: "FuzzImports nace para conectar a compradores exigentes con el mercado alemán de vehículos premium y deportivos, gestionando cada paso del proceso con criterio propio.",
    tone: "#0a0b0d",
  },
  {
    kicker: "Por qué Alemania",
    title: "El país que fabricó la cultura del mantenimiento riguroso.",
    body: "Revisiones TÜV obligatorias, historiales de servicio impecables y una ingeniería probada a velocidades de autobahn. El origen importa, y en Alemania se nota.",
    tone: "#0e0f12",
  },
  {
    kicker: "Garantías",
    title: "Cada coche, verificado antes de moverse un centímetro.",
    body: "Inspección independiente pre-compra, historial de VIN completo y documentación fotográfica exhaustiva antes de autorizar el transporte.",
    tone: "#0a0d10",
  },
  {
    kicker: "Transparencia",
    title: "Un único presupuesto. Sin sorpresas en aduana.",
    body: "Impuestos, logística y gestión documental incluidos en una sola cifra desde el primer día, para que sepas exactamente qué estás pagando.",
    tone: "#0d0b0e",
  },
];
