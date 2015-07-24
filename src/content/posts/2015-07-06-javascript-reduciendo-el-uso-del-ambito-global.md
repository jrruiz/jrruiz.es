---
title: "JavaScript: reduciendo el uso del ámbito global"
date: 2015-07-06
tags: javascript, scopes
template: post.html
---

# JavaScript: reduciendo el uso del ámbito global

La creación de variables globales en JavaScript puede dar problemas cuando se usan librerías de terceros o hay varios programadores implicados en el proyecto. Si se define una variable global para usarla dentro de una función, puede que esa misma global se use antes por otras funciones y modifiquen su contenido.

    var i = 0, numberOfProducts = 0, total = 0; // declaración de globales
    function getOrderTotal(products) {
      numberOfProducts = products.length;
      for (i = 0; i < products; i++) {
        total += getProductPriceWithTax(products[i]);
      }

      return total;
    }

    var total = 0; // total es la misma global que en la función anterior
    function getProductPriceWithTax(product) {
      total = product.price * product.tax;
      return total;
    }

Los cambios que se hagan a la global `total` dentro de la función `getProductPriceWithTax`, cambiarán el resultado que lleva acumulado la función `getOrderTotal`. La solución a este problema es que las dos funciones usen variables locales. Así los cambios que haga una de ellas no afectarán a la otra.

    function getOrderTotal(products) {
      var i = 0, numberOfProducts = 0, total = 0; // variables locales a la función

      for (i = 0; i < products; i++) {
        total += getProductPriceWithTax(products[i]);
      }

      return total;
    }

    function getProductPriceWithTax(product) {
      var total = 0; // variable local a la función

      total = product.price * product.tax;
      return total;
    }

En este ejemplo, `getOrderTotal` devolverá de forma correcta la suma del precio de los productos. Los cambios que haga `getProductPriceWithTax` a la variable `total` no afectarán a `getOrderTotal` porque cada una usa una variable distinta, aunque tengan el mismo nombre.

Todas las variables y funciones globales que se declaran en JavaScript se crean como propiedades y métodos del objeto global. Se puede acceder al objeto global usando la palabra clave `this` en el ámbito de ejecución global del programa, fuera de cualquier función u objeto. En los navegadores el objeto global es el objeto `window`.

    // ejemplo 1
    var x = 1;
    this.x; // 1

    // ejemplo 2
    this.y; // undefined
    var y = 2;
    this.y; // 2

    // ejemplo 3
    this.z = 3;
    z = 4;
    this.z; // 4

Para evitar problemas se debe usar el menor número de variables globales posible. Si es necesario declarar alguna variable global, es mejor hacerlo usando la palabra clave `var`, igual que cuando se declara una variable local dentro de una función. De esta forma queda claro qué variables son globales y cuáles no.

Como todas las variables y funciones globales son propiedades y métodos del objeto global, en los navegadores se puede usar este objeto para consultar qué funcionalidades soporta el navegador. Por ejemplo si se necesita saber si en el navegador actual se pueden usar `promises`, se puede hacer lo siguiente.

    if (this.Promise) {
      // el navegador soporta el objeto Promise
    }
    else {
      // el navegador no soporta el objeto Promise
    }

## Fuentes

* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
