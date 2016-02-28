---
title: "JavaScript: seleccionar elementos del DOM"
date: 2016-02-28
tags: javascript, dom
template: post.html
draft: true
---

# JavaScript: seleccionar elementos del DOM

El DOM es la representación jerárquica en forma de árbol de un documento. La palabra DOM es una sigla que en inglés significan Document Object Model, que en español sería Modelo de Objecto del Documento.

Cuando un navegador web recibe un documento HTML, construye el DOM a partir del código de este documento. El DOM se usa para dibujar la página web en la pantalla. Cada uno de los elementos HTML es un nodo dentro del DOM.

Para acceder a los nodos del DOM se usa la variable global `document`. La propiedad `documentElement` del objeto `document` representa a la etiqueta `<html>`. Este objeto, también tiene las propiedades `head` y `body` para representar a las etiquetas `<head>` y `<body>`.

## Jerarquía de los nodos

Cada nodo del DOM puede contener otros nodos hijos. Y estos nodos hijos pueden contener otros nodos hijos. Para representar estas relaciones, el navegador crea una estructura en forma de árbol.

```
<html>
  <head>
    <title>Document title</title>
  </head>
  <body>
    <h1>My home page</h1>
    <p>Hello <span>world</span>!</p>
  </body>
</html>
```

Este documento HTML se puede representar en forma de árbol de la siguiente forma.

```
DOM
|
|__ html
    |
    |__ head
    |   |
    |   |__ title
    |        |
    |        |__ Document title
    |
    |__ body
        |
        |__ h1
        |   |
        |   |__ My home page
        |
        |__ p
            |
            |__ Hello
            |
            |__ span
            |   |
            |   |__ world
            |
            |__ !
```

Cada nodo del árbol puede ser una etiqueta HTML, un nodo de texto o un comentario. Se puede identificar cada tipo de nodo comprobando el valor de su propiedad `nodeType`. El valor de esta propiedad es numérico. Cada valor de los tipos de nodos están definidos como constantes del objeto `document`. Los valores para los tipos de nodos más comunes son estos:

* Valor: `1`. Representa una etiqueta de HTML. Este valor está definido en la constante `document.ELEMENT_NODE`.
* Valor: `3`. Representa un nodo de texto. Este valor está definido en la constante `document.TEXT_NODE`.
* Valor: `8`. Representa un comentario. Este valor está definido en la constante `document.COMMENT_NODE`.

## Moverse por el árbol del DOM

Cada nodo del DOM tiene enlaces a los nodos cercanos para moverse por el árbol del DOM. Estos enlaces a los nodos cercanos están representados con estas propiedades del nodo:

* `parentNode` devuelve el nodo padre de este nodo.
* `childNodes` devuelve un objeto `NodeList` con los hijos del nodo. Se puede usar la notación de los arrays para acceder a los nodos de un `NodeList` (`nodeList[0]`). La propiedad `length` de este objeto tiene indica cuántos nodos contiene.
* `firstChild` devuelve el primer nodo hijo del nodo actual. Si el nodo no tiene hijos devuelve `null`.
* `lastChild` devuelve el último nodo hijo del nodo actual. Si el nodo no tiene hijos devuelve `null`.
* `previousSibling` devuelve el nodo anterior a este que pertenezca al mismo padre. Si el nodo es el primer hijo devuelve `null`.
* `nextSibling` devuelve el nodo siguiente a este que pertenezca al mismo padre. Si el nodo es el último hijo devuelve `null`.

El código de este ejemplo:

```
<p>Hello <span>world</span>.</p>
```

Se puede representar en forma de árbol así:

```
           p
  _________|_________
  |        |        |
Hello     span      .
           |
         world
```

Si tomamos el nodo `<span>` como referencia:

* `parentNode` devuelve el nodo `<p>`.
* `childNodes` devuelve un objeto `nodeList`. Este nodeList contiene un nodo de texto con la palabra "world".
* `firstChild` devuelve el nodo de texto que contiene "world".
* `lastChild` devuelve el nodo de texto que contiene "world".
* `previousSibling` devuelve el nodo de texto que contiene "Hello".
* `nextSibling` devuelve el nodo de texto que contiene ".".

Si tomamos el nodo `<p>` como referencia:

* `parentNode` devuelve `null`.
* `childNodes` devuelve un objeto `nodeList`. Este `nodeList` contiene tres nodos, dos nodos de texto y una etiqueta.
* `firstChild` devuelve el nodo de texto que contiene "Hello".
* `lastChild` devuelve el nodo de texto que contiene ".".
* `previousSibling` devuelve `null`.
* `nextSibling` devuelve `null`.

ALGÚN EJEMPLO AQUÍ

## Seleccionar nodos del DOM



## Fuentes

* [Eloquent Javascript](http://eloquentjavascript.net/).
* [Professional JavaScript for web developers](http://www.amazon.es/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691)
* [https://developer.mozilla.org/en/docs/Web/API/Node/nodeType](https://developer.mozilla.org/en/docs/Web/API/Node/nodeType)
* [https://developer.mozilla.org/en-US/docs/Web/API/NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)