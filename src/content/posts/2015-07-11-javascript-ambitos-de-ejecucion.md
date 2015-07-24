---
title: "JavaScript: ámbitos de ejecución"
date: 2015-07-11
tags: javascript, scopes
template: post.html
---

# JavaScript: ámbitos de ejecución

Los bloques en JavaScript, como los `for` o los `if`, no crean nuevos ámbitos de ejecución. Sólo las funciones crean nuevos ámbitos. JavaScript funciona con ámbitos de ejecución a nivel de función en vez de a nivel de bloque.

    function f() {
      var x = 'testing';

      x; // 'testing'

      if (x === 'testing') {
        var x = 'probando';
        x; // 'probando'
      }

      x; // 'probando'
    }

Si se necesita tener un ámbito de ejecución a nivel de bloque, una solución es usar una IIFE.

    function f() {
      var x = 'testing';
      x; // 'testing'

      if (x === 'testing') {
        (function() {
          var x = 'probando';
          x; // 'probando'
        })();
      }

      x; // 'testing'
    }

Usando una IIFE dentro del bloque `if`, se consigue crear un nuevo ámbito de ejecución para ese bloque. Las IIFE presentan una forma mmuy flexible y potente de crear ámbitos de ejecución.

Otra característica muy potente de las IIFE es la posibilidad de pasarles argumentos del ámbito superior. Estos argumentos se pueden usar para crear una closure dentro de la IIFE que recuerde el parámetro que recibió esta.

    var x, y;

    function f1() {
      var result = [];
      
      for (var i = 0; i < 10; i++) {
          result.push(function() { return i; });
      }

      return result;
    }
    x = f1();
    x[0]; // 11
    x[1]; // 11

    function f2() {
      var result = [];
      
      for (var i = 0; i < 10; i++) {
        (function(index) {
          result.push(function() { return index; });
        })(i);
      }

      return result;
    }
    y = f2();
    y[0]; // 0
    y[1]; // 1

El valor que recuerdan las closures de `f1` es el de `i`, que es para todas la misma variable y al salir del bucle vale 11. El valor que recuerdan las closures de `f2` es el del parámetro que recibe la IIFE, que es distinto para cada closure.

## Fuentes

* [http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
