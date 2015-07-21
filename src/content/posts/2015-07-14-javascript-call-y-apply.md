---
title: "JavaScript: call y apply"
date: 2015-07-14
tags: javascript, functions
template: post.html
---

# JavaScript: call y apply

Los métodos `call` y `apply` llaman a una función asignándo un valor específico a `this`. La diferencia entre los dos métodos es el número de parámetros que recibe cada uno.

El método `call` puede recibir un número indeterminado de parámetros. El primero es el valor que va a tener `this` en la función a la que se llama. Si el primer parámetro es `null` o `undefined`, `this` será el objeto global. Los demás parámetros que recibe, son los argumentos con los que se llamará a la función.

    var player = { name: 'Kevin Durant' };

    function setNumber(number) {
      this.number = number;
    }

    setNumber.call(player, 35);
    player.number; // 35

Aquí se está llamando a la función `setNumber` asignándole el objeto `player` como `this` y pasándole `35` como argumento.

El método `apply` recibe sólo dos parámetros. El primero es el valor que se va a asignar a `this` en la función a la que llama. Si el primer parámetro es `null` o `undefined`, `this` será el objeto global. El segundo parámetro es un array, cada elemento de este array se pasará como argumento a la función que se está llamando.

    var player = {
      name: 'Kevin Durant',
      points: [31, 25, 34]
    };

    function averagePointsInLastGames(firstGamePoints, secondGamePoints, thirdGamePoints) {
      var sum = firstGamePoints + secondGamePoints + thirdGamePoints;
      return sum / 3;
    }

    averagePointsInLastGames.apply(null, player.points); // 30

En este ejemplo, la función `averagePointsInLastGames` recibe tres parámetros y devuelve su media. La función se puede llamar sin usar `apply`, pasándole los argumentos de forma separada. Pero es más sencillo llamarla con `apply` y pasar el array que contiene los argumentos.

También se puede usar `apply` para llamar a funciones que operan con un número indefinido de parámetros.

    var player1 = {
      name: 'Kevin Durant',
      points: [31, 25, 34, 28, 22, 41]
    };

    var player2 = {
      name: 'Stephen Curry',
      points: [34, 20, 19, 37]
    };

    average.apply(null, player1.points); // 30.16
    average.apply(null, player2.points); // 27.5

La función `average` puede recibir cualquier número de parámetros y devuelve su media. Llamando a la función con `apply`, se puede pasar un array, en el que cada uno de sus elementos se convertirá en un argumento para la función `average`.

## Fuentes:
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
