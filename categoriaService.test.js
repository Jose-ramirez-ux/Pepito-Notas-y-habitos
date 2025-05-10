const { agregarCategoria } = require('./categoriaService');

describe('agregarCategoria', () => {
  test('agrega nueva categoría si no existe', () => {
    const resultado = agregarCategoria(['Trabajo'], 'Personal');
    expect(resultado).toContain('Personal');
    expect(resultado.length).toBe(2);
  });

  test('no agrega categoría repetida', () => {
    const resultado = agregarCategoria(['Trabajo'], 'Trabajo');
    expect(resultado).toEqual(['Trabajo']);
  });

  test('ignora categorías vacías o inválidas', () => {
    const resultado = agregarCategoria(['Trabajo'], '');
    expect(resultado).toEqual(['Trabajo']);
  });
});