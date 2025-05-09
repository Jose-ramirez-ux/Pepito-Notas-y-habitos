// Variables para la sección de hábitos
let habitos = [];

// Variables para la sección de notas
let categorias = [];
let notas = [];

// Elementos del DOM - Modales
const modalNota = document.getElementById('modal-nota');
const modalHabito = document.getElementById('modal-habito');
const botonesAgregarNota = document.getElementById('agregar-nota-btn');
const botonesAgregarHabito = document.getElementById('agregar-habito-btn');
const botonesCerrarModal = document.querySelectorAll('.cerrar-modal');
const botonGuardarNota = document.getElementById('guardar-nota');
const botonGuardarHabito = document.getElementById('guardar-habito');

// Elementos del DOM - Hábitos
const inputHabito = document.getElementById('nuevo-habito');
const listaHabitos = document.getElementById('lista-habitos');
const mensajeFelicitacion = document.getElementById('mensaje-felicitacion');

// Elementos del DOM - Notas
const inputTitulo = document.getElementById('titulo');
const inputDescripcion = document.getElementById('descripcion');
const selectCategoria = document.getElementById('categoria');
const inputNuevaCategoria = document.getElementById('nueva-categoria');
const filtroNotas = document.getElementById('filtro-notas');
const contenedorNotas = document.getElementById('contenedor-notas');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  // Cargar datos guardados
  cargarHabitos();
  cargarNotas();
  cargarCategorias();
  
  // Configurar eventos para modales
  configurarModales();
  
  // Configurar eventos para formularios
  configurarFormularios();
});

// Configurar eventos para modales
function configurarModales() {
  // Abrir modal de nota
  botonesAgregarNota.addEventListener('click', () => {
    modalNota.style.display = 'block';
  });
  
  // Abrir modal de hábito
  botonesAgregarHabito.addEventListener('click', () => {
    modalHabito.style.display = 'block';
  });
  
  // Cerrar modales
  botonesCerrarModal.forEach(boton => {
    boton.addEventListener('click', () => {
      modalNota.style.display = 'none';
      modalHabito.style.display = 'none';
      limpiarFormularios();
    });
  });
  
  // Cerrar modales al hacer clic fuera
  window.addEventListener('click', (e) => {
    if (e.target === modalNota) modalNota.style.display = 'none';
    if (e.target === modalHabito) modalHabito.style.display = 'none';
  });
}

// Configurar eventos para formularios
function configurarFormularios() {
  // Guardar nota
  botonGuardarNota.addEventListener('click', agregarNota);
  
  // Guardar hábito
  botonGuardarHabito.addEventListener('click', agregarHabito);
  
  // Filtrar notas por categoría
  filtroNotas.addEventListener('change', () => {
    mostrarNotas(filtroNotas.value);
  });
}

// Limpiar formularios
function limpiarFormularios() {
  inputTitulo.value = '';
  inputDescripcion.value = '';
  selectCategoria.value = '';
  inputNuevaCategoria.value = '';
  inputHabito.value = '';
}

// FUNCIONES PARA HÁBITOS

// Agregar un nuevo hábito
function agregarHabito() {
  const nombre = inputHabito.value.trim();

  if (!nombre) {
    alert('Por favor escribe un nombre para el hábito.');
    return;
  }

  const habito = {
    id: Date.now(),
    nombre: nombre,
    completado: false
  };

  habitos.push(habito);
  inputHabito.value = '';
  modalHabito.style.display = 'none';
  
  guardarHabitos();
  mostrarHabitos();
}

// Mostrar lista de hábitos
function mostrarHabitos() {
  listaHabitos.innerHTML = '';
  
  let todosCompletados = habitos.length > 0;
  
  habitos.forEach(h => {
    if (!h.completado) todosCompletados = false;
    
    const div = document.createElement('div');
    div.className = 'habito';
    
    const label = document.createElement('label');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = h.completado;
    checkbox.addEventListener('change', () => {
      h.completado = checkbox.checked;
      guardarHabitos();
      mostrarHabitos();
    });
    
    const span = document.createElement('span');
    span.textContent = h.nombre;
    
    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'eliminar-habito';
    btnEliminar.innerHTML = '&times;';
    btnEliminar.title = 'Eliminar hábito';
    btnEliminar.addEventListener('click', () => {
      habitos = habitos.filter(habito => habito.id !== h.id);
      guardarHabitos();
      mostrarHabitos();
    });
    
    label.appendChild(checkbox);
    label.appendChild(span);
    div.appendChild(label);
    div.appendChild(btnEliminar);
    listaHabitos.appendChild(div);
  });
  
  // Mostrar mensaje de felicitación si todos los hábitos están completados
  if (habitos.length > 0 && todosCompletados) {
    mensajeFelicitacion.classList.remove('hidden');
  } else {
    mensajeFelicitacion.classList.add('hidden');
  }
}

