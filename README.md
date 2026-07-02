# Certificado Médico Virtual

Sitio web estático para Certificado Médico Virtual — Dr. Felipe Mejia, Manizales, Colombia.

Certificados médicos ocupacionales virtuales: contratación, afiliación ARL, ingreso, egreso, exámenes periódicos y certificados Au Pair.

## Stack

Sitio 100% estático — sin frameworks, sin build step.

- `index.html` — estructura y contenido
- `styles.css` — estilos (tokens de diseño en `:root`)
- `script.js` — animaciones de scroll (contador, reveal de tarjetas), sin dependencias externas
- `assets/` — logo y favicon (SVG)
- `robots.txt` / `sitemap.xml` — SEO técnico

## Desarrollo local

No requiere build. Basta con abrir `index.html` en el navegador, o servir con:

```bash
python3 -m http.server 8080
```

## Deploy

Ver `.github/workflows/deploy.yml` para el pipeline de deploy automático a GoDaddy vía FTP en cada push a `main`.

## Contacto del negocio

WhatsApp: [+57 312 208 6535](https://wa.me/573122086535)
