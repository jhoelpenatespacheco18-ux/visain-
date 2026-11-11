# VISAIN · Herramientas de seminario

App web instalable (PWA) que reúne en un solo lugar, para **celular y computador** y **sin internet**:

| Módulo | Carpeta | Qué hace |
|---|---|---|
| ⏱ Temporizador y ruleta | `modules/timer/` | Cuenta regresiva, modo proyector, fondos del PDF oficial, ruleta de preguntas |
| 🎬 Seminario en vivo | `modules/seminar/` | Presentación con avatares, calculadora de bonos, catálogo editable, liquidar producto |
| 🧮 Simulador de ganancias | `modules/simulator/` | Proyección mensual de ganancias por membresía, red, recompras y ventas |
| 📊 Plan de compensación | `modules/plan-slides/` | 20 diapositivas "masticadas" con notas del presentador |

**Sin build, sin dependencias, sin framework.** Es HTML + CSS + JavaScript puro (ES2017), por lo que
corre en cualquier servidor de archivos estáticos y en cualquier navegador moderno
(Chrome, Edge, Safari 14+, Firefox, Android e iOS).

## Probar en local

```bash
node scripts/serve.mjs        # http://localhost:8080   (Node 18+; solo para pruebas)
```
Cualquier otro servidor estático sirve (`python3 -m http.server`, nginx, Apache…).
Abrir `index.html` con doble clic también funciona, pero **sin** modo sin internet
(los service workers exigen `http://localhost` o `https://`).

## Publicar

Subir **toda la carpeta tal cual** a cualquier hosting estático con HTTPS. Detalle en
[`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md). Las rutas son relativas, así que funciona en la raíz del
dominio o en una subcarpeta (por ejemplo `usuario.github.io/visain/`).

## ⚠️ Regla de oro al modificar código

Después de **cualquier** cambio en archivos de la app, ejecutar:

```bash
node scripts/update-precache.mjs
```
Esto regenera la lista de archivos de `sw.js` y cambia su versión, para que los dispositivos
descarguen la actualización. Si se olvida, los usuarios seguirán viendo la versión anterior guardada.

## Estructura

```
visain-app/
├─ index.html                 Pantalla de inicio (menú de módulos)
├─ manifest.webmanifest       Datos de instalación PWA (nombre, iconos, accesos directos)
├─ sw.js                      Service worker (modo sin internet) — lista autogenerada
├─ css/                       Estilos compartidos: fonts.css (fuentes locales), hub.css (inicio)
├─ js/                        Scripts compartidos: register-sw.js, hub.js
├─ assets/
│  ├─ img/                    logo.png, sellos de la ruleta
│  ├─ icons/                  iconos PWA (192, 512, maskable, apple-touch, favicon)
│  ├─ fonts/                  Rubik y DM Sans (woff2, licencia OFL)
│  ├─ backgrounds/            15 láminas del PDF oficial (+ thumbs/) usadas como fondo del temporizador
│  └─ slides/                 Imágenes de las diapositivas del plan
├─ modules/
│  ├─ timer/        index.html · css/timer.css · js/{backgrounds,core,effects,questions,wheel,controls}.js
│  ├─ seminar/      index.html · css/{seminar,tools}.css · js/{presentation,tools}.js
│  ├─ simulator/    index.html · css/simulator.css · js/simulator.js
│  └─ plan-slides/  index.html (contiene las 20 diapositivas) · css/plan.css · js/plan.js
├─ scripts/                   serve.mjs (servidor de pruebas) · update-precache.mjs
└─ docs/                      ARQUITECTURA · DESPLIEGUE · DATOS-Y-ALMACENAMIENTO · EDITAR-CONTENIDO
```

## Documentación

- [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md) — cómo está organizado cada módulo y cómo se relacionan.
- [`docs/DESPLIEGUE.md`](docs/DESPLIEGUE.md) — publicar en GitHub Pages, Netlify, Apache, nginx, Firebase, intranet.
- [`docs/DATOS-Y-ALMACENAMIENTO.md`](docs/DATOS-Y-ALMACENAMIENTO.md) — qué guarda cada módulo en el dispositivo.
- [`docs/EDITAR-CONTENIDO.md`](docs/EDITAR-CONTENIDO.md) — cómo cambiar precios, porcentajes, preguntas y diapositivas.

## Compatibilidad

- Sin módulos ES ni `import`: scripts clásicos, cargables desde `file://` y cualquier servidor.
- Sin llamadas externas (cero CDN, cero fuentes remotas, cero analítica). Todo es del mismo origen.
- Funciones del navegador usadas (todas con degradación segura si faltan): Service Worker, localStorage,
  IndexedDB (solo fondo personalizado del temporizador), Canvas 2D, Web Animations, WebAudio, Wake Lock,
  Fullscreen API, `beforeinstallprompt`.
