function filtrarNotasPorCategoria(notas, categoria) {
  if (categoria === 'todas') return notas;
  return notas.filter(n => n.categoria === categoria);
}

module.exports = { filtrarNotasPorCategoria };
