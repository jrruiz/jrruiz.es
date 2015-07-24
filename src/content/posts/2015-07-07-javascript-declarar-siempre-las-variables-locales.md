---
title: "JavaScript: declarar siempre las variables locales"
date: 2015-07-07
tags: javascript, scopes
template: post.html
---

# JavaScript: declarar siempre las variables locales

En JavaScript es fácil crear variables globales por accidente. Si se usa una variable sin declarar dentro de una función, se estará usando una variable global. En estos casos el intérprete de JavaScript crea o modifica la variable global silenciosamente, sin lanzar ningún error o aviso.

    function suma(a, b) {
      total = 0; // global
      total = a + b;
      return total;
    }

En el ejemplo anterior, la variable `total` se está creando como global. Esto pasa porque se ha declarado sin usar la palabra clave `var` que la declararía como local en el ámbito de la función.

    function suma(a, b) {
      var total = 0; // local
      total = a + b;
      return total;
    }

La creación de variables globales de forma intencioanada se considera una mala práctica. Pero cuando se crea o modifica una variable global sin intención, puede dar problemas en la ejecución del programa. Normalmente estos errores son los más complicados de depurar.

Para evitar estos problemas se usan herramientas de análisis de código que se llaman *linters*. Los *linters* permiten definir qué variables globales usa nuestro código y otros parámetros avanzados. Los *linters* para JavaScript más conocidos son [eslint](http://eslint.org/), [jshint](http://jshint.com/) y [jslint](http://www.jslint.com/). Es recomendable el uso de alguna de estas herramientas para evitar los errores más comunes y malas prácticas cuando se escribe código.

## Fuentes

* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
