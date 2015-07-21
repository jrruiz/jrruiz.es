---
title: "JavaScript: problemas usando with"
date: 2015-07-08
tags: javascript, scopes
template: post.html
---

# JavaScript: problemas usando with

Los bloques `with` permiten cambiar el ámbito de ejecución de una porción de código. El bloque `with` recibe un objeto como parámetro y hace que las propiedades y métodos del objeto estén disponibles dentro del bloque como si fuesen variables locales.

    with (object) {
      objectProperty; // object.objectProperty
      objectMethod(); // object.objectMethod()
    }

El mayor problema de `with` es la ambigüedad de las variables y funciones que se usan dentro del bloque. Cuando se usa una función en JavaScript, el intérprete busca esa variable en el ámbito de ejecución actual. Si no la encuentra, pasa al ámbito inmediatamente superior y continua así hasta que la encuentre o llegue al nivel superior.

Si se usa una variable de un ámbito de ejecución superior a un bloque `with`, pero el objeto tiene una propiedad que se llama exactamente igual que esa variable, se estará usando el valor de la propiedad del objeto en vez de la variable del ámbito superior que es la que se esperaba usar.

    var object = { x: 0, y: 1 };

    function f(x, object) {
      with (object) {
        return x + y;
      }
    }

    f(3, object); // 1

En el ejemplo anterior, se esperaba que la función `f` devuelva la suma de su primer parámetro y la propiedad `y` del objeto. El resultado es totalmente distinto al esperado, porque dentro del bloque `with`, la variable `x` hace referencia a la propiedad `x` del objeto en vez del parámetro `x` de la función.

También se puede dar el caso contrario, que se use una variable dentro de un bloque `with`, esperando obtener el valor de una propiedad del objeto y en su lugar se obtenga el valor de otra variable de un ámbito superior.

    var object = { z: 1 };
    var y = 4;

    function f(x, object) {
      with (object) {
        return x + y;
      }
    }

    f(3, object); // 7

El resultado que se esperaba obtener era la suma del parámetro `x` de la función con la propiedad `y` del objeto. Pero como el objeto no tiene la propiedad `y`, JavaScript ha buscado esta variable en el ámbito de la función, como no la ha encontrado ahí, ha salido al ámbito de ejecución superior donde sí la ha encontrado. El valor que ha usado es el de la variable global `y`.

Los bloques `with` son útiles para no tener que escribir varias veces el nombre de un objeto cuando se vayan a usar varias propiedades suyas de forma consecutiva. Pero por los problemas que puede causar, es preferible asignar variables locales con el valor de las propiedades o métodos del objeto que se vaya a usar.

    var object = { x: 0, y: 1 };

    function f(x, object) {
      var y = object.y;
      
      return x + y;
    }

    f(3, object); // 4

## Fuentes:
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
