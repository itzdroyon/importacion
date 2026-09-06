import { useNavigate } from "react-router-dom";
import type { ReactNode, MouseEvent } from "react";

interface Props {
  to: string;
  className?: string;
  children: ReactNode;
  "data-cursor"?: string;
}

/**
 * Wraps react-router navigation in document.startViewTransition when the
 * browser supports it (Chrome/Edge as of writing), giving a soft cross-
 * fade/morph between the landing and a car detail page. Browsers without
 * support just navigate immediately — no fallback animation needed since
 * the route change itself still works.
 */
export default function ViewTransitionLink({ to, className, children, ...rest }: Props) {
  const navigate = useNavigate();

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => void;
    };
    if (doc.startViewTransition) {
      doc.startViewTransition(() => navigate(to));
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
