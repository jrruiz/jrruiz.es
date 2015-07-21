---
title: "JavaScript: cómo usar el modo estricto"
date: 2015-07-01
tags: javascript, strict mode
template: post.html
---

# JavaScript: cómo usar el modo estricto

El modo estricto desactiva funcionalidades perjudiciales y hace que el intérprete lance errores al usar código que puede dar problemas.

El modo estricto de JavaScript se puede activar escribiendo el string `'use strict';`. La ventaja de usar un string es que en compiladores antiguos de JavaScript, este string no dará ningún error, simplemente evaluará la expresión y continuará de forma normal.

Este modo se puede usar de forma global, colocándo el string al inicio del programa JavaScript.

    'use strict';
    function f1() {
      // usa el modo estricto
    }

    function f2() {
      // también usa el modo estricto
    }

También se puede colocar el string al inicio de una función para usar el modo estricto sólo en esa función.
    
    function f1() {
      'use strict';
      // usa el modo estricto
    }

    function f2() {
      // no usa el modo estricto
    }

Para usarlo en varias funciones sin tener que escribir el string en cada una de ellas, se puede utilizar el modo estricto en una IIFE.

    (function() {
      'use strict';
      function f1() {
        // usa el modo estricto
      }

      function f2() {
        // también usa el modo estricto
      }
    })();

La mejor forma de usar el modo estricto es dentro de una IIFE. Utilizándolo de esta forma, se evita que al concatenar varios archivos JavaScript se active el modo estricto en lugares donde no se quiere usar. O que no se active en lugares donde sí se quiere usar. Por ejemplo si el primer archivo de los que se concatenan usa el modo estricto, también se activará para los demás archivos.

    // archivo1.js
    'use strict';
    function f1() {}

    // archivo2.js
    // no usa el modo estricto
    function f2() {
      var arguments = []; // da un error aquí porque se ha activado el modo estricto en el primer archivo
    }

Pero si el primer archivo no usa el modo estricto, los demás archivos tampoco lo tendrán activado.

    // archivo2.js
    // no usa el modo estricto
    function f2() {
      var arguments = [];
    }

    // archivo1.js
    // en este archivo, al estar concatenado con el anterior, el modo estricto no está activo
    'use strict';
    function f1() {}

Para evitar estos problemas, la mejor forma de usarlo es dentro de una IIFE.

    // archivo1.js
    (function() {
      'use strict';
      // todo el código de esta IIFE se ejecutará en modo estricto
      function f1() {}
    })();

    // archivo2.js
    (function() {
      // este código no se ejecutará en modo estricto
      function f2() {
        var arguments = [];
      }
    )();

De esta forma al estar todo el código de cada archivo dentro de una IIFE, el modo estricto se puede usar de forma independiente para cada uno de ellos. Lo único que hay que tener en cuenta cuando se usa este método, es que el código de cada archivo no se va a ejecutar en el ámbito global, si no en el ámbito local de la IIFE.

## Fuentes:
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
* [https://docs.webplatform.org/wiki/javascript/directives/use_strict](https://docs.webplatform.org/wiki/javascript/directives/use_strict)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
