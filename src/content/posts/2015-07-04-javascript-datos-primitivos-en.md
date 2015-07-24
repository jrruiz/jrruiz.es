---
title: "JavaScript: datos primitivos"
date: 2015-07-04
tags: javascript, data types
template: post.html
---

# JavaScript: datos primitivos

En JavaScript hay cinco tipos de datos primitivos: `undefined`, `null`, `number`, `boolean` y `string`. Los tipos primitivos `boolean`, `number` y `string` tienen constructores para crear objetos de ese tipo.

Si se usan los constructores de los tipos primitivos, lo que se obtiene es un objeto. Si se usa un tipo primitivo se obtiene un dato del tipo primitivo que corresponda.

    typeof 1; // 'number'
    typeof new Number(1); // 'object'
    typeof true; // 'boolean'
    typeof new Boolean(true); // 'object'
    typeof 'hello'; // 'string'
    typeof new String('hello'); // 'string'

Las comparaciones de igualdad con datos primitivos funcionan como se espera. Devuelven `true` como resultado si el valor primitivo es el mismo y `false` si no lo es. Al comparar dos objetos creados con constructores primitivos, la comparación siempre da como resultado `false` a menos que sean el mismo objeto. Esto es porque lo que en realidad se están comparando las referencias de cada objeto en vez de sus valores.

    // datos primitivos
    var x = 'hello';
    var y = 'hello';

    x == y; // true
    x === y; // true

    // objetos
    var x = new String('hello');
    var y = new String('hello');

    x == y; // false
    x === y; // false

Usando los datos primitivos, se pueden usar los métodos asociados a los constructores de su tipo. Por ejemplo, `toLowerCase` es un método de los objetos de tipo string, pero también se puede usar en datos primitivos de tipo string.

    var x = 'HELLO';
    x.toLowerCase(); // new String('HELLO').toLowerCase() -> 'hello'

Lo que pasa en este caso es que el string se convierte a un objeto `String`. Se usa el método sobre el objeto `String` y se elimina para que lo limpie el recolector de basura.

Cuando se usan datos primitivos y se intenta asignar alguna propiedad a uno de ellos, pasa igual que cuando se usa algún método en un tipo primitivo. Se crea un objeto nuevo al que se le asigna la propiedad y después se elimina para que lo limpie el recolector de basura.

    var x = 1;
    x.newProperty = 2; // new Number(1).newProperty = 2
    x.newProperty; // new Number(1).newProperty -> undefined

Si se usa el modo estricto la asignación de propiedades a datos primitivos lanza un error.

    'use strict';
    var x = 1;
    x.newProperty = 2; // error

## Fuentes

* [https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/](https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
