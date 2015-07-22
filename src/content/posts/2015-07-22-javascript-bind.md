---
title: "JavaScript: bind"
date: 2015-07-22
tags: javascript, functions
template: post.html
---

# JavaScript: bind

Todas las funciones tienen el método `bind`. Este método crea una nueva función con el mismo cuerpo que la función original. El objeto `this` de la nueva función es igual que el primer argumento que se le pasa a `bind`.

También se pueden crear aplicaciones parciales de la función en la que se ejecuta `bind`. La aplicación parcial de una función convierte una función con múltiples parámetros en otra función con menos. La nueva función es igual que la anterior, pero tiene valores asignados en algunos parámetros. Al llamar a la nueva función, sólo hay que pasar los argumentos que no se hayan asignado desde `bind`.

## Asignar `this`

El uso principal del método `bind` es el de arreglar la asignación del objeto `this` cuando se pasa una función como argumento a una función de orden superior.

    var player = {
      name: 'Kevin Durant',

      points: [],

      addPoints: function(pointsToAdd) {
        this.points.push(pointsToAdd);
      }
    }

    var scoredPoints = [25, 24, 32];

    scoredPoints.forEach(player.addPoints); // error: Cannot read property 'push' of undefined
    player.points; // []

El método `forEach` ejecuta el método `addPoints` con el objeto global como `this`. Como el objeto global no tiene una propiedad que se llame `points`, al llamar al método `push` de esta propiedad da un error. Se puede solucionar el error usando el método `bind` de `addPoints` para asignar el objeto `player` como `this`.

    var player = {
      name: 'Kevin Durant',

      points: [],

      addPoints: function(pointsToAdd) {
        this.points.push(pointsToAdd);
      }
    }

    var scoredPoints = [25, 24, 32];

    scoredPoints.forEach(player.addPoints.bind(player)); // error: Cannot read property 'push' of undefined
    player.points; // [25, 24, 32]

Al pasar el objeto `player` como argumento del método `bind` en `addPoints`, se consigue una función que es igual que `addPoints`, pero su objeto `this` es siempre `player`.

Las funciones que se ejecutan como controlador de un evento o como callback de la función `setTimeout`, usan el objeto global como objeto `this`. Igual que en el ejemplo anterior, se usa el método `bind` para asignar el objeto `this`.

    var player = {
      name: 'Kevin Durant',

      points: 0,

      addOnePoint: function() {
        this.points++;
      },

      addTwoPoints: function() {
        this.points += 2;
      },

      addThreePoints: function() {
        this.points += 3;
      },

      getTotalPoints: function() {
        return alert(this.points);
      }
    }

    var onePointButton = document.querySelector('#add-one-point');
    var twoPointsButton = document.querySelector('#add-two-points');
    var threePointsButton = document.querySelector('#add-three-points');

    onePointButton.addEventListener('click', player.addOnePoint.bind(player), true);
    twoPointsButton.addEventListener('click', player.addTwoPoints.bind(player), true);
    threePointsButton.addEventListener('click', player.addThreePoints.bind(player), true);

    setTimeout(player.getTotalPoints.bind(player), 5000);

En este ejemplo todos los controladores de eventos y el callback de `setTimeout` reciben una función en la que su objeto `this` es `player`. Así cuando se ejecute alguna de esas funciones, se sumarán los puntos al jugador y al pasar cinco segundos, se muestra una alerta con los puntos que lleva acumulados `player`.

## Aplicación parcial de funciones (*currying*)

Para crear una aplicación parcial de una función, hay que pasar al método `bind` dos o más argumentos. El primer argumento que se asigna a `bind` es siempre el objeto que se va a asignar como `this` en la función, los demás argumentos se asignan a los parámetros de la función sobre la que se ejecuta `bind`.

El objeto `player` del ejemplo anterior se puede simplificar creando un sólo método `addPoints` que reciba un parámetro que es el número de puntos a sumar. Para usar función como controlador de cada botón, se hace *currying* del método `addPoints` asignando con los valores 1, 2 ó 3 a su parámetro `x`.

    var player = {
      name: 'Kevin Durant',

      points: 0,

      addPoints: function(x) {
        this.points += x;
      },

      getTotalPoints: function() {
        return alert(this.points);
      }
    }

    var onePointButton = document.querySelector('#add-one-point');
    var twoPointsButton = document.querySelector('#add-two-points');
    var threePointsButton = document.querySelector('#add-three-points');

    var addOnePoint = player.addPoints.bind(player, 1);
    var addTwoPoints = player.addPoints.bind(player, 2);
    var addThreePoints = player.addPoints.bind(player, 3);

    onePointButton.addEventListener('click', addOnePoint, true);
    twoPointsButton.addEventListener('click', addTwoPoints, true);
    threePointsButton.addEventListener('click', addThreePoints, true);

    setTimeout(player.getTotalPoints.bind(player), 5000);

Las funciones `addOnePoint`, `addTwoPoints` y `addThreePoints` son todas una copia del método `addPoints` del objeto `player`. En estas funciones se le asigna el objeto `player` como `this` y el número de puntos a sumar (1, 2 ó 3) se asigna como valor de su parámetro `x`. Lo que se obtiene es una función que no recibe ningún argumento.

También se puede hacer *currying* de una función que no usa el objeto `this`. En estas funciones se asigna como objeto `this` el valor `null` o `undefined`. Si se asigna uno de estos dos valores, el objeto `this` de la función es el objeto global. Un ejemplo muy sencillo de este uso del *currying* es una función que suma dos valores.

    function sum(x, y) {
      return x + y;
    }

    var sum3 = sum.bind(null, 3);

    sum3(4); // 7

Como la función `sum` no usa el objeto `this`, se puede asignar el valor `null` a este objeto. La variable `sum3` contiene la función resultante de hacer *currying* de `sum` con el valor 3 asignado a su parámetro `x`. La función que se obtiene como resultado acepta un parámetro y devuelve el resultado de sumarle 3.

## Fuentes:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
* [https://docs.webplatform.org/wiki/javascript/Function/bind](https://docs.webplatform.org/wiki/javascript/Function/bind)
* [https://msdn.microsoft.com/library/ff841995(v=vs.94).aspx](https://msdn.microsoft.com/library/ff841995(v=vs.94).aspx)
* [http://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/](http://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)
* [http://dmitrysoshnikov.com/notes/note-1-ecmascript-bound-functions/](http://dmitrysoshnikov.com/notes/note-1-ecmascript-bound-functions/)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
