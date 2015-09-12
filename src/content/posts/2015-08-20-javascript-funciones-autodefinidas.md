---
title: "JavaScript: funciones autodefinidas"
date: 2015-08-20
tags: javascript, functions
template: post.html
---

# JavaScript: funciones autodefinidas

Las funciones autodefinidas, son funciones que cambian su propia definición cuando se ejecutan por primera vez. Estas funciones también se llaman funciones de definición perezosa. Este patrón de programación es útil cuando se necesita iniciar algunos parámetros de la función con valores que no van a cambiar en el resto del programa.

Hay tres usos principales para las funciones autodefinidas: para evitar cálculos repetitivos

## Evitar cálculos repetitivos con funciones autodefinidas

Tenemos un objeto `person` y queremos implementar un método `getDniLetter` para calcular su letra del DNI. Para evitar repetir el cálculo en cada llamada al método, se pueden usar variables globales. Cuando se ejecute por primera vez el método, se guardará su resultado en una variable global. En las llamas siguientes, se comprueba si ya tiene un valor esa variable global para no repetir el cálculo.

    var dniLetters = ['T', 'R', 'W', 'A', ...]; // letras del dni
    var remainder;
    var letter;
    var person = {
      dni: '123456789',
      getDniLetter: function() {
        if (!letter) {
          remainder = parseInt(this.dni) % 23;
          letter = dniLetters[remainder];
        }

        return letter;
      }
    };

    person.getDniLetter(); // 'B'

En este ejemplo, el método `getDniLetter` del objeto `person` tiene varios problemas. El primero es que las variables globales que usa para calcular el resultado se pueden cambiar desde otra parte del programa. Por otro lado siempre que se llame al método, se tiene que ejecutar un bloque `if` para saber si hay que calcular la letra o no. El útimo problema es que la variable `dniLetters` se inicializa aunque después no se use ninguna vez en el código.

Se puede conseguir el mismo funcionamiento si se implementan las variables como propiedades del objeto `person`.

    var person = {
      dni: '123456789',
      dniLetters. ['T', 'R', 'W', 'A', ...], // letras del dni
      remainder: 0,
      letter: '',
      getDniLetter: function() {
          if (!this.letter) {
            this.remainder = parseInt(this.dni) % 23;
            this.letter = this.dniLetters[remainder];
          }

          return this.letter;
      }
    };

    person.getDniLetter(); // 'B'

Esta implementación mejora a la anterior en que no usa variables globales. Pero sigue teniendo el problema de que se pueden cambiar los valores de las propiedades que se usan para calcular la letra y se ejecuta un `if` en cada llamada. Además del problema de que se inicializan las variables aunque después no se llame al método en ningún momento.

Se puede mejorar un poco usando una IIFE en la que se declaren las variables como locales y devuelva una función closure.

    var person = {
      dni: '123456789',
      getDniLetter: (function() {
        var dniLetters = ['T', 'R', 'W', 'A', ...]; // letras del dni
        var remainder;
        var letter;

        return function() {
          if (!letter) {
            remainder = parseInt(this.dni) % 23;
            letter = dniLetters[remainder];
          }

          return letter;
        };
      })()
    };

    person.getDniLetter(); // 'B'

Con esta implementación del método `getDniLetter`, se evita que se cambien las variables que se usan para calcular la letra del DNI. Pero sigue ejecutando el `if` en cada llamada y se sigue inicializando la variable `dniLetters` aunque no se use depués.

Si este método se crea como una función autodefinida, se pueden evitar todos los problemas anteriores.

    var person = {
      dni: '123456789',
      getDniLetter: function() {
        var dniLetters = ['T', 'R', 'W', 'A', ...]; // letras del dni
        var remainder = parseInt(this.dni) % 23;
        var letter = dniLetters[remainder];

        this.getDniLetter = function() {
          return letter;
        };

        return this.getDniLetter();
      }
    };

    person.getDniLetter(); // 'B'

En este ejemplo, la primera vez que se llama al método `getDniLetter`, se crean las variables necesarias, locales al método y se calcula la letra. Antes de devolver el resultado, se cambia el propio método para que la siguiente vez que se llame, simplemente devuelva el valor que se calculó antes.

Con la última implementación se consigue evitar los tres problemas que teníamos antes:

1. No se puede cambiar el valor de las variables que se usan para calcular la letra del DNI.
2. No se ejecuta el bloque `if` en cada llamada al método.
3. Las variables que se usan para hacer el cálculo, no se inicializan hasta que se necesitan, que sería la primera vez que se llama al método.

## Funciones autodefinidas de un sólo

Las funciones de un sólo uso son muy fáciles de implementar con funciones autodefinidas.

    var one = function() {
      one = function() {
        throw new Error('You can call this function only once');
      };
      return 1;
    };

    one(); // 1
    one(); // Error: You can call this function only once

La primera vez que se llama a la función `one`, devuelve el valor `1`. Cuando se llama a la función a partir de la segunda vez, siempre lanza una una excepción. Esto pasa porque la función se redefine a sí misma la primera vez se ejecuta.

## Funciones autodefinidas condicionales

Otro patrón en el que se pueden usar las funciones autodefinidas es para que se reescriban de forma condicional. Programando en el navegador, se puede dar el caso de que una función necesite saber si soporta alguna funcionalidad. Usando una función autodefinida, la primera vez que se llame ala función, se ejecuta un condicional. Dependiendo del resultado del condicional, la función se reescribirá de una forma u otra.

    var addEventHandler = function(firstEvent, firstElement, firstHandler) {
      if (element.addEventListener) {
        addEventHandler = function(event, element, handler) {
          element.addEventListener(event, handler, false);
        };
      }
      else if (element.attachEvent) {
        addEventHandler = function(event, element, handler) {
          element.attachEvent('on' + event, handler);
        };
      }
      else {
        addEventHandler = function(event, element, handler) {
          element['on' + event] = handler;
        };
      }

      return addEventHandler(firstEvent, firstElement, firstHandler);
    };

La primera vez que se llame a la función `addEventHandler`, se determina cómo se añaden los eventos en el navegador actual. La demás llamadas a la función, se ejecutarán de forma más eficiente, porque no tiene que volver a evaluar las condiciones para saber que método soporta el navegador.

## Fuentes

* [https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/self-defining-functions.html](https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/self-defining-functions.html)
* [http://scriptble.com/2011/05/12/lazy-loading-functions/](http://scriptble.com/2011/05/12/lazy-loading-functions/)
* [http://peter.michaux.ca/articles/lazy-function-definition-pattern](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
* [https://imbuzu.wordpress.com/2012/11/03/the-lazy-function-declaration-pattern-javascript/](https://imbuzu.wordpress.com/2012/11/03/the-lazy-function-declaration-pattern-javascript/)
* [https://yobriefca.se/blog/2009/10/18/lazy-function-definition-pattern/](https://yobriefca.se/blog/2009/10/18/lazy-function-definition-pattern/)
* [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do)
* [Professional JavaScript for web developers](http://www.amazon.es/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691)
