# FuzzImports — Landing page

Landing page cinematográfica para una importadora de vehículos premium desde Alemania. Storytelling por scroll (GSAP + ScrollTrigger), scroll suave con inercia (Lenis), coche 3D en el hero (Three.js / React Three Fiber) y transiciones de página con la View Transitions API nativa.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`)
- **GSAP + ScrollTrigger** — motor de animación/scroll storytelling
- **Lenis** — scroll suave, sincronizado con el ticker de GSAP
- **Three.js + @react-three/fiber + @react-three/drei** — coche 3D del hero
- **split-type** — animación de titulares letra a letra / palabra a palabra
- **react-router-dom** + **View Transitions API** (con fallback automático) — navegación a fichas de coche
- **oxlint** para linting

## Cómo ejecutar

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción (tsc -b && vite build)
npm run preview  # sirve el build de producción
```

## Estructura

```
src/
  components/
    hero/        Hero cinematográfico (coche 3D placeholder, headline, fallback móvil)
    brand/       Storytelling de marca (sección pinneada con capítulos)
    inventory/   Galería de inventario propio (BMW X5, M2, E34)
    process/     Línea de tiempo del proceso de importación bajo demanda
    trust/       Testimonios y estadísticas de confianza
    cta/         CTA final con formulario de contacto
    layout/      Navbar, Footer, cursor magnético, transición de vista
  hooks/         useLenis, useReducedMotion, useIsMobile
  lib/gsap.ts    Registro único de plugins de GSAP
  data/          Contenido de coches, pasos de proceso, testimonios, brand story
  pages/         Home.tsx y CarDetail.tsx (ficha individual de coche)
```

## Placeholders a sustituir

Todo el contenido visual real (fotografía de coches, modelo 3D) está marcado con comentarios `PLACEHOLDER` en el código:

- **`src/components/hero/CarRig.tsx`** — coche del hero construido con primitivas de Three.js. Sustituir por un modelo `.glb` real vía `useGLTF` de `@react-three/drei`, manteniendo el mismo esquema de refs (`groupRef`, `wheelRefs`, `spoilerRef`, `headlightRefs`) para conservar las animaciones ligadas al scroll.
- **`src/components/hero/HeroMobileFallback.tsx`** — silueta SVG de sustitución en móvil/reduced-motion. Sustituir por una fotografía real (`/public/placeholders/hero-mobile.jpg`).
- **`src/components/inventory/CarPlaceholderArt.tsx`** — arte de sustitución usado en las tarjetas de inventario y en la ficha de detalle. Sustituir por fotografía real de estudio (recomendado 1600×2000+, retrato, fondo oscuro) referenciada desde `src/data/cars.ts` (`car.image`).
- **`public/favicon.svg`** — favicon mínimo de marcador de posición.

## Accesibilidad y rendimiento

- Todas las secciones con `pin`/`scrub` tienen una variante ligera cuando `prefers-reduced-motion: reduce` está activo o el viewport es móvil (sin pin, reveals simples con `onEnter`).
- El canvas 3D del hero (`HeroScene`) se carga con `React.lazy` en su propio chunk, para que los visitantes móviles/reduced-motion nunca descarguen Three.js.
- Todas las instancias de `ScrollTrigger`/timelines de GSAP se crean dentro de `gsap.context()` o se limpian explícitamente en el `return` de `useEffect`, para evitar fugas al desmontar componentes.
