---
title: "JavaScript: solucionando el reto de Wes Bos"
date: 2016-02-15
tags: javascript
template: post.html
---

# JavaScript: solucionando el reto de Wes Bos

El día 2 de Febrero de 2016 Wes Bos [lanzó un reto por Twitter](https://twitter.com/wesbos/status/694530601286676480). Este reto consistía en que cuando se haga clic en un checkbox, se pulsa la tecla shift y se hace clic en otro checkbox, se tienen que marcar todos los checkbox entre estos dos. La descripción del reto y el código con la solución de Wes Bos se puede encontrar [aquí](http://codepen.io/wesbos/pen/zrLjYq).

Para conseguir superar el reto, lo primero que hice fue crear una función autoejecutable o IIFE para aislar el código del resto de la página.

```
(function init(window, document) {})(window, document);
```

A la función autoejecutable le paso el objeto window y document que el intérprete no tenga que buscar estas variables en todos los ámbito de ejecución superiores.

El siguiente paso fue crear unas variables locales a la función autoejecutable. Estas variables se usarán dentro de otras funciones closure que se declararán después.

```
var shiftKey = false;
var checkboxes;
var lastCheckedIndex;
```

La variable `shiftKey` contiene un valor booleano que indica si la tecla shift está pulsada. La variable `checkboxes` será un array con todos los checkbox. La última variable, `lastCheckedIndex`, va a contener el índice, dentro del array `checkboxes`, del último checkbox que se ha marcado.

Lo primero que se necesita es rellenar la variable `checkboxes` con todos los checkbox de la página. Esto lo hice usando el evento `load` del objeto `window`.

```
window.addEventListener('load', function onLoadHandler() {
  var checkboxNodeList = document.querySelectorAll('input[type="checkbox"]');
  checkboxes = Array.prototype.slice.call(checkboxNodeList);
});
```

Usando el método `addEventListener`, se enlaza una función al evento `load` del objeto `window`. Este evento ocurre cuando la página termine de cargar, así nos aseguramos de que cuando se ejecute el navegador ya habrá cargado todos los checkbox. Dentro de la función que se ejecuta cuando ocurre el evento, se obtienen todos los checkbox usando `querySelectorAll`. Este método devuelve un objeto `NodeList` que contiene todos los checkbox. Los objetos de tipo `NodeList` se pueden usar de forma parecida a un array, pero no son arrays, pasa lo mismo que con el objeto `arguments` de las funciones. Para convertirlo en un array, con el que va a ser más fácil operar, se usa el método `call` para llamar al método `slice` del prototipo del objeto `Array`.

Para detectar si la tecla shift está pulsada, se usan los eventos `keydown` y `keyup`. El evento `keydown` se ejecuta cuando se pulsa una tecla y el evento `keyup` cuando se suelta una tecla.

```
document.addEventListener('keydown', function keydownHandler(event) {
  if (event.keyCode == 16) {
    shiftKey = true;
  }
});

document.addEventListener('keyup', function keyupHandler(event) {
  if (event.keyCode == 16) {
    shiftKey = false;
  }
});
```

Las funciones de los eventos `keydown` y `keyup` tienen un parámetro `event`. Este parámetro se pasa automáticamente a todas las funciones que se usan como manejadores de eventos. Usando la propiedad `keyCode` del objeto `event` se puede saber que tecla se acaba de pulsar. Cada tecla tiene un código numérico distinto, el de la tecla shift es el 16.
El funcionamiento es el siguiente. Cuando se pulsa una tecla, si es la tecla shift se asigna el valor `true` a la variable `shiftKey`. Cuando se suelta una tecla, si es la tecla shift se vuelve a poner el valor `false` a la variable `shiftKey`.

El último paso es marcar todos los checkbox que estén entre los dos últimos que se marcaron. Para conseguir esto se puede usar el evento `click` o el evento `change` de los checkbox. Yo he elegido el evento change porque está pensado para indicar que ha cambiado el valor del checkbox. El evento click tendría la ventaja de que en el objeto `event` va a existir la propiedad `shiftKey` que indica si está pulsada la tecla shift.

```
document.addEventListener('change', function changeHandler(event) {
  var target = event.target;

  if (target.tagName.toLowerCase() == 'input' && target.type == 'checkbox') {
    var targetIndex = checkboxes.indexOf(target);

    if (target.checked && shiftKey && lastCheckedIndex != null) {
      checkboxes
        .slice(
          Math.min(targetIndex, lastCheckedIndex) + 1,
          Math.max(targetIndex, lastCheckedIndex)
        )
        .forEach(function(item) {
          item.checked = true;
        });
    }
    
    lastCheckedIndex = target.checked ? targetIndex : null;
  }
});
```

Lo primero que se hace en este evento es comprobar si el evento change ha ocurrido en un checkbox. Para esto se usa la propiedad `target` del objeto `event`, que contiene el elemento que ha provocado el evento. Con las propiedades `tagName` y `type` del objeto `target` se puede saber si el elemento es un `input` y si es de tipo `checkbox`. Después, usando el método `indexOf`, se obtine el índice que ocupa el checkbox dentro del array `checkboxes`. Lo siguiente es comprobar si el checkbox se ha marcado, la tecla shift estaba pulsada y se tiene el índice del último checkbox que se ha marcado. Si esta comprobación da como resultado `true`, usando el método `slice`, se crea un array con todos los checkbox que hay entre el que se acaba de marcar y el último que se marcó. Se recorre este array usando el método `forEach` para marcar todos los checkbox. Lo último que se hace en el evento change es guardar, en la variable `lastCheckedIndex`, el índice del checkbox que ha lanzado el evento `change`, siempre que este checkbox se haya marcado y no desmarcado. En caso de que el checkbox haya sido desmarcado, se asigna el valor `null` a la variable `lastCheckedIndex`. Esto sirve para que no se marquen checkbox si lo último que se hizo fue desmarcar antes de marcar uno con la tecla shift pulsada.

El código completo queda así:

```
(function init(window, document) {
  var shiftKey = false;
  var checkboxes;
  var lastCheckedIndex;

  window.addEventListener('load', function onLoadHandler() {
    var checkboxNodeList = document.querySelectorAll('input[type="checkbox"]');
    checkboxes = Array.prototype.slice.call(checkboxNodeList);
  });

  document.addEventListener('change', function changeHandler(event) {
    var target = event.target;

    if (target.tagName.toLowerCase() == 'input' && target.type == 'checkbox') {
      var targetIndex = checkboxes.indexOf(target);

      if (target.checked && shiftKey && lastCheckedIndex != null) {
        checkboxes
          .slice(
            Math.min(targetIndex, lastCheckedIndex) + 1,
            Math.max(targetIndex, lastCheckedIndex)
          )
          .forEach(function(item) {
            item.checked = true;
          });
      }
      
      lastCheckedIndex = target.checked ? targetIndex : null;
    }
  });

  document.addEventListener('keydown', function keydownHandler(event) {
    if (event.keyCode == 16) {
      shiftKey = true;
    }
  });

  document.addEventListener('keyup', function keyupHandler(event) {
    if (event.keyCode == 16) {
      shiftKey = false;
    }
  });
})(window, document);
```

Se pueden encontrar otras soluciones al reto [aquí](http://codepen.io/collection/DQbKJa/).
