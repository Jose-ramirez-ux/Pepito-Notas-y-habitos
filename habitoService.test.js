const { crearHabito } = require('./habitoService');

describe('crearHabito', () => {
  test('crea un hábito válido', () => {
    const habito = crearHabito('Leer');
    expect(habito.nombre).toBe('Leer');
    expect(habito.completado).toBe(false);
    expect(habito.id).toBeDefined();
  });

  test('devuelve null si el nombre está vacío', () => {
    expect(crearHabito('')).toBeNull();
  });

  test('devuelve null si no es un string válido', () => {
    expect(crearHabito(123)).toBeNull();
    expect(crearHabito(null)).toBeNull();
  });
});