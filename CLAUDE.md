# CLAUDE.md

Contexto para Claude (o cualquier LLM) trabajando en este repositorio.

## Qué es esto

Sitio web estático de **Certificado Médico Virtual** — Dr. Felipe Mejía, servicios de certificación médica ocupacional virtual en Manizales, Caldas, Colombia.

Dominio de producción: `certificadomedicovirtual.com` (registrado en GoDaddy).

Reemplaza un sitio previo hecho en GoDaddy Website Builder (no exportable). Este es código propio, deployable en cualquier hosting estático.

## Stack

100% estático. Sin build step, sin framework, sin dependencias npm.

- `index.html` — todo el contenido, una sola página (landing)
- `styles.css` — todos los estilos, tokens de diseño en `:root`
- `script.js` — vanilla JS, solo para animaciones de scroll (IntersectionObserver). Sin librerías externas.
- `assets/logo.svg`, `assets/favicon.svg` — logo propio
- `robots.txt`, `sitemap.xml` — SEO técnico
- JSON-LD embebido en `index.html` (`MedicalBusiness` schema) — no lo borres sin razón, ayuda al posicionamiento local en Google

## Decisiones de diseño (no revertir sin razón)

- **Paleta:** verde bosque `#0B3D3A` + dorado `#C9A66B` + hueso `#F5F2EC`. Deliberadamente NO azul-salud genérico ni cream/terracota (cliché de diseño generado por IA).
- **Tipografía:** Fraunces (display/títulos) + Inter (body). Google Fonts vía `<link>` en el `<head>`.
- **Logo:** símbolo de pulso ECG que se resuelve en un check dorado — representa "certificación/validación", no un sello notarial genérico ni una cruz médica clichée.
- **Animación del logo:** el trazo del pulso se dibuja una sola vez al cargar (`stroke-dashoffset`), después entra en un latido continuo muy sutil (`scale 1 → 1.045`, loop infinito, 2.4s). Es intencional — no lo quites ni lo hagas más agresivo. Respeta `prefers-reduced-motion` (debe desactivarse por completo si el usuario lo tiene activado).

## Reglas de contenido — importante

Estas restricciones vienen de decisiones explícitas del cliente, no las reviertas sin confirmar con él:

1. **No mencionar "videollamada" ni especificar cámara/micrófono como requisito.** El sitio dice "consulta médica virtual" de forma genérica, sin comprometerse a un formato técnico específico (podría ser llamada, videollamada, o evaluación asíncrona). Prometer un formato exacto genera reclamos si la realidad operativa difiere.
2. **No hay formulario de agendamiento.** Se eliminó intencionalmente — el CTA de agendar es un botón directo a WhatsApp (`https://wa.me/573122086535`) con mensaje precargado. No reintroducir un formulario sin que el cliente lo pida explícitamente.
3. **No inventar testimonios.** Los dos testimonios actuales (Carolina R., Andrés M.) son reales, provistos por el cliente. No agregar testimonios ficticios — es contenido de salud, inventar reseñas sería engañoso y arriesga la cuenta de Google Business si se detecta.
4. **Precio orientativo ("$60.000 COP") es un placeholder** — confirmar con el cliente antes de cualquier campaña paga o publicación mayor.
5. **La sección "Qué incluye / qué no incluye"** y **"Normatividad" (Resolución 1843 de 2025, Artículos 8 y 26)** son contenido legal/regulatorio real — no reformular las citas normativas sin verificar la fuente.

## SEO

- JSON-LD `MedicalBusiness` incluye `aggregateRating` y `review` — si se agregan testimonios reales nuevos, actualizar `reviewCount` para que sea preciso (Google penaliza conteos no verificables).
- `sitemap.xml` solo tiene la home — si se agregan más páginas, actualizarlo.
- Meta description y OG tags ya están optimizados en el `<head>` — no lo dupliques ni generes tags conflictivos.

## Deploy

Pendiente de definir el pipeline final. Contexto: el dominio está en GoDaddy; se evaluó GitHub Actions con deploy por FTP/SFTP a GoDaddy hosting, o alternativamente GitHub Pages con GoDaddy solo como DNS. Verificar con el cliente si el plan de GoDaddy tiene acceso FTP/cPanel antes de asumir la ruta.

## Cómo probar localmente

```bash
python3 -m http.server 8080
```

Sin build, sin instalación de dependencias.
