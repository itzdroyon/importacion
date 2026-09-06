import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import SplitType from "split-type";
import { gsap } from "../../lib/gsap";
import { useMagnetic } from "../layout/Cursor";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface FormState {
  name: string;
  email: string;
  interest: "bajo-demanda" | "inventario";
  message: string;
}

const initialState: FormState = { name: "", email: "", interest: "bajo-demanda", message: "" };

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const submitRef = useMagnetic<HTMLButtonElement>(0.25);
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!headlineRef.current || !sectionRef.current) return;
    const split = new SplitType(headlineRef.current, { types: "words" });

    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        opacity: 0,
        yPercent: 40,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      if (!reducedMotion && glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          },
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [reducedMotion]);

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Indícanos tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Introduce un email válido.";
    if (!form.message.trim()) next.message = "Cuéntanos qué coche buscas.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // PLACEHOLDER: wire to real backend/CRM (e.g. POST /api/leads) here.
    setSubmitted(true);
  };

  return (
    <section id="cta" ref={sectionRef} className="relative overflow-hidden bg-charcoal px-6 py-28 md:px-12 md:py-40">
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Empieza hoy</span>
          <h2
            ref={headlineRef}
            className="mt-4 font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl md:text-5xl"
          >
            Cuéntanos qué coche alemán quieres tener.
          </h2>
          <p className="mt-6 max-w-md text-mist">
            Respondemos en menos de 24 horas con una primera valoración de disponibilidad y plazos.
          </p>
        </div>

        <div>
          {submitted ? (
            <div className="rounded-2xl border border-steel/60 bg-graphite p-8">
              <p className="font-display text-xl text-paper">Solicitud recibida.</p>
              <p className="mt-2 text-mist">Nuestro equipo se pondrá en contacto contigo en breve.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <Field label="Nombre" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-steel bg-transparent py-3 text-paper outline-none transition-colors focus:border-chrome"
                  placeholder="Tu nombre completo"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border-b border-steel bg-transparent py-3 text-paper outline-none transition-colors focus:border-chrome"
                  placeholder="tu@email.com"
                />
              </Field>

              <Field label="Me interesa">
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value as FormState["interest"] })}
                  className="w-full border-b border-steel bg-transparent py-3 text-paper outline-none transition-colors focus:border-chrome"
                >
                  <option value="bajo-demanda" className="bg-charcoal">Importación bajo demanda</option>
                  <option value="inventario" className="bg-charcoal">Inventario propio</option>
                </select>
              </Field>

              <Field label="Mensaje" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full resize-none border-b border-steel bg-transparent py-3 text-paper outline-none transition-colors focus:border-chrome"
                  placeholder="Modelo, año, presupuesto aproximado..."
                />
              </Field>

              <button
                ref={submitRef}
                type="submit"
                data-cursor="magnetic"
                className="mt-4 self-start rounded-full bg-paper px-8 py-3 text-sm font-medium uppercase tracking-widest text-ink transition-transform hover:scale-[1.03]"
              >
                Enviar solicitud
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-chrome-dim">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
