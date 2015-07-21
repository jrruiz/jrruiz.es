---
title: "JavaScript: conversión de tipos implícita en igualdades"
date: 2015-07-05
tags: javascript, coercion, data types
template: post.html
---

# JavaScript: conversión de tipos implícita en igualdades

Cuando se usa el operador `==` para hacer comparaciones, JavaScript hace conversiones de datos internas. Casi siempre, intentará convertir los datos en números. Si la comparación es entre un tipo primitivo y un objeto, para el objeto siempre intenta usar el método `valueOf` y después el `toString`. Si el objeto es de tipo `Date`, la conversión se intenta al contrario, primero intenta usar `toString` y después `valueOf`.

    1 == '1'; // true
    1 == { valueOf: function() { return 1; } }; // true

Para evitar la conversión de tipos implícita, se puede convertir el tipo de un dato al tipo del otro dato. Por ejemplo, para comparar un string con un número usando `==`, habría que convertir el string en número, o el número en string. También se puede usar el operador `===` para evitar los cambios de tipos implícitos en la comparación.

    1 == Number('1'); // true
    1 == Number({ valueOf: function() { return 1; } }); // true

    1 === Number('1'); // true
    1 === Number({ valueOf: function() { return 1; } }); // true
    
    1 === '1'; // false
    1 === { valueOf: function() { return 1; } }; // false

En comparaciones con objetos de tipo `Date` siempre se intentan convertir a string usando el método `toString`, al contrario que el resto de objetos a los que se intenta convertir en número con `valueOf`.

    '2015-07-04' == new Date('2015-07-04'); // false;
    'Sat Jul 04 2015 02:00:00 GMT+0200 (CEST)' == new Date('2015-07-04'); // true;

Las conversiones que se hacen al comparar dos datos con `==` son las siguientes:

<table>
  <thead>
    <tr>
      <th>Argumento 1</th>
      <th>Argumento 2</th>
      <th>Conversión</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`null` o `undefined`</td>
      <td>`null` o `undefined`</td>
      <td>Ninguna, siempre es `true`</td>
    </tr>
    <tr>
      <td>`null` o `undefined`</td>
      <td>Algo que no sea `null` ni `undefined`</td>
      <td>Ninguna, siempre es `false`</td>
    </tr>
    <tr>
      <td>Dato primitivo de tipo string, número o booleano</td>
      <td>Objeto `Date`</td>
      <td>Dato primitivo a número.<br>Objeto `Date` a string (llama a `toString`, si no puede llama a `valueOf`)</td>
    </tr>
    <tr>
      <td>Dato primitivo de tipo string, número o booleano</td>
      <td>Objeto que no sea del tipo `Date`</td>
      <td>Dato primitivo a número.<br>Objeto a número (llama a `valueOf`, si no puede, llama a `toString`)</td>
    </tr>
    <tr>
      <td>Dato primitivo de tipo string, número o booleano</td>
      <td>Dato primitivo de tipo string, número o booleano</td>
      <td>Dato primitivo a número</td>
    </tr>
  </tbody>
</table>

## Fuentes:
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
