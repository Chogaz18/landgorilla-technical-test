// Generamos un array grande para las pruebas
const largeArray = Array.from({ length: 1000000 }, (_, i) => i);

// Método forEach
console.time('forEach');
let forEachSum = 0;
largeArray.forEach((num) => {
  forEachSum += num;
});
console.timeEnd('forEach');

// Método map
console.time('map');
const mapResult = largeArray.map((num) => num * 2); // Genera un nuevo array
console.timeEnd('map');

// Método reduce
console.time('reduce');
const reduceSum = largeArray.reduce((acc, num) => acc + num, 0);
console.timeEnd('reduce');

// Bucle for tradicional
console.time('for');
let forSum = 0;
for (let i = 0; i < largeArray.length; i++) {
  forSum += largeArray[i];
}
console.timeEnd('for');

// Resultados en la consola
console.log('Suma con forEach:', forEachSum);
console.log('Suma con reduce:', reduceSum);
console.log('Suma con for:', forSum);
