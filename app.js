// ==============================================================
// PERFILES DE PRUEBA POR NIVEL DE CUOTA / CARENCIA
// ==============================================================
const PERFILES_DEMO = {
  sincuota: {
    key: 'sincuota',
    nombre: 'Carlos Rodríguez',
    dni: '29.410.882',
    cuotas: 0,
    lenteEstado: '⏸️ Pedido en pausa por cuota pendiente de débito',
    notificacionesExtra: [
      {
        id: 201,
        tipo: 'falta de pago',
        titulo: '⚠️ Aviso importante: Falta de pago de cuota mensual',
        mensaje: 'No pudimos procesar el débito de tu cuota ($120.000). Regularizala con Botón de Pago MP, DEBIN o solicitando un cobro sin costo para no perder tus carencias.',
        fecha: 'Hace 10 min',
        unread: true,
        icon: 'alert-triangle',
        color: '#ef4444'
      }
    ]
  },
  cuota1: {
    key: 'cuota1',
    nombre: 'Lucía Peralta',
    dni: '38.901.445',
    cuotas: 1,
    lenteEstado: '⏳ En carencia (Se habilita con tu 2° cuota paga)',
    notificacionesExtra: [
      {
        id: 202,
        tipo: 'servicio',
        titulo: '¡Ya tenés Telemedicina 24hs y Protección AP habilitados!',
        mensaje: 'Con tu 1° cuota paga ya contás con Guardia Médica 24 hs sin límite, Accidentes Personales ($5.400.000), Fracturas y Asistencia Legal.',
        fecha: 'Hoy',
        unread: true,
        icon: 'check-circle-2',
        color: '#10b981'
      }
    ]
  },
  cuota2: {
    key: 'cuota2',
    nombre: 'Martín Gómez',
    dni: '34.892.104',
    cuotas: 2,
    lenteEstado: '✨ ¡Ya está tu lente listo para retirar en sucursal!',
    notificacionesExtra: []
  },
  cuota3: {
    key: 'cuota3',
    nombre: 'Valeria Sosa',
    dni: '31.552.719',
    cuotas: 3,
    lenteEstado: '✨ ¡Ya está tu lente listo para retirar en sucursal!',
    notificacionesExtra: [
      {
        id: 203,
        tipo: 'servicio',
        titulo: '¡Nuevas coberturas desbloqueadas con tu 3° cuota!',
        mensaje: 'Ya tenés habilitadas Operaciones en el Aparato de la Visión ($295.000), Diagnóstico de Cáncer ($810.000) y Enfermedades Críticas ($590.000).',
        fecha: 'Ayer',
        unread: true,
        icon: 'shield-check',
        color: '#093642'
      }
    ]
  },
  cuota6: {
    key: 'cuota6',
    nombre: 'Roberto Domínguez',
    dni: '24.718.903',
    cuotas: 6,
    lenteEstado: '✨ ¡Ya está tu lente listo para retirar en sucursal!',
    notificacionesExtra: [
      {
        id: 204,
        tipo: 'servicio',
        titulo: '🎉 ¡Cobertura Total 100% Habilitada (6 cuotas)!',
        mensaje: 'Cumpliste todas las carencias del Plan Flex, incluyendo Ayuda Económica por Fallecimiento (AEF $260.000), GPL Med, GPL Visión y Protección GPL.',
        fecha: 'Hoy',
        unread: true,
        icon: 'award',
        color: '#10b981'
      }
    ]
  }
};

// ==============================================================
// ESTADO GLOBAL DEL PROTOTIPO APP CLIENTES GPL
// ==============================================================
const state = {
  perfilActual: PERFILES_DEMO.cuota2,
  cuotasPagas: 2,
  loginMode: 'dni',
  userEmail: '',
  currentServiceFilter: 'all',
  currentCatalogFilter: 'todos',
  adherentes: [
    { id: 1, nombre: 'Laura Fernández', dni: '36.112.980', edad: 38, tipo: 'Adherente 1 (14 a 75 años)', monto: 40000, costo: '$40.000', cobertura: 'Protección GPL, Telemedicina, GPL Med' },
    { id: 2, nombre: 'Mateo Gómez', dni: '52.410.332', edad: 9, tipo: 'Adherente 2 (<14 o >75 años)', monto: 30000, costo: '$30.000', cobertura: 'AEF, Telemedicina, GPL Med' }
  ],
  recetaDigital: {
    armazon: 'Milano Noir',
    od: '+1.75 esf',
    oi: '+1.50 esf',
    profesional: 'Dr. Ricardo Méndez (M.P. 41892) • Cristales Antirreflex',
    fechaCarga: '28/10/2026',
    archivoNombre: 'receta_oftalmologica_gpl.jpg',
    imagenDataUrl: ''
  },
  notificacionesBase: [
    {
      id: 100,
      tipo: 'pago de cuota',
      titulo: '💳 Recordatorio: Aboná tu cuota mensual del Plan Flex',
      mensaje: 'Pagá tu cuota desde la app con Botón de Mercado Pago, autogestión de DEBIN o solicitando un cobro sin costo para mantener tus servicios activos y sumar antigüedad de carencia.',
      fecha: 'Ahora',
      unread: true,
      icon: 'credit-card',
      color: '#ef4444',
      actionTarget: 'pagos',
      actionLabel: 'Ir a Pagar Cuota →'
    },
    {
      id: 101,
      tipo: 'optica',
      titulo: '¡Ya está tu lente listo para retirar en sucursal!',
      mensaje: 'Tu anteojo recetado #OPT-884 (Armazón Milano Noir) ya se encuentra disponible para retirar en Sucursal GPL Centro.',
      fecha: 'Hace 15 min',
      unread: true,
      icon: 'glasses',
      color: '#10b981',
      actionTarget: 'optica',
      actionLabel: 'Ver Seguimiento Óptica →'
    },
    {
      id: 102,
      tipo: 'promociones',
      titulo: 'Promoción Referidos GPL: ¡Descuentos en tu cuota!',
      mensaje: 'Recomendá GPL a tus amigos o familiares y sumá descuentos por referidos en tu cuota mensual.',
      fecha: 'Ayer',
      unread: true,
      icon: 'gift',
      color: '#73174E'
    },
    {
      id: 103,
      tipo: 'fechas especiales',
      titulo: 'Beneficio en Fechas Especiales + Nuevos Servicios',
      mensaje: 'Este mes contás con chequeo oftalmológico y nuevas especialidades en Telemedicina programada.',
      fecha: 'Hace 3 días',
      unread: true,
      icon: 'sparkles',
      color: '#093642'
    }
  ]
};

