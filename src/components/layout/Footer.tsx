const socials = [
  {
    name: "Instagram",
    href: "https://instagram.com/",
    path: "M12 2c-2.7 0-3.05.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.16-.56.55-.9 1.11-1.16 1.77-.25.64-.42 1.37-.47 2.43C2 8.95 2 9.3 2 12s.01 3.05.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.16 1.77.55.56 1.11.9 1.77 1.16.64.25 1.37.42 2.43.47C8.95 22 9.3 22 12 22s3.05-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.16.56-.55.9-1.11 1.16-1.77.25-.64.42-1.37.47-2.43.05-1.07.06-1.42.06-4.12s-.01-3.05-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.16-1.77 4.9 4.9 0 0 0-1.77-1.16c-.64-.25-1.37-.42-2.43-.47C15.05 2.01 14.7 2 12 2zm0 1.8c2.65 0 2.97.01 4.02.06.97.04 1.5.21 1.85.34.46.18.8.4 1.15.75.35.35.57.68.75 1.15.13.35.3.88.34 1.85.05 1.05.06 1.37.06 4.02s-.01 2.97-.06 4.02c-.04.97-.21 1.5-.34 1.85-.18.46-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.35.13-.88.3-1.85.34-1.05.05-1.36.06-4.02.06s-2.97-.01-4.02-.06c-.97-.04-1.5-.21-1.85-.34a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.13-.35-.3-.88-.34-1.85C3.81 14.97 3.8 14.65 3.8 12s.01-2.97.06-4.02c.04-.97.21-1.5.34-1.85.18-.46.4-.8.75-1.15.35-.35.68-.57 1.15-.75.35-.13.88-.3 1.85-.34C9.03 3.81 9.35 3.8 12 3.8zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/",
    path: "M12.02 2C6.5 2 2.03 6.47 2.03 12c0 1.83.48 3.6 1.4 5.17L2 22l4.94-1.4a9.9 9.9 0 0 0 5.08 1.4h.01c5.52 0 10-4.47 10-10S17.55 2 12.02 2zm0 18.13a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.93.83.8-2.86-.19-.3a8.13 8.13 0 1 1 6.75 3.64zm4.46-6.08c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01a.9.9 0 0 0-.64.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.46-.28z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9.98h4v11.02H3V9.98zm7 0h3.84v1.51h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1v6.47h-4v-5.74c0-1.37-.02-3.13-1.91-3.13-1.92 0-2.21 1.5-2.21 3.04v5.83h-4V9.98z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/",
    path: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.49 20.5 12 20.5 12 20.5s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-steel/60 bg-ink px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold tracking-[0.2em] uppercase text-paper">
            Fuzz<span className="text-chrome">Imports</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-mist">
            Importación de vehículos premium desde Alemania y alrededores. Bajo demanda o desde nuestro inventario propio.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 text-sm text-mist sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-chrome-dim">Contacto</span>
            <a href="mailto:hola@fuzzimports.com" className="hover:text-paper transition-colors">
              hola@fuzzimports.com
            </a>
            <a href="tel:+34900000000" className="hover:text-paper transition-colors">
              +34 900 000 000
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-chrome-dim">Empresa</span>
            <a href="#brand" className="hover:text-paper transition-colors">Nosotros</a>
            <a href="#inventory" className="hover:text-paper transition-colors">Inventario</a>
            <a href="#process" className="hover:text-paper transition-colors">Proceso</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-chrome-dim">Síguenos</span>
            <div className="flex gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-steel text-mist transition-colors hover:border-chrome hover:text-chrome"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-6xl border-t border-steel/40 pt-6 text-xs text-mist">
        © {new Date().getFullYear()} FuzzImports. Todos los derechos reservados.
      </div>
    </footer>
  );
}
