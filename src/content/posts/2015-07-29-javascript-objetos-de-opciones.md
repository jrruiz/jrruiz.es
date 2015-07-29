---
title: "JavaScript: objetos de opciones"
date: 2015-07-29
tags: javascript, functions, objects
template: post.html
---

# JavaScript: objetos de opciones

Un objeto de opciones es un objeto en el que cada propiedad se considera un parámetro de la función que lo recibe. Los objetos de opciones se pueden usar hacer más simples las llamadas a funciones que reciben muchos parámetros. También se pueden usar para hacer que los parámetros de una función tengan un valor por defecto.

    function Player(name, position, number, age, height, weight) {
      this.name = name;
      this.position = position;
      this.number = number;
      this.age = age;
      this.height = height;
      this.weight = weight;
    }

    var player1 = new Player('Kevin Durant', 'Small forward', 35, 26, 206, 109);

El constructor `Player` puede recibir 6 parámetros. Pasando cada parámetro por separado es más complicado entender qué representa cada uno de los valores.

Se puede refactorizar el constructor anterior para que use un objeto de opciones.

    function Player(options) {
      options = options || {};

      this.name = options.name || 'Unnamed';
      this.position = options.position || 'Point guard';
      this.number = options.number || 0;
      this.age = options.age || 25;
      this.height = options.height || 185;
      this.weight = options.weight || 80;
    }

    var player1 = new Player({
      name: 'Kevin Durant',
      position: 'Small forward',
      number: 35,
      age: 26,
      height: 206,
      weight: 109
    });

En esta versión del constructor `Player` sólo se acepta un parámetro, que es un objeto de opciones. La primera línea de la función hace que si no se ha recibido el objeto de opciones, se inicialice como un objeto vacío.  Cuando se usa un objeto de opciones se evita que los argumentos que se pasan a una función sean posicionales. En vez de esto, los argumentos tienen un nombre para poder identificarlos.

Cuando se usan objetos de opciones, normalmente todos los parámetros que puede recibir la función son opcionales. Para definir sus valores por defecto se puede usar una función que una dos objetos de opciones. Uno de los objetos contendrá los valores por defecto de la función y el otro será el que reciba la función.

    function Player(options) {
      options = extend({
        name: 'Unnamed',
        this.position: 'Point guard',
        this.number: 0,
        this.age: 25,
        this.height: 185,
        this.weight: 80
      }, options);

      this.name = options.name;
      this.position = options.position;
      this.number = options.number;
      this.age = options.age;
      this.height = options.height;
      this.weight = options.weight;
    }

La función `extend` copia los valores de su segundo parámetro en el primero. Una implementación muy usada de esta función es la siguiente.

    function extend(target, source) {
      var value;

      if (source) {
        for (var key in source) {
          value = source[key];
          if (typeof source[key] !== 'undefined') {
            target[key] = value;
          }
        }
      }

      return target;
    }

Esta función recorre todas las propiedades del objeto `source` y se los asigna a `target`. Si `target` tiene alguna propiedad que `source` no tiene o es `undefined`, se mantiene el valor de la propiedad de `target`. Esto hace que sea muy útil usarla con objetos de opciones para que cuando no tenga alguna propiedad, se asigne su valor por defecto.

En EcmaScript 6 el objeto `Object` tiene el método `assign` que tiene esta misma funcionalidad. Pero como mejora tiene que puede aceptar un número indefinido de objetos `source`. Algunas librerías como jQuery también tienen un método `extend` con la misma funcionalidad que `Object.assign`.

## Fuentes

* [http://jasalguero.com/ledld/development/javascript-development/javascript-options-object-parameter-with-defaults/](http://jasalguero.com/ledld/development/javascript-development/javascript-options-object-parameter-with-defaults/)
* [http://devcrapshoot.com/javascript/javascript-functions-best-practices-using-options](http://devcrapshoot.com/javascript/javascript-functions-best-practices-using-options)
* [http://bartwullems.blogspot.com.es/2011/11/javascript-patterns-settings-object.html](http://bartwullems.blogspot.com.es/2011/11/javascript-patterns-settings-object.html)
* [http://www.codereadability.com/what-are-javascript-options-objects/](http://www.codereadability.com/what-are-javascript-options-objects/)
* [http://api.jquery.com/jquery.extend/](http://api.jquery.com/jquery.extend/)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
