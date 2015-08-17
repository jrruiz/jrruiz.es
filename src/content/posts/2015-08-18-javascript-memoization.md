---
title: "JavaScript: memoización"
date: 2015-08-18
draft: true
tags: javascript, functions
template: post.html
---

# JavaScript: memoización

La memoización es una técnica para mejorar el rendimiento de una función. Consiste en cachear los resultados que devuelve la función. Así cuando la función se llama por segunda vez usando los mismos argumentos, el resultado estará cacheado y la ejecución será mucho más rápida.

Se puede usar un objeto de JavaScript como caché. El objeto caché usa como índice el valor que ha recibido la función como parámetro. El valor de cada índice es el resultado que va a devolver la función.

    function factorial(x) {
      var total = 1;

      if (x > 1) {
        total = x * factorial(x - 1);
      }

      return total;
    }

La función `factorial` es una función recursiva que calcula el factorial de un número positivo. El factorial de `x` se calcula multiplicando todos los números desde el 1 hasta `x`. Por ejemplo, el factorial de 4 es `1 * 2 * 3 * 4`. La función anterior memoizada sería así.

    function factorial(x) {
      if (!(x in factorial.cache)) {
        factorial.cache[x] = 1;

        if (x > 1) {
          factorial.cache[x] = x * factorial(x - 1);
        }
      }

      return factorial.cache[x];
    }

    factorial.cache = {};

En esta versión, la función `factorial` usa la propiedad `cache` para almacenar el resultado que va a devolver. Ahora cuando se llame a esta función con un argumento que ya se ha usado antes, el resultado estará cacheado y la ejecución será más rápida porque no hay que calcular de nuevo el resultado.

Si la función espera más de un argumento, se puede memoizar usando el método `JSON.stringify` sobre el objeto `arguments` para obtener el índice de la caché.

    function myFunction(x, y) {
      var cacheIndex = JSON.stringify(arguments);

      if (!(cacheIndex in myFunction.cache)) {
        // ... heavy processing code
        myFunction.cache[cacheIndex] = result;
      }

      return myFunction.cache[cacheIndex];
    }

    myFunction.cache = {};

En este ejemplo, la función `myFunction` recibe dos parámetros y ejecuta un código muy pesado para obtener el resultado. Para usar la memoización, se convierte el objeto arguments en un string JSON. Este estring JSON es el que se usa como índice de la caché para almacenar el resultado de la función.

Se pueden aprovechar las closures y las funciones de orden superior de JavaScript para hacer una función que reciba otra función como parámetro y la devuelva memoizada. Un ejemplo de como se puede implementar esta función puede ser el siguiente.

    function memoize(fn) {
      var cache = {};
      var arraySlice = Array.prototype.slice;

      return function() {
        var cacheIndex = JSON.stringify(arguments);
        var args;

        if (!(cacheIndex in cache)) {
          args = arraySlice(arguments);
          cache[cacheIndex] = fn.apply(null, args);
        }

        return cache[cacheIndex];
      };
    }

<!-- Explicar lo que hace la función `memoize` -->

## Fuentes:
* [http://www.sitepoint.com/implementing-memoization-in-javascript/](http://www.sitepoint.com/implementing-memoization-in-javascript/)
* [https://en.wikipedia.org/wiki/Memoization](https://en.wikipedia.org/wiki/Memoization)
* [http://addyosmani.com/blog/faster-javascript-memoization/](http://addyosmani.com/blog/faster-javascript-memoization/)
* [https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/memoization.html](https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/memoization.html)
* [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do)
* [JavaScript: The Good Parts](http://shop.oreilly.com/product/9780596517748.do)
