function crearNota(titulo, descripcion, categoria, categorias = []) {
  if (!titulo || !descripcion || !categoria) return null;

  const nuevaCategoria = !categorias.includes(categoria) ? [...categorias, categoria] : categorias;

  const nota = {
    id: Date.now(),
    titulo,
    descripcion,
    categoria,
    fecha: new Date().toLocaleDateString()
  };

  return { nota, categoriasActualizadas: nuevaCategoria };
}

module.exports = { crearNota };