// Guardar hábitos en localStorage
function guardarHabitos() {
  localStorage.setItem('habitos', JSON.stringify(habitos));
}

// Cargar hábitos desde localStorage
function cargarHabitos() {
  const habitosGuardados = localStorage.getItem('habitos');
  if (habitosGuardados) {
    habitos = JSON.parse(habitosGuardados);
    mostrarHabitos();
  }
}

// FUNCIONES PARA NOTAS

// Cargar categorías
function cargarCategorias() {
  const categoriasGuardadas = localStorage.getItem('categorias');
  if (categoriasGuardadas) {
    categorias = JSON.parse(categoriasGuardadas);
    actualizarCategorias();
  }
}

// Actualizar listas de categorías
function actualizarCategorias() {
  // Limpiar selectores
  selectCategoria.innerHTML = '<option value="" disabled selected>Selecciona una categoría</option>';
  filtroNotas.innerHTML = '<option value="todas">Todas las notas</option>';

  // Actualizar las opciones con las categorías disponibles
  categorias.forEach(cat => {
    // Para el selector de categoría en el formulario
    const option1 = document.createElement('option');
    option1.value = cat;
    option1.textContent = cat;
    selectCategoria.appendChild(option1);

    // Para el filtro de notas
    const option2 = document.createElement('option');
    option2.value = cat;
    option2.textContent = cat;
    filtroNotas.appendChild(option2);
  });

  // Guardar en localStorage
  guardarCategorias();
}

// Agregar una nueva nota
function agregarNota() {
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();
  const categoriaSeleccionada = selectCategoria.value;
  const nuevaCategoria = inputNuevaCategoria.value.trim();

  if (!titulo || !descripcion || (!categoriaSeleccionada && !nuevaCategoria)) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  let categoriaFinal = categoriaSeleccionada;
  if (nuevaCategoria) {
    if (!categorias.includes(nuevaCategoria)) {
      categorias.push(nuevaCategoria);
    }
    categoriaFinal = nuevaCategoria;
    inputNuevaCategoria.value = '';
    actualizarCategorias();
  }

  // Crear objeto de nota
  const nota = {
    id: Date.now(),
    titulo,
    descripcion,
    categoria: categoriaFinal,
    fecha: new Date().toLocaleDateString()
  };

  notas.push(nota);
  limpiarFormularios();
  modalNota.style.display = 'none';

  // Guardar en localStorage
  guardarNotas();
  mostrarNotas();
}

// Mostrar notas (filtradas por categoría si se especifica)
function mostrarNotas(categoria = 'todas') {
  contenedorNotas.innerHTML = '';
  
  // Filtrar las notas según la categoría seleccionada
  const notasFiltradas = categoria === 'todas' 
    ? notas 
    : notas.filter(nota => nota.categoria === categoria);

  notasFiltradas.forEach(nota => {
    const div = document.createElement('div');
    div.className = 'nota';
    
    // Formatear el contenido de la nota
    let contenido = `<h3>${nota.titulo}</h3>`;
    
    // Verificar si la descripción parece una lista
    if (nota.descripcion.includes('- ') || nota.descripcion.includes('* ')) {
      // Convertir texto con viñetas a HTML con lista
      const lineas = nota.descripcion.split('\n');
      const listaHTML = lineas.map(linea => {
        if (linea.trim().startsWith('- ') || linea.trim().startsWith('* ')) {
          return `<li>${linea.trim().substring(2)}</li>`;
        }
        return linea;
      }).join('');
      
      if (listaHTML.includes('<li>')) {
        contenido += `<ul>${listaHTML}</ul>`;
      } else {
        contenido += `<p>${nota.descripcion}</p>`;
      }
    } else {
      contenido += `<p>${nota.descripcion}</p>`;
    }
    
    // Añadir pie de nota con categoría y fecha
    contenido += `
      <div class="nota-footer">
        <span>Categoría: ${nota.categoria}</span>
        <span>${nota.fecha}</span>
      </div>
      <div class="acciones">
        <button class="eliminar-nota">Eliminar</button>
      </div>
    `;
    
    div.innerHTML = contenido;
    
    // Configurar botón eliminar
    div.querySelector('.eliminar-nota').addEventListener('click', () => {
      notas = notas.filter(n => n.id !== nota.id);
      guardarNotas();
      mostrarNotas(filtroNotas.value);
    });
    
    contenedorNotas.appendChild(div);
  });
}

// Guardar notas en localStorage
function guardarNotas() {
  localStorage.setItem('notas', JSON.stringify(notas));
}

// Guardar categorías en localStorage
function guardarCategorias() {
  localStorage.setItem('categorias', JSON.stringify(categorias));
}

// Cargar notas desde localStorage
function cargarNotas() {
  const notasGuardadas = localStorage.getItem('notas');
  if (notasGuardadas) {
    notas = JSON.parse(notasGuardadas);
    mostrarNotas();
  }
}