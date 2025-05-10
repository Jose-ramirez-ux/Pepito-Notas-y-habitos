function crearHabito(nombre) {
  if (!nombre || typeof nombre !== 'string' || !nombre.trim()) return null;

  return {
    id: Date.now(),
    nombre: nombre.trim(),
    completado: false
  };
}

module.exports = { crearHabito };
