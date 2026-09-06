export interface ImportStep {
  label: string;
  title: string;
  description: string;
  icon: string; // SVG path data, single path, ~24x24 viewBox
}

export const importSteps: ImportStep[] = [
  {
    label: "01",
    title: "Solicitud",
    description: "Nos cuentas el modelo, spec y presupuesto exacto que buscas.",
    icon: "M6 2h9l5 5v15H6V2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.5H8V12zm0 4h8v1.5H8V16zm0-8h4v1.5H8V8z",
  },
  {
    label: "02",
    title: "Búsqueda en Alemania",
    description: "Rastreamos concesionarios, subastas y vendedores particulares verificados.",
    icon: "M10 2a8 8 0 1 0 4.9 14.32l5.39 5.38 1.41-1.41-5.38-5.39A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z",
  },
  {
    label: "03",
    title: "Verificación",
    description: "Inspección física independiente: mecánica, carrocería e historial VIN.",
    icon: "M12 1l8 3v7c0 5.25-3.4 9.74-8 11-4.6-1.26-8-5.75-8-11V4l8-3zm-1.2 13.6 5.3-5.3-1.4-1.4-3.9 3.9-1.7-1.7-1.4 1.4 3.1 3.1z",
  },
  {
    label: "04",
    title: "Transporte",
    description: "Logística puerta a puerta con seguro y seguimiento en tiempo real.",
    icon: "M3 6h11v7h1.17a2.5 2.5 0 0 1 4.66 0H21v-3l-3-4h-4V6H3v9h2.17a2.5 2.5 0 0 0 4.66 0H14V8H3V6zM7.5 16.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z",
  },
  {
    label: "05",
    title: "Entrega",
    description: "Recibes tu coche matriculado, documentado y listo para rodar.",
    icon: "M7 14a3 3 0 1 0 2.83 4H14a1 1 0 0 0 1-1v-1.17A3 3 0 0 0 17 14a3 3 0 0 0-2.83 2H9.83A3 3 0 0 0 7 14zm10.5-8.5-2-2h-3v2h2.59L17.5 8H8v2h11l1.5-1.5-3-3z",
  },
];
