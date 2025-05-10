const { crearNota } = require('./notaService');

describe('crearNota', () => {
  test('crea una nota válida', () => {
    const resultado = crearNota('Título', 'Contenido', 'Trabajo', []);
    expect(resultado.nota.titulo).toBe('Título');
    expect(resultado.nota.descripcion).toBe('Contenido');
    expect(resultado.nota.categoria).toBe('Trabajo');
    expect(resultado.categoriasActualizadas).toContain('Trabajo');
  });

  test('no crea nota si falta título', () => {
    const resultado = crearNota('', 'Texto', 'Personal', []);
    expect(resultado).toBeNull();
  });

  test('agrega categoría nueva si no existe', () => {
    const resultado = crearNota('Hola', 'Texto', 'NuevaCat', ['Personal']);
    expect(resultado.categoriasActualizadas).toContain('NuevaCat');
  });

  test('no repite categoría existente', () => {
    const resultado = crearNota('Hola', 'Texto', 'Personal', ['Personal']);
    expect(resultado.categoriasActualizadas.length).toBe(1);
  });
});