// ==============================================================
// MATRIZ OFICIAL DE SERVICIOS Y CARENCIAS (SEGÚN IMÁGENES GPL)
// ==============================================================
const SERVICIOS_GPL = [
  // --- GPL MED ---
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Telemedicina',
    nombre: 'Telemedicina GPL Grupo Pro Líder (Guardia 24hs + 13 Especialidades)',
    carenciaRequerida: 1,
    montoMaximo: 'SIN LÍMITE',
    eventos: 'Guardia 24hs (Clínica/Pediatría) y Turnos Programados sin límite'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Asistencia Salud',
    nombre: 'Central de Turnos (Clínica, Traumatología, Cardiología, Ginecología, Pediatría, Psicología)',
    carenciaRequerida: 2,
    montoMaximo: 'Sin límite',
    eventos: 'Hasta 3 eventos mensuales'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Asistencia Salud',
    nombre: 'Ortopedia por accidente',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $77.000',
    eventos: 'Hasta 2 eventos al año'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Farmacia',
    nombre: 'Descuento en Farmacia (lesiones súbitas) hasta 40%',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $25.000 por receta',
    eventos: '3 eventos al año (3 recetas al año)'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Estudios',
    nombre: 'Exámenes de laboratorio (sangre y orina completos)',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $87.000',
    eventos: '3 eventos al año'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Diagnóstico',
    nombre: 'Radiografía general (cualquier parte del cuerpo)',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $77.000',
    eventos: '3 eventos al año'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Cardiología',
    nombre: 'Ecocardiograma con Doppler',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $77.000',
    eventos: '1 evento al año'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Cardiología',
    nombre: 'Electrocardiograma + informe',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $87.000',
    eventos: '1 evento al año'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Diagnóstico',
    nombre: 'Ecografías - Mamografías',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $87.000',
    eventos: '3 eventos al año'
  },
  {
    categoria: 'gplmed',
    catLabel: 'GPL MED • Salud Mental',
    nombre: 'Asistencia psicológica',
    carenciaRequerida: 2,
    montoMaximo: 'Sin límite',
    eventos: '12 sesiones al año (hasta 1 por mes)'
  },

  // --- GPL VISIÓN ---
  {
    categoria: 'vision',
    catLabel: 'GPL VISIÓN • Óptica',
    nombre: 'Anteojos recetados (Lentes y armazones al 100%)',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta +10/-10 • Hasta $127.500',
    eventos: '1 evento al año'
  },
  {
    categoria: 'vision',
    catLabel: 'GPL VISIÓN • Consultas',
    nombre: 'Atención oftalmológica programada',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $77.000',
    eventos: 'Hasta 3 eventos mensuales'
  },
  {
    categoria: 'vision',
    catLabel: 'GPL VISIÓN • Estudios',
    nombre: 'Estudio oftalmológico',
    carenciaRequerida: 2,
    montoMaximo: 'Hasta $77.000',
    eventos: '1 evento al año'
  },
  {
    categoria: 'vision',
    catLabel: 'GPL VISIÓN • Cirugía',
    nombre: 'Salud: Operaciones en el aparato de la visión',
    carenciaRequerida: 3,
    montoMaximo: '$295.000',
    eventos: 'Cobertura quirúrgica oftalmológica'
  },

  // --- PROTECCIÓN GPL ---
  {
    categoria: 'proteccion',
    catLabel: 'PROTECCIÓN GPL • Accidentes',
    nombre: 'Accidentes Personales (AP): Fallecimiento o Incapacidad Total/Permanente',
    carenciaRequerida: 1,
    montoMaximo: '$5.400.000',
    eventos: 'Cobertura desde 1° cuota paga'
  },
  {
    categoria: 'proteccion',
    catLabel: 'PROTECCIÓN GPL • Traumatología',
    nombre: 'Fractura de Huesos (Cadera, Cráneo, Fémur, Húmero, Antebrazo, Muñeca, Vértebra)',
    carenciaRequerida: 1,
    montoMaximo: 'Suma máx: $400.000 ($60k a $240k según hueso)',
    eventos: 'Indemnización por fractura'
  },
  {
    categoria: 'proteccion',
    catLabel: 'PROTECCIÓN GPL • Legal',
    nombre: 'Asistencia legal civil',
    carenciaRequerida: 1,
    montoMaximo: 'Sin límite',
    eventos: '12 eventos al año'
  },
  {
    categoria: 'proteccion',
    catLabel: 'PROTECCIÓN GPL • Alta Complejidad',
    nombre: 'Salud: Diagnóstico de Cáncer',
    carenciaRequerida: 3,
    montoMaximo: '$810.000',
    eventos: 'Cobertura indemnizatoria'
  },
  {
    categoria: 'proteccion',
    catLabel: 'PROTECCIÓN GPL • Alta Complejidad',
    nombre: 'Salud: Enfermedades Críticas (Infarto, Apoplejía, Insuf. Renal, By-pass, Trasplante, Esclerosis, Distrofia, Parálisis)',
    carenciaRequerida: 3,
    montoMaximo: '$590.000',
    eventos: 'Cobertura indemnizatoria'
  },
  {
    categoria: 'proteccion',
    catLabel: 'PROTECCIÓN GPL • AEF',
    nombre: 'Ayuda Económica por Fallecimiento (AEF)',
    carenciaRequerida: 6,
    montoMaximo: '$260.000',
    eventos: 'Habilitado con 6 cuotas pagas'
  }
];

// ==============================================================
// CATÁLOGO DE ÓPTICA GPL VISIÓN
// ==============================================================
const CATALOGO_OPTICA = [
  { id: 'OPT-01', nombre: 'Milano Noir', tipo: 'recetados', etiqueta: 'Recetado', material: 'Acetato Italiano • Negro Mate', color: '#093642' },
  { id: 'OPT-02', nombre: 'Verona Classic', tipo: 'filtroazul', etiqueta: 'Filtro Azul', material: 'Metal Liviano • Dorado/Habano', color: '#73174E' },
  { id: 'OPT-03', nombre: 'Torino Flex', tipo: 'recetados', etiqueta: 'Recetado', material: 'TR90 Flexible • Azul Petróleo', color: '#0c586c' },
  { id: 'OPT-04', nombre: 'Roma Executive', tipo: 'bifocal', etiqueta: 'Multifocal', material: 'Titanio • Apto altas graduaciones (+10/-10)', color: '#334155' },
  { id: 'OPT-05', nombre: 'Siena Crystal', tipo: 'filtroazul', etiqueta: 'Filtro Azul', material: 'Acetato Cristal • Antirreflex', color: '#64748b' },
  { id: 'OPT-06', nombre: 'Bari Urban', tipo: 'bifocal', etiqueta: 'Multifocal', material: 'Aro Completo • Borgoña GPL', color: '#73174E' }
];

