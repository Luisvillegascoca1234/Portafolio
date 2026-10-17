# FractalX

Landing page responsive del estudio FractalX. HTML, CSS y JavaScript, con Tailwind CDN, Anton, Archivo, Inter e Iconify Lucide.

## Vista local

Desde este directorio, ejecuta `npm run dev` y abre http://127.0.0.1:4173.

El contenido servido se encuentra en `dist/`. El logotipo original está en `dist/assets/fractalx-logo.png`, sin modificaciones. Las fotografías de referencia proceden de Unsplash.

La navegación usa un acabado liquid glass definido en `dist/glass-nav.css`. El logo que se muestra es `dist/assets/fractalx-logo-transparent.svg`: contiene la imagen original y convierte el negro en transparencia mediante un filtro SVG, conservando la forma de las letras y sus colores. El PNG original permanece intacto.

## Contacto y contenido

El correo de contacto es `fractal@gmail.com`. El formulario prepara un borrador mediante `mailto:` y permite descargar una consulta; no envía correos automáticamente. La guía de brief se descarga localmente, sin suscripción ni almacenamiento de los datos del visitante.

Los proyectos, clientes, cifras y premios son contenido conceptual de muestra. Sustitúyelos por los datos reales del estudio antes de presentar la página como portafolio comercial. Las descripciones de proyecto están en `dist/app.js` y las tarjetas en `dist/index.html`.

Incluye vistas de proyecto, archivo filtrable, servicios desplegables, contadores, navegación por anclas, modales accesibles y soporte de movimiento reducido.

## Verificación

`npm run check` comprueba la sintaxis de JavaScript. La interfaz se revisó a 390, 768, 1024 y 1440 píxeles, junto con el archivo, las vistas de proyecto, los servicios y las descargas.
