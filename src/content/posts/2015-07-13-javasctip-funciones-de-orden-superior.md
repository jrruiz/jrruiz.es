---
title: "Javascript: funciones de orden superior"
date: 2015-07-13
tags: javascript, functions
template: post.html
---

# Javascript: funciones de orden superior

Las funciones de orden superior son funciones que toman a otras funciones como argumento o devuelven una función como resultado. Donde más se usa este tipo de funciones es en los lenguages funcionales. Las funciones que se pasan como argumentos a otra función se llaman `callbacks`.

Un ejemplo de función de orden superior es el método `forEach` de los objetos de tipo array.

    var numbers = [1, 2, 3];

    function sumOneAndLog(n) {
      n += 1;
      console.log(n);
    }

    numbers.forEach(sumOneAndLog);
    // -> 2
    // -> 3
    // -> 4

El método `forEach` recibe como argumento una función a la que llama, pasándole como argumentos cada uno de los elementos del array.

Las funciones de orde superior también aceptan funciones anónima como argumentos. El ejemplo anterior se puede rescribir de la siguiente forma.

    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    numbers.forEach(function(n) {
      n += 1;
      console.log(n);
    });
    // -> 2
    // -> 3
    // -> 4

Usando funciones de orden superior se pueden abstraer patrones repetitivos en nuestro código, como los bucles.

    function repeat(n, callback) {
      for (var i = 0; i < n; i++) { callback(i); }
    }

    repeat(3, function(n) {
      console.log(n);
    });
    // -> 0
    // -> 1
    // -> 2

Estas funciones también se pueden usar para crear otras funciones. Cuando una función de orden superior devuelve otra función, normalmente lo que devuelve es una closure.

    function add(x) {
      return function(y) {
        return x + y;
      }
    }

    var add3 = add(3);
    add3(4); // 7

Este paradigma de programación es beneficioso para reducir el código duplicado y su complejidad. También facilita el mantenimiento porque se basa en funciones pequeñas que sólo hacen una cosa. Si se encuentra algún error en código que sigue este paradigma, sólo habrá que corregirlo en una función que normalmente será muy simple.

## Fuentes

* [http://eloquentjavascript.net/05_higher_order.html](http://eloquentjavascript.net/05_higher_order.html)
* [http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/#more-1037](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
