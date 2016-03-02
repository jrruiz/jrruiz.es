---
title: "JavaScript: moverse por los elementos del DOM"
date: 2016-03-02
tags: javascript, dom
template: post.html
---

# JavaScript: moverse por los elementos del DOM

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

Usando estos métodos se puede hacer una función recursiva para recorrer el árbol del DOM. Por ejemplo, se puede hacer una función para contar cuántos nodos de texto hay dentro de un nodo.

```
function countTextNodes(node) {
  var children = Array.prototype.slice.call(node.childNodes);
  var total = 0;

  if (node.nodeType != document.ELEMENT_NODE) {
    return total;
  }

  children.forEach(function(child) {
    if (child.nodeType == document.TEXT_NODE) {
      total++;
    }
    else if (child.nodeType == document.ELEMENT_NODE) {
      total += countTextNodes(child);
    }
  });

  return total;
}

countTextNodes(document.body); // 7
```

La función `countTextNodes` recibe un nodo como parámetro. Para poder operar de forma más sencilla con los nodos hijos, se convierte la propiedad `childNodes` en un array. Si el nodo que tenemos no es del tipo `ELEMENT_NODE` la función termina porque los nodos de tipo texto y de tipo comentario no tienen nodos hijos. Después se recorren todos los nodos hijos usando la función `forEach` de los objetos array. Por cada nodo hijo, se comprueba su tipo, si es de tipo texto, se suma 1 al total. Si el nodo es un elemento HTML, se vuelve a llamar a la función `countTextNodes` pasándo como argumento el nodo hijo actual. El resultado de esta llamada se acumula en el total. El resultado de esta función puede parecer erróneo. Pero hay que tener en cuenta que los navegadores cuenta cada salto de línea entre dos etiquetas como un nodo de texto vacío.

Esto se puede solucionar usando la propiedad `nodeValue`. En los nodos de tipo texto, esta propiedad contiene un string con el texto del nodo. Para comprobar que el nodo contiene algo se usa la expresión regular `/\S/`. Con esta expresión regular se puede saber si el texto contiene algún caracter que no sea de espacio, salto de línea o tabulación.

```
function countTextNodes(node) {
  var children = Array.prototype.slice.call(node.childNodes);
  var total = 0;

  if (node.nodeType != document.ELEMENT_NODE && /\S/.test(child.nodeValue)) {
    return total;
  }

  children.forEach(function(child) {
    if (child.nodeType == document.TEXT_NODE) {
      total++;
    }
    else if (child.nodeType == document.ELEMENT_NODE) {
      total += countTextNodes(child);
    }
  });

  return total;
}

countTextNodes(document.body); // 4
```

## Seleccionar nodos del DOM

Se puede recorrer el DOM usando las propiedades anteriores. Pero encontrar un nodo específico de esta forma puede ser muy costoso.

Para esto hay unos métodos que tienen todos los nodos. Los métodos son `getElementsByTagName`, `getElementById` y `getElementsByClassName`. Estos métodos buscan nodos dentro del DOM. Se pueden usar sobre un nodo o sobre el objeto `document`. Cuando se usan sobre `document` el resultado se busca por todo el DOM. Si se usan en un nodo específico, la búsqueda empezará en los hijos del nodo e irá bajando niveles.

Los resultados de estos métodos se actualizan con los cambios al DOM. Por ejemplo, si obtenemos un nodo con `getElementById` y ese nodo lo modifica otro script, el cambio se verá reflejado en el objeto que hemos obtenido.

### getElementsByTagName

Este método recibe como argumento un string con el nombre del tag que se quiere buscar. Devuelve un objeto similar a un `NodeList` con todos los nodos con el nombre del tag.

```
<p>A paragraph with a <a href="#">link</a></p>

<script>
  var linkList = document.getElementsByTagName('a');
  
  console.log(linkList[0]); // <a href="#">link</a>
</script>
```

### getElementsByClassName

Es igual que `getElementsByTagName`, pero devuelve una lista de nodos que tengan la clase que se le ha pasado como argumento.

```
<p class="justify">A paragraph with a <a href="#">link</a></p>
<p class="justify">Another paragraph without a link</p>
<div class="justify">A justified div</div>

<script>
  var justifiedNodes = document.getElementsByClassName('justify');
  
  console.log(justifiedNodes); // <p clas="justify">...</p>, <p clas="justify">...</p>, <div clas="justify">...</div>
</script>
```

### getElementById

Este método recibe como argumento un string con el id de algún elemento HTML. Devuelve como resultado el nodo que tenga ese id.

```
<p class="justify">A paragraph with a <a href="#">link</a></p>
<p class="justify" id="the-paragraph">Another paragraph without a link</p>

<script>
  var theParagraph = document.getElementById('the-paragraph');
  
  console.log(theParagraph); // theParagraph
</script>
```

## Seleccionar nodos con selectores CSS

Además de poder obtener nodos del DOM con los métodos anteriores, también se pueden obtener usando selectores CSS. Estos métodos son `querySelector` y `querySelectorAll`.

El funcionamiento de los dos métodos es igual. Se les pasa un string con un selector CSS como argumento. El resultado que devuelven es distinto. El método `querySelector` devuelve el primer nodo que coincida con el selector. `querySelectorAll` devuelve un `nodeList` con todos los nodos que coincidan con el selector.

A diferencia de los métodos anteriores, los objetos que devuelve estos, no se actualizan con los cambios al DOM.

```
<p class="justify">A paragraph with a <a href="#">link</a></p>
<p class="justify" id="the-paragraph">Another paragraph without a link</p>

<script>
  var paragraphs = document.querySelectorAll('p');
  var firstParagraph = document.querySelector('p');
  
  console.log(paragraphs); // <p class="justify">...</p>, <p class="justify" id="the-paragraph">...</p>
  console.log(firstParagraph); // <p class="justify">...</p>
</script>
```

## Fuentes

* [Eloquent Javascript](http://eloquentjavascript.net/).
* [Professional JavaScript for web developers](http://www.amazon.es/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691)
* [https://developer.mozilla.org/en/docs/Web/API/Node/nodeType](https://developer.mozilla.org/en/docs/Web/API/Node/nodeType)
* [https://developer.mozilla.org/en-US/docs/Web/API/NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
* [https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
* [https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)
* [https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
* [https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
