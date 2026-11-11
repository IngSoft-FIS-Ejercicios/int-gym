# Ejercicio Gimnasio

## Objetivos
- Implementar nuevas funciones de lógica de dominio
- Codificar test unitarios en paralelo a la implementación
- Usar buenas prácticas de codificacion
- Modificar la interfaz de usuario para usar las nuevas funciones

### Aspectos a tener en cuenta
- Los comentarios `// TODO` deben ser reemplazados por código para implementar las nuevas funciones.
- Puede agregar nuevas funciones y tests, así como agregar parámetros en funciones existentes.
- Si necesita realizar supuestos sobre la implementación, agregue comentarios para explicarlos.
- Los test unitarios se deben codificar en los archivos correspondientes `*.test.ts`.
- La cobertura de los test unitarios debe alcanzar 100 % de sentencias y ramas.
- Ejecute el linter con `npm run lint` para eliminar errores y warnings.
- Verifique que `npm run build` no muestre errores de TypeScript.

> Recuerde al finalizar cada parte:
> - realizar commit / push
> - subir un issue con screenshots

### Parte A
1. En la clase `Member` implementar el campo `discount`, un porcentaje de descuento sobre la cuota: entero entre 0 y 100, con valor 0 por defecto. Modificar `toString()` para que, solo cuando el descuento sea mayor que 0, lo muestre (por ejemplo: `Descuento: 10%`). Codificar tests, incluyendo casos de error.
2. En la clase `MemberList` implementar `totalDiscounted()`, que devuelve la suma de las cuotas de todos los socios con su descuento aplicado. Por ejemplo, una cuota de 1000 con 10% de descuento y otra de 500 sin descuento suman 1400. Codificar sus tests.
3. En la clase `MemberList` implementar `updateFee(documentId, fee)`, que cambia la cuota del socio con ese documento y lanza un `Error` si no existe. Codificar sus tests.

Subir un issue 'Parte A' con screenshot de la terminal con el resumen de tests y cobertura.

### Parte B
4. Agregar un campo "Descuento (%)" en el formulario del panel "Nuevo socio" y un total "Total con descuento" en el panel "Inicio". Si el campo se deja vacío, el descuento es 0.
5. Usar el componente badge de Bootstrap para mostrar el plan en la card de cada socio, en lugar de mostrarlo en el contenido de la card.
6. Completar el `// TODO` de `createFeeEditor` en `main.ts` para que el botón "Guardar cuota" de cada card edite la cuota del socio y actualice el listado y los totales. Si la cuota no es válida, agregar la clase `is-invalid` al campo.

Subir un issue 'Parte B' con screenshot de la página (paneles Inicio y Socios).

### Referencias y recursos útiles

- [ESLint](https://eslint.org/docs/latest/rules/)
- [Prettier](https://prettier.io/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vitest](https://vitest.dev/guide/)
- [Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
- [HTML](https://www.w3schools.com/html/)
