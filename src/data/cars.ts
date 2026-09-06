export interface CarListing {
  slug: string;
  make: string;
  model: string;
  tagline: string;
  year: string;
  power: string;
  engine: string;
  mileage: string;
  price: string;
  origin: string;
  description: string;
  specs: { label: string; value: string }[];
  /* PLACEHOLDER: swap for real photography (1600x2000+, portrait, dark studio bg) */
  image: string;
}

export const cars: CarListing[] = [
  {
    slug: "bmw-x5",
    make: "BMW",
    model: "X5",
    tagline: "Presencia dominante, ingeniería sin compromiso",
    year: "2022",
    power: "340 CV",
    engine: "3.0L I6 Turbo",
    mileage: "28.000 km",
    price: "Consultar",
    origin: "Múnich, Alemania",
    description:
      "Un SUV que impone respeto sin levantar la voz. Revisado íntegramente en origen antes de salir de Alemania, con historial completo de mantenimiento en concesionario oficial BMW.",
    specs: [
      { label: "Motor", value: "3.0L I6 Turbo" },
      { label: "Potencia", value: "340 CV" },
      { label: "0-100 km/h", value: "5.5 s" },
      { label: "Tracción", value: "xDrive AWD" },
      { label: "Transmisión", value: "Automática 8 vel." },
    ],
    image: "/placeholders/bmw-x5.jpg",
  },
  {
    slug: "bmw-m2",
    make: "BMW",
    model: "M2",
    tagline: "Compacto, brutal, quirúrgico",
    year: "2023",
    power: "460 CV",
    engine: "3.0L I6 Twin-Turbo",
    mileage: "12.500 km",
    price: "Consultar",
    origin: "Leipzig, Alemania",
    description:
      "El deportivo puro de la gama BMW M. Chasis afilado, motor S58 y una relación peso-potencia que se siente en cada curva. Unidad en garantía de fábrica.",
    specs: [
      { label: "Motor", value: "3.0L I6 Twin-Turbo S58" },
      { label: "Potencia", value: "460 CV" },
      { label: "0-100 km/h", value: "3.9 s" },
      { label: "Tracción", value: "Trasera RWD" },
      { label: "Transmisión", value: "Manual 6 vel. / Auto 8 vel." },
    ],
    image: "/placeholders/bmw-m2.jpg",
  },
  {
    slug: "bmw-e34",
    make: "BMW",
    model: "E34",
    tagline: "El icono que definió una era",
    year: "1992",
    power: "218 CV",
    engine: "3.5L V8",
    mileage: "142.000 km",
    price: "Consultar",
    origin: "Stuttgart, Alemania",
    description:
      "Una pieza de colección restaurada con respeto por su origen. Carrocería sin corrosión, interior original conservado y mecánica puesta a punto por especialistas en clásicos BMW.",
    specs: [
      { label: "Motor", value: "3.5L V8 M60" },
      { label: "Potencia", value: "218 CV" },
      { label: "0-100 km/h", value: "7.7 s" },
      { label: "Tracción", value: "Trasera RWD" },
      { label: "Transmisión", value: "Automática 5 vel." },
    ],
    image: "/placeholders/bmw-e34.jpg",
  },
];
