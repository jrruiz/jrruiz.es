---
title: "JavaScript: el objeto arguments"
date: 2015-07-14
tags: javascript, functions
template: post.html
---

# JavaScript: el objeto arguments

El objeto `arguments` es una variable local que tienen todas las funciones. Este objeto contiene todos los argumentos que se han pasado a la función, incluso los que no se han declarado como parámetros. Es un objeto parecido a un array, pero no es un objeto de tipo array. Lo que comparte con los arrays es que se accede a sus elementos usando un índice numérico que empieza en `0` y una propiedad `length` para saber cuántos elementos tiene.

El objeto `arguments` se puede usar para crear funciones con un número indeterminado de parámetros.

    function getTotalPoints() {
      var total = 0;

      for (var i = 0, len = arguments.length; i < len; i++) {
        total += arguments[i];
      }

      return total;
    }

    getTotalPoints(31, 23, 15, 44, 22); // 135
    getTotalPoints(25, 17, 31); // 73

La función `getTotalPoints` no tiene ningún parámetro definido. Usa el objeto `arguments` para recoger cualquier número de argumentos que se le pasen y operar con ellos.

Se puede usar el método `apply`, para pasar un array como argumentos de la función. El ejemplo anterior usando `apply` quedaría así.

    var player1Points = [31, 23, 15, 44, 22];
    var player2Points = [25, 17, 31];

    function getTotalPoints() {
      var total = 0;

      for (var i = 0, len = arguments.length; i < len; i++) {
        total += arguments[i];
      }

      return total;
    }

    getTotalPoints.apply(null, player1Points); // 135
    getTotalPoints.apply(null, player2Points); // 73

Aunque el objeto `arguments` no sea un array, se puede convertir en un objeto de este tipo si se necesita usar alguno de sus métodos. Una forma de hacerlo es llamando al método `slice` del objeto `Array`. Cuando se llama al método `slice` sin argumentos, crea una copia del array que llama al método.

    function getTotalPoints() {
      var total = 0;
      var args = Array.prototype.slice.call(arguments);

      for (var i = 0, len = args.length; i < len; i++) {
        total += args[i];
      }

      return total;
    }

En este ejemplo la función `getTotalPoints` crea un array a partir del objeto `arguments`. Como el objeto `arguments` no es un array, hay que llamar al método `slice` del prototipo del objeto `Array` asignándole `arguments` como `this`.

Usar el método `slice` en el objeto `arguments` puede provocar problemas de rendimiento en algunos intérpretes de JavaScript. Para evitar esto, se puede crear un nuevo array iterando sobre todos los elementos de `arguments` usando un bucle.

    function createArrayFromArguments(args) {
      var len = args.length;
      var trueArray = new Array(len);

      for (var i = 0; i < len; i++) {
        trueArray[i] = args[i];
      }

      return trueArray;
    }

    function getTotalPoints() {
      var total = 0;
      var args = createArrayFromArguments(arguments);

      for (var i = 0, len = args.length; i < len; i++) {
        total += args[i];
      }

      return total;
    }

La función `createArrayFromArguments` recibe el objeto `arguments` de otra función y lo devuelve transformado en array. Para hacer la transformación usa el constructor de arrays y le pasa el número de elementos que tiene el parámetro `args`. Después recorre todos los elementos del parámetro `args` asignándoselos a la variable `trueArray`, que es la que devuelve.

Hay que evitar modificar el objeto `arguments`, porque en algunos motores de JavaScript, si se modifica algún elemento de `arguments`, también se modifica el parámetro al que representa.

    function getTotalPoints(playerName) {
      var total = 0;

      arguments[0] = 0;

      for (var i = 0, len = arguments.length; i < len; i++) {
        total += arguments[i];
      }

      return playerName + ': ' + total + ' points';
    }

    getTotalPoints('Kevin Durant', 31, 23, 15, 44, 22); // '0: 135 points'

Esto pasa porque `arguments` no es una copia de los parámetros de la función. En realidad, los parámetros comparten la referencia de los elementos de `arguments`. Se puede evitar esto si se usa el modo estricto dentro de la función. En este caso los parámetros no compartirán la referencia con los elementos de `arguments`.

Para evitar estos problemas cuando se vaya a modificar el objeto `arguments`, es mejor convetirlo antes en un array.

## Fuentes

* [https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
* [Javascript: The good parts](http://www.amazon.es/JavaScript-Parts-Working-Shallow-Grain/dp/0596517742/)
