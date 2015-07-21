---
title: "JavaScript: diferencias entre llamadas a funciones, métodos y constructores"
date: 2015-07-12
tags: javascript, functions
template: post.html
---

# JavaScript: diferencias entre llamadas a funciones, métodos y constructores

Las funciones de JavaScript se pueden llamar de tres formas distintas. Como funciones normales, como métodos y como constructores.

El uso más común es el de llamarlas como funciones.

    function f(x, y) {
      return x + y;
    }

    f(1, 2); // 3

Este caso de uso es el más simple. Lo único que hace es llamar a la función `f`, pasándole como argumentos los valores `1` y `2` que se enlazarán con los parámetros `x` e `y` de la función.

Los métodos son funciones que se asignan como propiedad de un objeto. Las funciones se pueden asignar como métodos usando expresiones de función o pasándo la referencia de una función ya declarada.

    var player = {
      getName: function() {
        return this.name;
      },

      name: 'Kevin Durant'
    }

    player.getName(); // 'Kevin Durant'

El objeto `this` en los métodos no siempre se refiere al objeto en el que están declarados. La expresión en la que se llama al método determina a qué objeto se enlaza `this`. Dos objetos distintos pueden usar la misma función como método y tener resultados distintos dependiendo de sus propiedades.

    var player1 = {
      getName: function() {
        return this.name;
      },

      name: 'Kevin Durant'
    }

    var player2 = {
      getName: player1.getName,

      name: 'Stephen Curry'
    };

    player1.getName(); // 'Kevin Durant'
    player2.getName(); // 'Stephen Curry'

Cuando se ejecuta la expresión `player1.getName()`, el intérprete busca la propiedad `getName` dentro del objeto `player1`. Depués de encontrar la propiedad, la llama como una a función normal pero enlazando `this` al objeto `player1`. Al ejecutar la expresión `player2.getName()`, hace lo mismo que con `player1.getName()`, pero enlaza `this` con `player2`.

El ejemplo anterior también se puede escribir así.

    function getName() {
      return this.name;
    }

    var player1 = {
      getName: getName,
      name: 'Kevin Durant'
    }

    var player2 = {
      getName: getName,
      name: 'Stephen Curry'
    };

    player1.getName(); // 'Kevin Durant'
    player2.getName(); // 'Stephen Curry'

Si varios objetos van a compartir la misma función, puede ser más eficiente escribir el código de esta forma, porque el intérprete sólo tiene que guardar una referencia del método `getName`. Pero si se llama al método `getName` como una función normal, dará resultados inesperados, porque en este caso `this` estará enlazado con el objeto global.

    function getName() {
      return this.name;
    }

    getName(); // undefined

La última forma de llamar a una función es como un constructor usando el operador `new`. Cuando se usa una función como constructor, el valor que tíene `this` es un objeto nuevo y devuelve este mismo objeto como resultado.

    function Player(name) {
      this.name = name;
    }

    var player1 = new Player('Kevin Durant');
    var player2 = new Player('Stephen Curry');

    player1.name; // 'Kevin Durant'
    player2.name; // 'Stephen Curry'

Si se llama como una función normal a una función que está pensada para ser usada como constructor, el valor de `this` estará enlazado al objeto global. Por lo al asignar propiedades a `this`, en realidad se estarán asignando al objeto global. Esto puede hacer que se sobrescriban variables globales o se creen algunas nuevas que no queremos.

## Fuentes:
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
