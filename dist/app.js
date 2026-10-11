const CONTACT_EMAIL = 'fractal@gmail.com';
const projects = {
  zenith: { title: 'Zenith Motors', category: 'Identidad de marca · 2026', filter: 'brand', description: 'Una exploración de identidad para una marca automotriz que mira hacia adelante. Una tipografía contundente, un lenguaje visual sobrio y una dirección fotográfica que convierten la precisión mecánica en emoción. La propuesta une carácter, velocidad y claridad en cada aplicación.', deliverables: ['Estrategia de marca', 'Identidad visual', 'Dirección de arte', 'Guía de marca'] },
  growth: { title: 'Growth Analytics', category: 'Diseño de producto · 2026', filter: 'digital', description: 'Un concepto de plataforma de analítica diseñado para reducir el ruido. El dashboard concentra la información esencial, ordena la jerarquía de los datos y utiliza un único acento para señalar lo que importa. Un sistema de componentes consistente conecta la visión general con cada detalle.', deliverables: ['UX / UI', 'Dashboard', 'Design system', 'Prototipo interactivo'] },
  halcyon: { title: 'Halcyon Architecture', category: 'Experiencia editorial · 2025', filter: 'digital', description: 'Una experiencia editorial para un estudio de arquitectura imaginario. El espacio en blanco, la fotografía a gran escala y la tipografía expresiva crean un recorrido pausado por sus proyectos. Una web concebida como una extensión de los espacios que presenta.', deliverables: ['Dirección de arte', 'Diseño web', 'Experiencia editorial', 'Responsive design'] },
  peachnest: { title: 'Peachnest', category: 'E-commerce · 2025', filter: 'digital', description: 'Un concepto de e-commerce para objetos cotidianos con intención. La identidad cercana y las composiciones de producto transforman el catálogo en una experiencia de descubrimiento. Una dirección visual que da protagonismo a los materiales, las formas y las pequeñas cosas.', deliverables: ['Identidad visual', 'Diseño de tienda', 'Dirección fotográfica', 'Experiencia de compra'] }
};
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let returnFocus;
function openDialog(dialog) {
  returnFocus = document.activeElement;
  $$('dialog[open]').forEach(item => item.close());
  dialog.showModal();
}
$$('dialog').forEach(dialog => {
  $('[data-close]', dialog)?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]') && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
});
function showProject(key) {
  const project = projects[key];
  if (!project) return;
  $('#project-title').textContent = project.title;
  $('#project-category').textContent = project.category;
  $('#project-description').textContent = project.description;
  $('#project-deliverables').replaceChildren(...project.deliverables.map(label => { const span = document.createElement('span'); span.textContent = label; return span; }));
  const visual = $(`[data-project="${key}"] .work-visual`).cloneNode(true);
  $$('.card-meta', visual).forEach(node => node.remove());
  const chart = $('svg', visual);
  if (chart) { const gradient = $('linearGradient', chart); gradient.id = 'dialogChartFill'; $('path', chart).setAttribute('fill', 'url(#dialogChartFill)'); }
  $('#project-image').replaceChildren(visual);
  openDialog($('#project-dialog'));
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => showProject(button.dataset.project)));
function renderArchive(filter = 'all') {
  const items = Object.entries(projects).filter(([, project]) => filter === 'all' || project.filter === filter).map(([key, project]) => {
    const button = document.createElement('button'); button.type = 'button';
    const index = document.createElement('span'); index.className = 'archive-item-index'; index.textContent = '0' + (Object.keys(projects).indexOf(key) + 1);
    const title = document.createElement('span'); title.className = 'archive-item-title'; title.textContent = project.title;
    const category = document.createElement('span'); category.className = 'archive-item-category'; category.textContent = project.category;
    const arrow = document.createElement('span'); arrow.className = 'archive-item-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true');
    button.append(index, title, category, arrow); button.addEventListener('click', () => showProject(key)); return button;
  });
  $('#archive-list').replaceChildren(...items);
}
$('#open-archive').addEventListener('click', () => { renderArchive('all'); $$('[data-filter]').forEach(button => { button.classList.toggle('active', button.dataset.filter === 'all'); button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')); }); openDialog($('#archive-dialog')); });
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  renderArchive(button.dataset.filter);
}));
function setService(row, expanded) {
  row.setAttribute('aria-expanded', String(expanded)); document.getElementById(row.getAttribute('aria-controls')).hidden = !expanded;
}
$$('.svc-row').forEach(row => row.addEventListener('click', () => { const next = row.getAttribute('aria-expanded') !== 'true'; $$('.svc-row').forEach(item => setService(item, item === row && next)); }));
$$('[data-service-link]').forEach(link => link.addEventListener('click', () => { const row = $('.svc-row', $(link.getAttribute('href'))); $$('.svc-row').forEach(item => setService(item, item === row)); }));
$$('[data-contact]').forEach(button => button.addEventListener('click', () => {
  if (button.dataset.intro) $('#contact-form select').value = 'Una primera conversación';
  else { const service = button.closest('.service-item'); if (service) $('#contact-form select').value = $('.svc-title', service).textContent; }
  openDialog($('#contact-dialog'));
}));
const contactForm = $('#contact-form');
$('#contact-form-note').textContent = `Cuéntanos tu idea. Prepararemos un correo para ${CONTACT_EMAIL}.`;
$('#contact-submit').innerHTML = 'Preparar mi correo <iconify-icon icon="lucide:arrow-up-right" aria-hidden="true"></iconify-icon>';
$('#contact-disclaimer').textContent = 'Se abrirá tu aplicación de correo. Podrás revisar el mensaje antes de enviarlo.';
const downloadButton = document.createElement('button'); downloadButton.type = 'button'; downloadButton.className = 'form-download'; downloadButton.textContent = 'También puedes descargar tu consulta';
contactForm.append(downloadButton);
function briefText() {
  const data = new FormData(contactForm);
  return `FRACTALX — NUEVO PROYECTO\n\nNombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nServicio: ${data.get('service') || 'Por definir'}\n\nLa idea:\n${data.get('message')}\n\nContacto del estudio: ${CONTACT_EMAIL}\n`;
}
function downloadText(text, filename) {
  const blob = new Blob(['\ufeff', text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 3000);
}
let toastTimer;
function toast(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 5000); }
contactForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const subject = `Nuevo proyecto FractalX — ${data.get('name')}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText())}`;
  $('#contact-disclaimer').textContent = 'Si no se abrió tu aplicación de correo, descarga tu consulta y envíala a ' + CONTACT_EMAIL + '.';
});
downloadButton.addEventListener('click', () => { if (!contactForm.reportValidity()) return; downloadText(briefText(), 'mi-proyecto-fractalx.txt'); toast('Tu consulta está lista para compartir con FractalX.'); });
$('#newsletter-form').addEventListener('submit', event => {
  event.preventDefault(); const email = $('#newsletter-email').value;
  const guide = `FRACTALX — EL PRIMER PASO\nGuía para un buen brief creativo\n\nPreparado para: ${email}\n\n01 — TU MARCA\n¿Cómo se llama tu marca? ¿Qué hace y qué la hace diferente?\n\n02 — TU AUDIENCIA\n¿Para quién diseñas? ¿Qué necesita esa persona?\n\n03 — EL OBJETIVO\n¿Qué quieres lograr con este proyecto? Define un resultado concreto.\n\n04 — EL ALCANCE\n¿Qué necesitas: identidad, web, producto digital o una campaña?\n\n05 — LA DIRECCIÓN\nComparte tres referencias. ¿Qué te gusta de cada una?\n\n06 — EL CONTEXTO\n¿Cuál es tu presupuesto aproximado y cuándo necesitas lanzar?\n\n¿Listo para empezar?\nEscríbenos a ${CONTACT_EMAIL}\n\nIdeas sin límites. Diseño con impacto.\n`;
  downloadText(guide, 'guia-de-brief-fractalx.txt'); toast('Tu guía se ha descargado. ¡Démosle forma a esa idea!');
});
const legal = {
  privacy: { title: 'Privacidad', paragraphs: ['Esta página es una propuesta visual del estudio FractalX. Los formularios preparan archivos en tu dispositivo o un borrador en tu aplicación de correo; no envían tus datos a un servidor ni crean una suscripción.', 'El correo que escribes para la guía solo se utiliza para personalizar tu descarga. No se guarda en el navegador. Las fuentes, los iconos y Tailwind se cargan desde proveedores externos, que reciben los datos técnicos habituales de una conexión web.', 'Si envías una consulta por correo, su tratamiento dependerá del servicio de correo utilizado. Para consultas sobre tus datos, contacta con ' + CONTACT_EMAIL + '.'] },
  terms: { title: 'Términos de la propuesta', paragraphs: ['Los proyectos, clientes, reconocimientos y cifras presentados son contenido ilustrativo para mostrar la dirección creativa de FractalX; no representan colaboraciones o resultados verificados del estudio.', 'Los contenidos de esta propuesta no constituyen una oferta contractual. El alcance, precio y calendario de un proyecto se acordarán directamente con el estudio.', 'El logotipo de FractalX se utiliza a partir del archivo proporcionado por su titular. Las fotografías de referencia proceden de Unsplash. Para hablar de un proyecto, escribe a ' + CONTACT_EMAIL + '.'] }
};
$$('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const copy = legal[button.dataset.legal]; $('#legal-title').textContent = copy.title;
  $('#legal-content').replaceChildren(...copy.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; })); openDialog($('#legal-dialog'));
}));
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = Number(entry.target.dataset.counter); const start = performance.now();
    const step = now => { const p = Math.min((now - start) / 1050, 1); entry.target.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); observer.unobserve(entry.target);
  }), { threshold: .6 });
  $$('[data-counter]').forEach(counter => observer.observe(counter));
}