// ==============================================================
// INICIALIZACIÓN Y REGISTRO DE PWA (SERVICE WORKER + INSTALACIÓN)
// ==============================================================
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPwaPrompt = e;
  const cta = document.getElementById('pwaBannerCta');
  const sub = document.getElementById('pwaBannerSub');
  if (cta) cta.textContent = 'Instalar ya';
  if (sub) sub.textContent = 'Lista para instalar con 1 toque sin bordes de Google';
});

window.addEventListener('appinstalled', () => {
  deferredPwaPrompt = null;
  const loginBtn = document.getElementById('btnInstallPwaLogin');
  const headerBtn = document.getElementById('btnInstallPwaHeader');
  if (loginBtn) loginBtn.classList.add('hidden');
  if (headerBtn) headerBtn.classList.add('hidden');
  showToast('🎉 ¡App Clientes GPL instalada! Buscala en tu pantalla de inicio o cajón de apps.');
});

async function triggerInstallPWA() {
  if (deferredPwaPrompt) {
    try {
      deferredPwaPrompt.prompt();
      const choice = await deferredPwaPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('📲 Instalando App Clientes GPL...');
      }
      deferredPwaPrompt = null;
      return;
    } catch (err) {
      deferredPwaPrompt = null;
    }
  }
  openModal('modalInstallPWA');
}

async function resetAndReloadPWA() {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) {
        await reg.unregister();
      }
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      for (const k of keys) {
        await caches.delete(k);
      }
    }
    showToast('🔄 Instalador limpio. Recargando...');
    setTimeout(() => {
      window.location.reload();
    }, 900);
  } catch (e) {
    window.location.reload();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then((reg) => {
      reg.update();
    }).catch(() => {});
  }
  lucide.createIcons();
  renderAllDynamicViews();
});

function formatARS(num) {
  return '$' + Number(num || 0).toLocaleString('es-AR');
}

function getCuotaTotalMensual() {
  const baseTitular = 50000;
  const sumaAdherentes = state.adherentes.reduce((acc, a) => acc + (a.monto || (a.edad >= 14 && a.edad <= 75 ? 40000 : 30000)), 0);
  return baseTitular + sumaAdherentes;
}

function updateBillingCalculations() {
  const total = getCuotaTotalMensual();
  const feeMP = Math.round(total * 0.065);
  const totalMP = total + feeMP;

  // 1. Desglose en vista Pagos
  const rowsContainer = document.getElementById('billingBreakdownRows');
  if (rowsContainer) {
    const adhRows = state.adherentes.map(a => {
      const esAdh1 = a.edad >= 14 && a.edad <= 75;
      const catLabel = esAdh1 ? 'Adherente 1' : 'Adherente 2';
      return `
        <div class="billing-row">
          <span>${catLabel}: ${a.nombre} (${a.edad} años)</span>
          <strong>${formatARS(a.monto)}</strong>
        </div>
      `;
    }).join('');

    rowsContainer.innerHTML = `
      <div class="billing-row">
        <span>Titular: ${state.perfilActual.nombre} (18 a 75 años)</span>
        <strong>$50.000</strong>
      </div>
      ${adhRows}
    `;
  }

  // 2. Totales en tarjetas y botones de Pagos
  const billingTotalEl = document.getElementById('billingTotalAmount');
  if (billingTotalEl) billingTotalEl.textContent = formatARS(total);

  const btnOpenMP = document.getElementById('btnOpenMP');
  if (btnOpenMP) btnOpenMP.textContent = `Abonar con Mercado Pago (${formatARS(total)} + costo MP)`;

  const btnOpenDebin = document.getElementById('btnOpenDebin');
  if (btnOpenDebin) btnOpenDebin.textContent = `Autogestionar DEBIN (${formatARS(total)})`;

  const btnSolicitarCobro = document.getElementById('btnSolicitarCobro');
  if (btnSolicitarCobro) btnSolicitarCobro.textContent = `Solicitar un Cobro Sin Costo (${formatARS(total)})`;

  // 3. Modales de Mercado Pago y DEBIN
  const mpBase = document.getElementById('mpBaseAmount');
  const mpFee = document.getElementById('mpFeeAmount');
  const mpFinal = document.getElementById('mpFinalAmount');
  const debinBase = document.getElementById('debinBaseAmount');
  if (mpBase) mpBase.textContent = formatARS(total);
  if (mpFee) mpFee.textContent = formatARS(feeMP);
  if (mpFinal) mpFinal.textContent = formatARS(totalMP);
  if (debinBase) debinBase.textContent = formatARS(total);

  // 4. Barra de total en vivo en pestaña CAC
  const cacTotalBadge = document.getElementById('cacTotalAmountBadge');
  const cacCountLabel = document.getElementById('cacAdherentesCountLabel');
  if (cacTotalBadge) cacTotalBadge.textContent = formatARS(total);
  if (cacCountLabel) {
    const n = state.adherentes.length;
    cacCountLabel.textContent = n === 0
      ? 'Solo Titular ($50.000)'
      : `Titular ($50.000) + ${n} ${n === 1 ? 'adherente' : 'adherentes'}`;
  }
}

function renderAllDynamicViews() {
  updateBillingCalculations();
  updateHeaderAndHome();
  renderServicesList();
  renderSavedReceta();
  renderCatalog();
  renderPaymentHistory();
  renderAdherentes();
  renderNotifications();
  lucide.createIcons();
}

// ==============================================================
// LOGIN POR USUARIO DE PRUEBA (sincuota, cuota1, cuota2, cuota3, cuota6) O DNI / EMAIL
// ==============================================================
function switchLoginMode(mode) {
  state.loginMode = mode;
  document.getElementById('modeDniBtn').classList.toggle('active', mode === 'dni');
  document.getElementById('modeEmailBtn').classList.toggle('active', mode === 'email');
  document.getElementById('dniInputGroup').classList.toggle('hidden', mode !== 'dni');
  document.getElementById('emailInputGroup').classList.toggle('hidden', mode !== 'email');
}

