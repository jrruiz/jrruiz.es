---
title: "JavaScript: expresiones de función"
date: 2015-07-12
tags: javascript, functions
template: post.html
---

# JavaScript: expresiones de función

Las expresiones de función son muy parecidas a las declaraciones de función. Una de las diferencias que hay, es que en las expresiones de función se puede omitir el nombre para crear funciones anónimas.

    var f = function() {
      return 'Hello';
    };

Las expresiones de función también se pueden crear con un nombre. Este nombre sólo se puede usar en el interior de la propia función. Crear estas funciones con nombre puede ser útil para usarlas de forma recursiva. También se pueden usar para seguir la pila de llamadas cuando se hace debug.

    var f = function addUpTo(x) {
      var prev = x - 1;
      
      if (prev == 0) {
        return x;
      }
      
      return x + addUpTo(prev);
    };

A las expresiones de función no les afecta el hoisting. Si se está asignando la función a una variable, la declaración de la variable sí  se moverá a la parte superior de su ámbito, pero la asignación de la función se mantiene en su sitio.

    f1(); // error
    f2(); // 'Hello'

    var f1 = function() { return 'Hello'; };
    function f2() { return 'Hello'; }

## Fuentes

* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
