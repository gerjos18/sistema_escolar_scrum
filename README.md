# Scrum · Sistema Escolar · React (CDN) Demo

Esta demo muestra **Product Backlog**, **Fichas de Backlog**, **Sprint Planning** y **Calendario** con **React + Tailwind** usando CDNs (sin build tools).

> Fecha de base: 03 Sep 2025

## Usar localmente
1. Abre `index.html` en tu navegador.
2. Edita `data.js` con tus historias reales.

## Publicar en GitHub Pages
1. Crea un repo y sube estos archivos al **root**.
2. En GitHub: *Settings → Pages → Build and deployment → Branch: main / root*. Guarda.
3. Tu sitio quedará disponible como `https://<tu-usuario>.github.io/<repo>/`.

## Subir a GitHub desde terminal

```bash
git init
git add .
git commit -m "Scrum React demo (CDN)"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

## Estructura
- `index.html` — Página principal (incluye React/Tailwind por CDN)
- `app.jsx` — Componentes React (JSX con Babel en navegador)
- `data.js` — Historias/sprints de ejemplo (edítalo)
- `README.md` — Guía rápida

## Nota
Para un proyecto con tooling (Vite, CRA), puedes migrar fácilmente estos componentes. Esta versión sin bundler es perfecta para **entregas académicas rápidas** y **GitHub Pages**.