function resolveUserInput(rawInput) {
  const clean = (rawInput || '').toLowerCase().replace(/\s+/g, '');
  if (clean === 'sincuota' || clean === 'cuota0' || clean === '0') return PERFILES_DEMO.sincuota;
  if (clean === 'cuota1' || clean === '1') return PERFILES_DEMO.cuota1;
  if (clean === 'cuota2' || clean === '2') return PERFILES_DEMO.cuota2;
  if (clean === 'cuota3' || clean === '3') return PERFILES_DEMO.cuota3;
  if (clean === 'cuota6' || clean === '6') return PERFILES_DEMO.cuota6;

  // Si ingresó un DNI numérico cualquiera, entra como Titular con 2 cuotas por defecto
  return {
    key: 'custom',
    nombre: 'Martín Gómez',
    dni: rawInput,
    cuotas: 2,
    lenteEstado: '✨ ¡Ya está tu lente listo para retirar en sucursal!',
    notificacionesExtra: []
  };
}

function quickLoginUser(userKey) {
  const perfil = PERFILES_DEMO[userKey] || PERFILES_DEMO.cuota2;
  state.perfilActual = perfil;
  state.cuotasPagas = perfil.cuotas;
  state.userEmail = '';

  const loginInput = document.getElementById('loginDni');
  if (loginInput) loginInput.value = userKey;

  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-login').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');

  renderAllDynamicViews();
  navigateTo('home');

  if (perfil.cuotas === 0) {
    showToast(`⚠️ Ingresaste como "${userKey}" (Sin cuota al día)`);
    setTimeout(() => triggerPushDemo('pago'), 700);
  } else {
    showToast(`✅ Ingresaste como "${userKey}" (${perfil.cuotas} ${perfil.cuotas === 1 ? 'cuota paga' : 'cuotas pagas'})`);
  }
}

function handleLogin(e) {
  e.preventDefault();
  if (state.loginMode === 'email') {
    const emailVal = document.getElementById('loginEmail').value.trim();
    if (!emailVal) {
      showToast('Ingresá tu correo electrónico para vincularlo a tu DNI');
      return;
    }
    state.userEmail = emailVal;
    state.perfilActual = PERFILES_DEMO.cuota2;
    state.cuotasPagas = 2;
    document.getElementById('emailCaptureCard').classList.add('hidden');
    showToast('¡Email registrado en la base de GPL! Bienvenido/a.');
  } else {
    const rawVal = document.getElementById('loginDni').value.trim();
    const perfil = resolveUserInput(rawVal);
    state.perfilActual = perfil;
    state.cuotasPagas = perfil.cuotas;
  }

  document.getElementById('screen-login').classList.remove('active');
  document.getElementById('screen-login').classList.add('hidden');
  document.getElementById('app-shell').classList.remove('hidden');

  renderAllDynamicViews();
  if (state.cuotasPagas === 0) {
    setTimeout(() => triggerPushDemo('pago'), 700);
  }
}

function saveUserEmail(e) {
  e.preventDefault();
  const mail = document.getElementById('newEmailInput').value.trim();
  if (!mail) return;
  state.userEmail = mail;
  document.getElementById('headerIdDisplay').textContent = mail;
  const captureBanner = document.getElementById('emailCaptureCard');
  if (captureBanner) captureBanner.classList.add('hidden');
  closeModal('modalVincularMail');
  showToast(`✅ Email (${mail}) guardado en la base de datos de GPL.`);
}

function logoutApp() {
  document.getElementById('app-shell').classList.add('hidden');
  document.getElementById('screen-login').classList.remove('hidden');
  document.getElementById('screen-login').classList.add('active');
}

// ==============================================================
// NAVEGACIÓN ENTRE PESTAÑAS
// ==============================================================
function navigateTo(viewId) {
  document.querySelectorAll('.app-view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === viewId);
  });

  document.getElementById('mainScroll').scrollTop = 0;
  lucide.createIcons();
}

function openServiceTab(cat) {
  navigateTo('servicios');
  const buttons = document.querySelectorAll('.tabs-pills .tab-pill');
  buttons.forEach(b => {
    const match = (cat === 'all' && b.textContent.includes('Todos')) ||
                  (cat === 'gplmed' && b.textContent.includes('Med')) ||
                  (cat === 'vision' && b.textContent.includes('Visión')) ||
                  (cat === 'proteccion' && b.textContent.includes('Protección'));
    b.classList.toggle('active', match);
  });
  state.currentServiceFilter = cat;
  renderServicesList();
}

// ==============================================================
// ACTUALIZACIÓN DE CABECERA Y ESTADOS SEGÚN CUOTAS DEL USUARIO
// ==============================================================
function updateHeaderAndHome() {
  const c = state.cuotasPagas;
  const p = state.perfilActual;

  document.getElementById('userNameDisplay').textContent = p.nombre;
  document.getElementById('headerIdDisplay').textContent = state.userEmail || `DNI ${p.dni} (${p.key})`;
  const modalDni = document.getElementById('modalDniReadonly');
  if (modalDni) modalDni.value = p.dni;

  const banner = document.getElementById('statusBanner');
  const tag = document.getElementById('homeStatusTag');
  const title = document.getElementById('homeCuotasTitle');
  const desc = document.getElementById('homeCuotasDesc');
  const servCount = document.getElementById('servCuotasCount');
  const opticaBadge = document.getElementById('opticaCarenciaBadge');
  const homeOpticaStep = document.getElementById('homeOpticaStep');

  if (homeOpticaStep) homeOpticaStep.textContent = p.lenteEstado;
  if (servCount) servCount.textContent = `${c} ${c === 1 ? 'cuota paga' : 'cuotas pagas'}`;

  if (c === 0) {
    banner.className = 'status-card status-danger';
    tag.textContent = 'FALTA DE PAGO • USUARIO SINCUOTA';
    title.textContent = '0 Cuotas al Día (Impago)';
    desc.textContent = 'No registramos el débito de tu cuota. Regularizala desde Pagos para reactivar tus servicios.';
    if (opticaBadge) {
      opticaBadge.className = 'status-pill-lock';
      opticaBadge.textContent = 'Suspendido por falta de pago';
    }
  } else {
    banner.className = 'status-card status-ok';
    tag.textContent = `SERVICIOS ACTIVOS • USUARIO ${p.key.toUpperCase()}`;
    title.textContent = `${c} ${c === 1 ? 'Cuota Paga Acreditada' : 'Cuotas Pagas Acreditadas'}`;
    desc.textContent = c >= 6
      ? `Cuota actual: ${formatARS(getCuotaTotalMensual())}/mes • ¡Tenés el 100% de los servicios habilitados!`
      : `Tu débito mensual (${formatARS(getCuotaTotalMensual())}) ingresó correctamente y mantenés tus servicios activos.`;

    if (opticaBadge) {
      if (c >= 2) {
        opticaBadge.className = 'status-pill-ok';
        opticaBadge.textContent = `Habilitado (${c}/2 cuotas)`;
      } else {
        opticaBadge.className = 'status-pill-wait';
        opticaBadge.textContent = `En carencia (${c}/2 cuotas)`;
      }
    }
  }
}

