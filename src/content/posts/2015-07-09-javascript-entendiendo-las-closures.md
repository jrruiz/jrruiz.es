---
title: "JavaScript: entendiendo las closures"
date: 2015-07-09
tags: javascript, functions, scopes
template: post.html
---

# JavaScript: entendiendo las closures

Las closures son funciones que recuerdan el ámbito de ejecución en el que se han creado. Pueden usar variables definidas en una función que contiene a la función closure.

    function addThree(x) {
      function add(y) {
        return x + y;
      }
      return add(3);
    }

    addThree(5); // 8
    addThree(3); // 6

La función `add` es una closure que puede usar las variables y parámetros que están definidos en la función exterior `addThree`.

Las closures pueden usar las variables y parámetros de los ámbitos de ejecución de las funciones que las contienen aunque estas ya hayan devuelto un resultado. Desde una función, se puede devolver una función closure para usarla más tarde. Esta closure, puede seguir usando las variables y parámetros de la función que la ha devuelto.

    function addThree() {
      var x = 3;
      function add(y) {
        return x + y;
      }
      return add;
    }

    var myAddThree = addThree();
    myAddThree(5); // 8
    myAddThree(3); // 6

La función `addThree` devuelve la closure `add`. Al asignar el valor devuelto por `addThree` a la variable `myAddThree`, esta variable contiene a la función `add`. Aunque la función `addThree` ya ha devuelto un resultado, la closure sigue recordando el valor de `x`.

Las closures también se pueden usar como expresiones de función. Las expresiones de función son funciones anónimas. Puede ser útil usar esto cuando una función va a devolver una closure para ser usada más tarde.

    function addThree() {
      var x = 3;
      return function(y) {
        return x + y;
      }
    }

    var myAddThree = addThree();
    myAddThree(5); // 8
    myAddThree(3); // 6

La función `addThree` es igual que la del ejemplo anterior. La única diferencia es que la función que devuelve es anónima. En este ejemplo es válido devolver una función anónima, porque `addThree` no necesita saber el nombre de la función que va a devolver.

Las closures almacenan la referencia de las variables de la función en la que se declaran en vez de copiar su valor. Los cambios que se hagan sobre las variables de su ámbito superior son visibles para todas las closures que están en ese ámbito.

    function counter() {
      var x = 0;
      return {
        add: function() { x++; },
        subtract: function() { x--; },
        getValue: function() { return x; }
      };
    }

    var i = counter();
    i.getValue(); // 0
    i.add();
    i.getValue(); // 1
    i.subtract();
    i.getValue(); // 0

La función `counter` devuelve un objeto con tres closures: `add`, `subtract` y `getValue`. Las tres closures comparten el acceso a la variable `x`. Los cambios que hace la closure `add` a `x`, se pueden ver reflejados en las funciones `subtract` y `getValue`.

## Fuentes

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
