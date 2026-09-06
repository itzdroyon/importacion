import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registered once at module load; every component reuses this instance
// instead of re-registering plugins on each mount.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
