---
title: "JavaScript: hoisting"
date: 2015-07-10
tags: javascript, scopes
template: post.html
---

# JavaScript: hoisting

JavaScript siempre "mueve" de forma "invisible" la declaración de las funciones y variables a la parte superior del ámbito en el que se ejecutan. esto significa que el siguiente código:

    function f1() {
      console.log(x); // undefined
      var x = 1;
      console.log(x); // 1
    }

JavaScript lo interpreta así:

    function f1() {
      var x;
      console.log(x); // undefined
      x = 1;
      console.log(x); // 1
    }

No importa si la línea que contiene la declaración no se ejecuta nunca. JavaScript siempre la moverá al inicio de su ámbito. Las siguientes funciones son iguales para el intérprete de JavaScript.

    function f1() {
      if (false) {
        var x = 1;
      }
      var y = 2;

      x; // undefined
      y; // 2
    }

    function f1() {
      var x, y;

      if (false) {
        x = 1;
      }
      y = 2;

      x; // undefined
      y; // 2
    }

En el ejemplo anterior también se puede ver que las asignación de las variables no se mueven a la parte superior de su ámbito. Sólo se mueve la declaración de la variable.

Al contrario que en las variables, en las funciones se mueve también su cuerpo. Pero esto no funciona con las expresiones de función.

    f1(); // 1
    f2(); // error

    function f1() { return 1; } // se mueve toda la función al inicio
    var f2 = function() { return 2; }; // sólo se mueve la declaración de f2

## Fuentes:
* [http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html](http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html)
* [https://developer.mozilla.org/en-US/docs/Glossary/Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