function filterServices(cat, btnEl) {
  state.currentServiceFilter = cat;
  document.querySelectorAll('.tabs-pills .tab-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderServicesList();
}

function renderServicesList() {
  const container = document.getElementById('servicesListContainer');
  if (!container) return;

  const c = state.cuotasPagas;
  const list = SERVICIOS_GPL.filter(s =>
    state.currentServiceFilter === 'all' ? true : s.categoria === state.currentServiceFilter
  );

  container.innerHTML = list.map(s => {
    let statusClass = 'status-pill-ok';
    let statusText = 'Habilitado';
    let barColor = '#10b981';
    const progressPct = Math.min(100, Math.round((c / s.carenciaRequerida) * 100));

    if (c === 0) {
      statusClass = 'status-pill-lock';
      statusText = 'Cuota Impaga';
      barColor = '#ef4444';
    } else if (c < s.carenciaRequerida) {
      const faltan = s.carenciaRequerida - c;
      statusClass = 'status-pill-wait';
      statusText = `Falta${faltan > 1 ? 'n' : ''} ${faltan} cuota${faltan > 1 ? 's' : ''} (${c}/${s.carenciaRequerida})`;
      barColor = '#f59e0b';
    }

    return `
      <div class="service-item-card">
        <div class="service-top">
          <div>
            <span class="service-cat-tag">${s.catLabel}</span>
            <h4>${s.nombre}</h4>
          </div>
          <span class="${statusClass}">${statusText}</span>
        </div>
        <div class="service-meta-grid">
          <div>
            <span>Monto Máximo / Tope</span>
            <strong>${s.montoMaximo}</strong>
          </div>
          <div>
            <span>Eventos / Carencia</span>
            <strong>${s.eventos} (${s.carenciaRequerida} ${s.carenciaRequerida === 1 ? 'cuota' : 'cuotas'})</strong>
          </div>
        </div>
        <div class="carencia-bar-wrap">
          <div class="carencia-bar-track">
            <div class="carencia-bar-fill" style="width:${progressPct}%; background:${barColor}"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==============================================================
// CATÁLOGO DE ÓPTICA Y RECETA OFTALMOLÓGICA DIGITAL GUARDADA
// ==============================================================
function renderSavedReceta() {
  const container = document.getElementById('savedRecetaContainer');
  if (!container) return;

  const r = state.recetaDigital;
  const frameTitle = document.getElementById('opticaSelectedFrameTitle');
  const step1Desc = document.getElementById('opticaStep1Desc');

  if (frameTitle) frameTitle.textContent = `Armazón ${r.armazon} + Cristales Recetados`;
  if (step1Desc) step1Desc.textContent = `Receta digital guardada (OD ${r.od} / OI ${r.oi})`;

  const thumbHtml = r.imagenDataUrl
    ? `<img src="${r.imagenDataUrl}" alt="Receta Digital" />`
    : `<i data-lucide="file-text" style="width:22px;height:22px;color:#093642;margin-bottom:3px"></i><span>RECETA<br/>DIGITAL</span>`;

  container.innerHTML = `
    <div class="receta-digital-card">
      <div class="receta-thumb" onclick="openRecetaModal()" style="cursor:pointer" title="Ver o cambiar receta">
        ${thumbHtml}
      </div>
      <div class="receta-details">
        <strong>${r.archivoNombre}</strong>
        <span>${r.profesional}</span>
        <div class="receta-badges-row">
          <span class="receta-pill valid">✓ Guardada (${r.fechaCarga})</span>
          <span class="receta-pill">OD: ${r.od}</span>
          <span class="receta-pill">OI: ${r.oi}</span>
          <span class="receta-pill">Armazón: ${r.armazon}</span>
        </div>
      </div>
    </div>
  `;
}

function openRecetaModal(nombreArmazon) {
  if (nombreArmazon) {
    state.recetaDigital.armazon = nombreArmazon;
  }
  const armInput = document.getElementById('recetaArmazonInput');
  if (armInput) armInput.value = `${state.recetaDigital.armazon} (Seleccionado en Catálogo)`;

  const odInput = document.getElementById('recetaOD');
  const oiInput = document.getElementById('recetaOI');
  const docInput = document.getElementById('recetaDoctor');
  if (odInput) odInput.value = state.recetaDigital.od;
  if (oiInput) oiInput.value = state.recetaDigital.oi;
  if (docInput) docInput.value = state.recetaDigital.profesional;

  openModal('modalRecetaOptica');
}

function handleRecetaFileChange(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  state.recetaDigital.archivoNombre = file.name;
  const fileNameEl = document.getElementById('recetaFileName');
  const previewBox = document.getElementById('recetaPreviewBox');
  const previewImg = document.getElementById('recetaPreviewImg');
  const dropTitle = document.getElementById('uploadDropTitle');

  if (fileNameEl) fileNameEl.textContent = file.name;
  if (dropTitle) dropTitle.textContent = `Archivo cargado: ${file.name}`;

  if (file.type && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      state.recetaDigital.imagenDataUrl = evt.target.result;
      if (previewImg) previewImg.src = evt.target.result;
      if (previewBox) previewBox.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    state.recetaDigital.imagenDataUrl = '';
    if (previewBox) previewBox.classList.remove('hidden');
  }
}

function guardarRecetaDigital(e) {
  e.preventDefault();
  const od = document.getElementById('recetaOD').value.trim();
  const oi = document.getElementById('recetaOI').value.trim();
  const prof = document.getElementById('recetaDoctor').value.trim();

  state.recetaDigital.od = od || '+1.75 esf';
  state.recetaDigital.oi = oi || '+1.50 esf';
  state.recetaDigital.profesional = prof || 'Receta Oftalmológica Validada';

  const hoy = new Date();
  state.recetaDigital.fechaCarga = hoy.toLocaleDateString('es-AR');

  closeModal('modalRecetaOptica');
  renderAllDynamicViews();
  showToast(`✅ Receta digital guardada junto a tu armazón "${state.recetaDigital.armazon}".`);
}

function filterCatalog(tipo, btnEl) {
  state.currentCatalogFilter = tipo;
  document.querySelectorAll('.catalog-filters .cat-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  const items = CATALOGO_OPTICA.filter(item =>
    state.currentCatalogFilter === 'todos' ? true : item.tipo === state.currentCatalogFilter
  );

  grid.innerHTML = items.map(item => {
    const isSelected = state.recetaDigital.armazon === item.nombre;
    return `
      <div class="frame-card" style="${isSelected ? 'border: 2px solid #73174E;' : ''}">
        <div class="frame-visual">
          <span class="frame-tag">${item.etiqueta}</span>
          <svg class="frame-svg" viewBox="0 0 120 45" fill="none" stroke="${item.color}" stroke-width="4">
            <rect x="8" y="8" width="42" height="28" rx="10" fill="rgba(255,255,255,0.6)"/>
            <rect x="70" y="8" width="42" height="28" rx="10" fill="rgba(255,255,255,0.6)"/>
            <path d="M50 18 Q60 12 70 18" />
            <path d="M2 16 L8 14" />
            <path d="M112 14 L118 16" />
          </svg>
        </div>
        <div class="frame-info">
          <h4>${item.nombre}</h4>
          <p>${item.material}</p>
        </div>
        <div class="frame-cov">100% Cubierto (Tope $127.500)</div>
        <button class="btn-primary btn-block" style="padding:8px; font-size:12px" onclick="seleccionarLente('${item.nombre}')">
          ${isSelected ? '✓ Seleccionado (Subir Receta)' : 'Elegir y Subir Receta'}
        </button>
      </div>
    `;
  }).join('');
}

function seleccionarLente(nombre) {
  if (state.cuotasPagas < 2) {
    showToast('⚠️ Anteojos recetados requiere 2 cuotas pagas de carencia.');
    return;
  }
  openRecetaModal(nombre);
}

// ==============================================================
// HISTORIAL Y GESTIÓN DE PAGOS
// ==============================================================
function renderPaymentHistory() {
  const listEl = document.getElementById('paymentHistoryList');
  if (!listEl) return;

  const montoActual = formatARS(getCuotaTotalMensual());
  const c = state.cuotasPagas;
  if (c === 0) {
    listEl.innerHTML = `
      <div class="history-item" style="border-left: 4px solid #ef4444">
        <div class="history-left">
          <strong>Noviembre 2026 • Cuota N° 1</strong>
          <span>Débito rechazado • Falta de pago</span>
        </div>
        <div class="history-right">
          <strong style="color:#ef4444">${montoActual}</strong>
          <span class="status-pill-lock">Impago</span>
        </div>
      </div>
    `;
    return;
  }

  const meses = ['Noviembre 2026', 'Octubre 2026', 'Septiembre 2026', 'Agosto 2026', 'Julio 2026', 'Junio 2026'];
  const rows = [];
  for (let i = 0; i < Math.min(c, meses.length); i++) {
    rows.push(`
      <div class="history-item">
        <div class="history-left">
          <strong>${meses[i]} • Cuota N° ${c - i}</strong>
          <span>Débito CBU comprobado • Suma carencia</span>
        </div>
        <div class="history-right">
          <strong>${montoActual}</strong>
          <span class="status-pill-ok">Debitado OK</span>
        </div>
      </div>
    `);
  }
  listEl.innerHTML = rows.join('');
}

function confirmarPagoDemo(metodo) {
  closeModal('modalPagoMP');
  closeModal('modalDebin');
  const total = getCuotaTotalMensual();
  const importe = metodo.includes('Mercado Pago')
    ? formatARS(total + Math.round(total * 0.065))
    : formatARS(total);
  state.cuotasPagas += 1;
  renderAllDynamicViews();
  showToast(`✅ Pago de ${importe} acreditado vía ${metodo}. ¡Ahora tenés ${state.cuotasPagas} cuota(s)!`);
}

function solicitarCobroSinCosto() {
  showToast(`📩 Solicitud de cobro SIN COSTO por ${formatARS(getCuotaTotalMensual())} enviada a Cobranzas GPL.`);
}

// ==============================================================
// CAC: MODIFICACIÓN DE DATOS Y ADHERENTES (SUMA Y RESTA SEGÚN EDAD)
// ==============================================================
function renderAdherentes() {
  const container = document.getElementById('adherentesList');
  if (!container) return;

  if (state.adherentes.length === 0) {
    container.innerHTML = `
      <div class="adherente-card">
        <div class="adherente-info">
          <strong>Sin adherentes adicionales</strong>
          <span>Solo se abona la cuota del Titular ($50.000)</span>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = state.adherentes.map(a => `
    <div class="adherente-card">
      <div class="adherente-info">
        <strong>${a.nombre} (${a.edad} años • DNI ${a.dni})</strong>
        <span>${a.tipo} • <strong>+${formatARS(a.monto)}/mes</strong></span>
      </div>
      <div class="adherente-actions">
        <button class="btn-icon-mini" onclick="abrirEditarAdherente(${a.id})">Edad / Modificar</button>
        <button class="btn-icon-mini danger" onclick="eliminarAdherente(${a.id})">Quitar (-${formatARS(a.monto)})</button>
      </div>
    </div>
  `).join('');
}

function eliminarAdherente(id) {
  const target = state.adherentes.find(a => a.id === id);
  const restado = target ? target.monto : 0;
  const nombre = target ? target.nombre : 'Adherente';

  state.adherentes = state.adherentes.filter(a => a.id !== id);
  renderAllDynamicViews();
  showToast(`➖ Se quitó a ${nombre}: se restaron ${formatARS(restado)}. Nuevo total: ${formatARS(getCuotaTotalMensual())}`);
}

function previewCostoPorEdad() {
  const edadInput = document.getElementById('adhEdad');
  const previewBox = document.getElementById('adhAgePreview');
  if (!edadInput || !previewBox) return;

  const val = edadInput.value.trim();
  if (!val) {
    previewBox.textContent = 'Ingresá la edad para calcular si suma $40.000 (14 a 75 años) o $30.000 (<14 o >75 años).';
    return;
  }

  const edad = Number(val);
  const esAdh1 = edad >= 14 && edad <= 75;
  const suma = esAdh1 ? 40000 : 30000;
  const nuevoTotal = getCuotaTotalMensual() + suma;

  previewBox.innerHTML = esAdh1
    ? `✅ <strong>${edad} años → Adherente 1 (14 a 75 años):</strong> Suma <strong>+$40.000</strong>. Tu cuota pasará a <strong>${formatARS(nuevoTotal)}</strong>.`
    : `✅ <strong>${edad} años → Adherente 2 (<14 o >75 años):</strong> Suma <strong>+$30.000</strong>. Tu cuota pasará a <strong>${formatARS(nuevoTotal)}</strong>.`;
}

function abrirEditarAdherente(id) {
  const adh = state.adherentes.find(a => a.id === id);
  if (!adh) return;

  const title = document.getElementById('cacModalTitle');
  const body = document.getElementById('cacModalBody');

  title.textContent = `Modificar Adherente • ${adh.nombre}`;
  body.innerHTML = `
    <p class="modal-desc">Si modificás la edad del adherente, se recalcula automáticamente su categoría (Adherente 1: $40.000 / Adherente 2: $30.000) y el importe total a abonar.</p>
    <form onsubmit="guardarEdicionAdherente(event, ${adh.id})">
      <div class="form-group">
        <label>Nombre y Apellido</label>
        <input type="text" id="editAdhNombre" value="${adh.nombre}" required />
      </div>
      <div class="form-group">
        <label>DNI del Adherente</label>
        <input type="text" id="editAdhDni" value="${adh.dni}" required />
      </div>
      <div class="form-group">
        <label>Edad (Recalcula tarifa según rango Plan Flex)</label>
        <input type="number" id="editAdhEdad" value="${adh.edad}" min="0" max="110" required />
      </div>
      <button type="submit" class="btn-primary btn-block">Guardar y Recalcular Importe</button>
    </form>
  `;
  openModal('modalCacForm');
}

function guardarEdicionAdherente(e, id) {
  e.preventDefault();
  const adh = state.adherentes.find(a => a.id === id);
  if (!adh) return;

  const nombre = document.getElementById('editAdhNombre').value.trim();
  const dni = document.getElementById('editAdhDni').value.trim();
  const edad = Number(document.getElementById('editAdhEdad').value);
  const esAdh1 = edad >= 14 && edad <= 75;

  adh.nombre = nombre;
  adh.dni = dni;
  adh.edad = edad;
  adh.monto = esAdh1 ? 40000 : 30000;
  adh.costo = formatARS(adh.monto);
  adh.tipo = esAdh1 ? 'Adherente 1 (14 a 75 años)' : 'Adherente 2 (<14 o >75 años)';
  adh.cobertura = esAdh1 ? 'Protección GPL, Telemedicina, GPL Med' : 'AEF, Telemedicina, GPL Med';

  closeModal('modalCacForm');
  renderAllDynamicViews();
  showToast(`✅ ${nombre} actualizado/a (${adh.costo}). Nuevo total a abonar: ${formatARS(getCuotaTotalMensual())}`);
}

function openCacForm(tipo) {
  const title = document.getElementById('cacModalTitle');
  const body = document.getElementById('cacModalBody');

  if (tipo === 'telefono') {
    title.textContent = 'Modificar Teléfono y Contacto';
    body.innerHTML = `
      <form onsubmit="submitCacForm(event, 'Teléfono y correo actualizados en CAC')">
        <div class="form-group">
          <label>Nuevo Nro. de Teléfono Celular</label>
          <input type="tel" value="351 684-9920" required />
        </div>
        <div class="form-group">
          <label>Correo Electrónico</label>
          <input type="email" value="${state.userEmail || 'afiliado@grupoprolider.com.ar'}" required />
        </div>
        <button type="submit" class="btn-primary btn-block">Guardar Cambios</button>
      </form>
    `;
  } else if (tipo === 'domicilio') {
    title.textContent = 'Modificar Domicilio';
    body.innerHTML = `
      <form onsubmit="submitCacForm(event, 'Nuevo domicilio enviado al CAC')">
        <div class="form-group">
          <label>Calle y Número</label>
          <input type="text" value="Av. Colón 1420 Piso 4B" required />
        </div>
        <div class="form-group">
          <label>Localidad / Provincia</label>
          <input type="text" value="Córdoba Capital" required />
        </div>
        <button type="submit" class="btn-primary btn-block">Actualizar Domicilio</button>
      </form>
    `;
  } else if (tipo === 'mediopago') {
    title.textContent = 'Modificar Medio de Pago (CBU)';
    body.innerHTML = `
      <p class="modal-desc">Importante: Cada plan corresponde a un único CBU y el titular de la solicitud debe coincidir con el titular de dicho CBU.</p>
      <form onsubmit="submitCacForm(event, 'Nuevo CBU enviado al CAC')">
        <div class="form-group">
          <label>CBU de 22 dígitos (Titular: ${state.perfilActual.nombre})</label>
          <input type="text" placeholder="0110000430000012344910" required />
        </div>
        <div class="form-group">
          <label>Banco / Entidad</label>
          <input type="text" placeholder="Ej: Banco Nación / Santander / Macro" required />
        </div>
        <button type="submit" class="btn-primary btn-block">Actualizar Medio de Pago</button>
      </form>
    `;
  } else if (tipo === 'adherente') {
    title.textContent = 'Agregar Adherente • Plan Flex';
    body.innerHTML = `
      <p class="modal-desc">De acuerdo a la edad que ingreses, se sumará automáticamente <strong>$40.000 (Adherente 1: 14 a 75 años)</strong> o <strong>$30.000 (Adherente 2: menor a 14 o mayor a 75 años)</strong> al importe mensual a abonar.</p>
      <form onsubmit="agregarAdherenteDemo(event)">
        <div class="form-group">
          <label>Nombre y Apellido</label>
          <input type="text" id="adhNombre" placeholder="Ej: Sofía Gómez" required />
        </div>
        <div class="form-group">
          <label>DNI del Adherente</label>
          <input type="text" id="adhDni" placeholder="Ej: 48.120.331" required />
        </div>
        <div class="form-group">
          <label>Edad del Adherente</label>
          <input type="number" id="adhEdad" min="0" max="110" placeholder="Ej: 12 o 35" oninput="previewCostoPorEdad()" required />
        </div>
        <div id="adhAgePreview" class="age-preview-pill">
          Ingresá la edad para calcular si suma $40.000 (14 a 75 años) o $30.000 (&lt;14 o &gt;75 años).
        </div>
        <button type="submit" class="btn-primary btn-block">Agregar y Sumar al Importe</button>
      </form>
    `;
  }

  openModal('modalCacForm');
}

function submitCacForm(e, msg) {
  e.preventDefault();
  closeModal('modalCacForm');
  showToast(`✅ ${msg}`);
}

function agregarAdherenteDemo(e) {
  e.preventDefault();
  const nombre = document.getElementById('adhNombre').value.trim();
  const dni = document.getElementById('adhDni').value.trim();
  const edad = Number(document.getElementById('adhEdad').value);
  const esAdh1 = edad >= 14 && edad <= 75;
  const monto = esAdh1 ? 40000 : 30000;

  state.adherentes.push({
    id: Date.now(),
    nombre,
    dni,
    edad,
    monto,
    tipo: esAdh1 ? 'Adherente 1 (14 a 75 años)' : 'Adherente 2 (<14 o >75 años)',
    costo: formatARS(monto),
    cobertura: esAdh1 ? 'Protección GPL, Telemedicina, GPL Med' : 'AEF, Telemedicina, GPL Med'
  });

  closeModal('modalCacForm');
  renderAllDynamicViews();
  showToast(`➕ ${nombre} (${edad} años) sumó +${formatARS(monto)}. Nuevo total a abonar: ${formatARS(getCuotaTotalMensual())}`);
}

// ==============================================================
// NOTIFICACIONES Y PUSH DEMO (AMBOS: PUSH FLOTANTE + NOTIFICACIÓN EN CAMPANITA)
// ==============================================================
function getActiveNotifications() {
  const importe = formatARS(getCuotaTotalMensual());
  // Actualiza el monto dinámico en la notificación de pago de cuota
  const base = state.notificacionesBase.map(n => {
    if (n.id === 100) {
      return {
        ...n,
        titulo: `💳 Recordatorio: Aboná tu cuota mensual (${importe})`,
        mensaje: `Pagá tu cuota de ${importe} desde la app con Botón de Mercado Pago, autogestión de DEBIN o solicitando un cobro sin costo para mantener tus servicios activos y sumar antigüedad de carencia.`
      };
    }
    return n;
  });
  const extras = (state.perfilActual && state.perfilActual.notificacionesExtra) || [];
  return [...extras, ...base];
}

function renderNotifications() {
  const listEl = document.getElementById('notificationsList');
  const badge = document.getElementById('notifBadge');
  if (!listEl) return;

  const allNotifs = getActiveNotifications();
  const unreadCount = allNotifs.filter(n => n.unread).length;
  if (badge) {
    badge.textContent = unreadCount;
    badge.classList.toggle('hidden', unreadCount === 0);
  }

  listEl.innerHTML = allNotifs.map(n => {
    const actionBtnHtml = n.actionTarget
      ? `<button type="button" class="notif-action-btn" onclick="navigateTo('${n.actionTarget}')">${n.actionLabel || 'Ver detalle →'}</button>`
      : '';
    return `
      <div class="notif-card ${n.unread ? 'unread' : ''}">
        <div class="notif-type-icon" style="background:${n.color}18; color:${n.color}">
          <i data-lucide="${n.icon}"></i>
        </div>
        <div class="notif-body">
          <div class="notif-body-top">
            <strong>${n.tipo.toUpperCase()}</strong>
            <span>${n.fecha}</span>
          </div>
          <h4>${n.titulo}</h4>
          <p>${n.mensaje}</p>
          ${actionBtnHtml}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

function markAllRead() {
  state.notificacionesBase.forEach(n => (n.unread = false));
  if (state.perfilActual && state.perfilActual.notificacionesExtra) {
    state.perfilActual.notificacionesExtra.forEach(n => (n.unread = false));
  }
  renderNotifications();
  showToast('Notificaciones marcadas como leídas.');
}

let currentPushTarget = 'pagos';

async function sendNativePushIfGranted(title, body, targetView) {
  try {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    if (Notification.permission === 'granted') {
      if ('serviceWorker' in navigator) {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          reg.showNotification(title, {
            body,
            icon: 'icon-192.png',
            badge: 'icon-192.png',
            vibrate: [200, 100, 200],
            data: { target: targetView }
          });
          return;
        }
      }
      new Notification(title, { body, icon: 'icon-192.png' });
    }
  } catch (e) {
    // Fallback silencioso al banner visual en pantalla
  }
}

function triggerPushDemo(tipo = 'pago') {
  const banner = document.getElementById('pushBanner');
  const titleEl = document.getElementById('pushTitle');
  const textEl = document.getElementById('pushText');
  const ctaEl = document.getElementById('pushCtaPill');
  const importe = formatARS(getCuotaTotalMensual());

  if (tipo === 'lente') {
    currentPushTarget = 'optica';
    titleEl.textContent = 'GPL Visión • Ahora';
    textEl.textContent = '👓 ¡Ya está tu lente listo para retirar en Sucursal GPL Centro!';
    if (ctaEl) ctaEl.textContent = 'Ver Óptica →';

    // Marca o sube la notificación en la campanita como recién llegada
    const optNotif = state.notificacionesBase.find(n => n.id === 101);
    if (optNotif) {
      optNotif.unread = true;
      optNotif.fecha = 'Justo ahora';
    }
    renderNotifications();

    sendNativePushIfGranted(
      'GPL Visión • Lente listo',
      '👓 ¡Ya está tu lente recetado listo para retirar en sucursal!',
      'optica'
    );
  } else {
    currentPushTarget = 'pagos';
    titleEl.textContent = 'GPL Cobranzas • Ahora';
    textEl.textContent = `💳 ¡Aboná tu cuota mensual (${importe})! Tocá aquí para pagar desde la app y mantener tus servicios activos.`;
    if (ctaEl) ctaEl.textContent = 'Pagar Cuota →';

    // Marca la notificación de pago en la campanita como recién llegada ("Justo ahora")
    const payNotif = state.notificacionesBase.find(n => n.id === 100);
    if (payNotif) {
      payNotif.unread = true;
      payNotif.fecha = 'Justo ahora';
    }
    renderNotifications();

    sendNativePushIfGranted(
      `GPL • Recordatorio de Pago (${importe})`,
      '💳 Aboná tu cuota mensual desde la app para mantener tus servicios activos y no perder tus carencias.',
      'pagos'
    );
  }

  banner.classList.remove('hidden');
  clearTimeout(window.__pushTimer);
  window.__pushTimer = setTimeout(() => {
    banner.classList.add('hidden');
  }, 6500);
}

function openNotificationFromPush() {
  document.getElementById('pushBanner').classList.add('hidden');
  if (!document.getElementById('app-shell').classList.contains('hidden')) {
    navigateTo(currentPushTarget || 'pagos');
  }
}

// ==============================================================
// VALORACIÓN DE ATENCIÓN Y MODALES
// ==============================================================
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
  lucide.createIcons();
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

function setStars(group, count) {
  const container = document.querySelector(`.stars-row[data-group="${group}"]`);
  if (!container) return;
  container.querySelectorAll('.star-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx < count);
  });
}

function submitValoracion(e) {
  e.preventDefault();
  closeModal('modalValoracion');
  showToast('⭐ ¡Gracias! Tu puntuación sobre la venta y el servicio fue enviada.');
}

function showToast(msg) {
  const t = document.getElementById('toastMsg');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    t.classList.add('hidden');
  }, 3400);
}
