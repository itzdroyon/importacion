export interface Testimonial {
  name: string;
  location: string;
  car: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marc Puig",
    location: "Barcelona",
    car: "BMW M2",
    quote:
      "Pedí un spec muy concreto y en seis semanas lo tenía en mi garaje. La inspección en Alemania detectó un detalle que el vendedor no mencionó — se negoció el precio antes de cerrar.",
  },
  {
    name: "Laura Fernández",
    location: "Valencia",
    car: "BMW X5",
    quote:
      "Lo que más valoro es la transparencia: un único presupuesto, sin cargos ocultos en aduana. El seguimiento del transporte en tiempo real quita mucha ansiedad.",
  },
  {
    name: "Ibai Etxeberria",
    location: "Bilbao",
    car: "BMW E34",
    quote:
      "Buscaba un clásico bien conservado, no un proyecto de restauración. El informe de verificación fue más completo que el de cualquier concesionario local.",
  },
];

export const trustStats = [
  { value: 120, suffix: "+", label: "Vehículos importados" },
  { value: 4.9, suffix: "/5", label: "Valoración media de clientes" },
  { value: 15, suffix: " días", label: "Tiempo medio de entrega" },
];
