---
title: "JavaScript: conversión de tipos implícita"
date: 2015-07-03
tags: javascript, coercion, data types
template: post.html
---

# JavaScript: conversión de tipos implícita

## Conversión en operaciones matemáticas

En JavaScript los operadores matemáticos `-`, `*`, `/` y `%` siempre intentan convertir los datos con los que operan al tipo numérico.

    10 - '1'; // 9
    '5' * '6'; // 30
    '4' / 2; // 2
    '5' % '2'; // 1

El único operador matemático que no tiene este comportamiento, es el de suma `+`. Esto pasa porque este operador está sobrecargado para que a parte de sumar números, permita concatenar strings. Al intentar sumar un número y un string convierte el número a string y concatena los dos valores, al contrario que pasa con el resto de operadores matemáticos.

    7 + 1; // 8
    '7' + '1'; // '71'
    7 + '1'; // '71'

Este comportamiento del operador `+`, puede provocar algunos resultados inesperados cuando se suman varios valores de distinto tipo. En estos casos, JavaScript hará las operaciones de izquierda a derecha.

    1 + 1 + '2'; // '22'
    1 + '1' + '2'; // '112'
    1 + '1' + 2; // '112'

## El valor `NaN`

El valor `NaN` hace que cualquier operación matemática en la que se use, de como resultado `NaN`. Este valor también se puede obtener al operar con el valor `undefined`. El valor `NaN` es el único en JavaScript que no es igual a sí mismo.

    NaN == NaN; // false
    NaN === NaN; // false

JavaScript tiene la función `isNaN` que nos dice si el valor que se le pasa como argumento es `NaN`. El problema con esta función es que puede dar falsos positivos. Lo que hace es intentar convertir a valor numérico el parámetro que recibe. Por lo que en realidad en vez de comprobar si el valor es `NaN`, comprueba si el valor *no* se puede convertir a número.

    isNaN(NaN); // true, es NaN
    isNaN('hola'); // true, es NaN
    isNaN('1'); // false, no es NaN
    isNaN(7); // false, no es NaN

Una forma más segura de saber si un valor es realmente `NaN`, es comprobar que no es igual a sí mismo.

    var w = NaN;
    w !== w; // true, es NaN

    var x = 1;
    x !== x; // false, no es NaN

    var y = 'hola';
    y !== y; // false, no es NaN

    var z = null;
    z !== z; // false, no es NaN

## Conversión de objetos

Los objetos también pueden ser convertidos en datos de otro tipo. Todos los objetos tienen el método `toString` para obtener una representación del objeto en forma de string. También tienen el método `valueOf` que está pensado para que devuelva una representación numérica del objeto.

Cuando se usa algún objeto en una operación matemática, JavaScript llama siempre a su método `valueOf`. Se llama siempre a este método incluso cuando se usa el operador `+` para concatenar un string con un objeto. Se puede controlar lo que devuelve un objeto al llamar a su método `valueOf` sobrescribiéndolo.

    var x = { valueOf: function() { return 2; } };
    x.valueOf(); // 2
    x + '1'; // '21'
    x + 1; // 3
    x * 3; // 6

Cuando un objeto se usa en una operación matemática y su método `valueOf` no se ha sobrescrito, JavaScript utiliza el método `toString` del objeto. Por eso casi siempre que se intenta hacer alguna operación matemática con un objeto, se obtiene el string `'[object Object]'` como valor.

    var x = {};
    x + 1; // '[object Object]1'
    x + '1'; // '[object Object]1'
    x + 'example'; // '[object Object]example'
    x * '1'; // NaN
    x * 1; // NaN

## Conversión a booleano

Cuando se hace una comprobación para saber si un valor es verdadero o falso, JavaScript interpreta la mayoría de los valores como verdaderos. Lo únicos valores que se interpretan como falsos son: `false`, `0`, `-0`, `''`, `null`, `undefined` y `NaN`.

Teniendo esto en cuenta, no se pueden hacer evaluaciones fiables comprobando si el valor es interpretado como verdadero o falso. Un ejemplo donde podría haber un comportamiento extraño es el siguiente:

    function getPoint(x, y) {
      if (!x) {
        x = 100;
      }

      if (!y) {
        y = 100;
      }

      return { x: x, y: y };
    }

    getPoint(0, 256); // { x: 100, y: 256 }

Como el valor `0` es interpretado como falso, usando la función `getPoint`, no se puede obtener un punto con alguna coordenada que tenga el valor `0`. Es más seguro comprobar si el tipo de dato del parámetro es `undefined` que comprobar si se interpreta como falso.

    function getPoint(x, y) {
      if (typeof x === 'undefined') {
        x = 100;
      }

      if (typeof y === 'undefined') {
        y = 100;
      }

      return { x: x, y: y };
    }

    getPoint(0, 256); // { x: 0, y: 256 }
    getPoint(); // { x: 100, y: 100 }

Otra forma de saber si un dato es `undefined`, es comparando directamente con el valor `undefined`:

    if (x === undefined) { /* ... */ }

## Fuentes:
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
