const { filtrarNotasPorCategoria } = require('./filtroNotasService');


describe('filtrarNotasPorCategoria', () => {
  const notas = [
    { titulo: '1', categoria: 'Trabajo' },
    { titulo: '2', categoria: 'Personal' }
  ];

  test('devuelve todas si se selecciona "todas"', () => {
    const resultado = filtrarNotasPorCategoria(notas, 'todas');
    expect(resultado.length).toBe(2);
  });

  test('filtra por categoría específica', () => {
    const resultado = filtrarNotasPorCategoria(notas, 'Trabajo');
    expect(resultado).toEqual([{ titulo: '1', categoria: 'Trabajo' }]);
  });

  test('devuelve array vacío si no hay coincidencias', () => {
    const resultado = filtrarNotasPorCategoria(notas, 'Salud');
    expect(resultado.length).toBe(0);
  });
});