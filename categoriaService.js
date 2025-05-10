function agregarCategoria(categorias, nuevaCategoria) {
  if (!nuevaCategoria || categorias.includes(nuevaCategoria)) return categorias;
  return [...categorias, nuevaCategoria];
}

module.exports = { agregarCategoria };
