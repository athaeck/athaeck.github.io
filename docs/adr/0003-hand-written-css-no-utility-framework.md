# Hand-written CSS, no utility or component framework

The site is styled in plain CSS: design tokens as CSS custom properties in one file, everything else in scoped component styles with native nesting, plus a separate print stylesheet. We rejected Nuxt UI, because it ships its own look and components that fight a bespoke design (Chronoscope, timeline, echo lines) and pulls in Tailwind; Tailwind v4 and UnoCSS, because their strength is fast layout from utilities, while the expensive parts here are SVG and custom effects, and the chosen prototype is already plain modern CSS (`clamp()`, `:has()`, container queries, `popover`, scroll snap) that ports directly; and SCSS, because the design has essentially one breakpoint, so mixins earn little, and Sass variables would duplicate tokens that must stay custom properties to switch at runtime in the dark bands. We accept repeating the few media queries as literals and having no utility shorthand.

## Consequences

- Colours, type scale and spacing exist only as custom properties; no second token system.
- No CSS build dependency beyond what Vite does natively.
