// Ejemplo: Entendiendo los Closures
function basicClosure() {
    let count = 0;
    return function incrementar() {
      count++;
      console.log(`Contador: ${count}`);
    };
}
  
const increaseCounter = basicClosure();
increaseCounter(); // Contador: 1
increaseCounter(); // Contador: 2
  
// Ejemplo: Fuga de Memoria Causada por un Closure
function createMemoryLeak() {
    const bigArray = new Array(1000000).fill('fuga'); 
    return function () {
        console.log(`Accediendo al bigArray: ${bigArray.length}`);
    };
}
  
const memoryLeakClosure = createMemoryLeak(); 
// El closure retiene una referencia al bigArray
// Aunque el bigArray ya no es necesario, no se libera de la memoria
memoryLeakClosure(); 
  
// Solución: Resolver la Fuga de Memoria
function solveMemoryLeak() {
    const bigArray = new Array(1000000).fill('fuga');
    const releaseMemory = () => {
        bigArray = null; 
        console.log('El arreglo grande ha sido liberado de la memoria.');
    };
    return {
        logArray: () => console.log(`Tamaño del arreglo: ${bigArray?.length || 0}`),
        releaseMemory,
    };
}

const memoryManagement = solveMemoryLeak();
// Ver el tamaño del arreglo antes de liberar la memoria
memoryManagement.logArray(); // Tamaño del arreglo: 1000000
// Liberar la memoria ocupada por el arreglo grande
memoryManagement.releaseMemory(); // El arreglo grande ha sido liberado de la memoria
// Intentar acceder al arreglo después de liberar memoria
memoryManagement.logArray();
  