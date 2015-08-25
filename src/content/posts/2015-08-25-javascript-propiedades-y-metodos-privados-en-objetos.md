---
title: "JavaScript: propiedades y métodos privados en objetos"
date: 2015-08-25
tags: javascript, objects
template: post.html
---

# JavaScript: propiedades y métodos privados en objetos

En JavaScript todos los métodos y propiedades de los objetos son públicos. Esto quiere decir que se puede acceder a ellos y modificarlos desde fuera del propio objeto.

    var player = {
      name: 'Kevin Durant',
      getName: function() {
        return this.name;
      }
    };

    function Language() {
      this.name = 'Spanish';
      this.getName = function() {
        return this.name;
      };
    }
    var lang = new Language();

    player.name; // 'Kevin Durant'
    player.getName(); // 'Kevin Durant'

    lang.name; // 'Spanish'
    lang.getName(); // 'Spanish'

En el ejemplo, se puede acceder al método y la propiedad de los objetos porque son públicos. A parte de acceder a estos miembros de los objetos, también se puede cambiar su valor.

    var player = {
      name: 'Kevin Durant',
      getName: function() {
        return this.name;
      }
    };

    player.name = 'Stephen Curry';
    player.getName = 'getName redefined';
    player.name; // 'Stephen Curry'
    player.getName(); // Error: player.getName is not a function

Como el método `getName` del objeto `player` es público, se puede cambiar su valor por algo que no sea una función. Si se hace esto, al intentar usarlo como un método, dará un error. Esto puede romper funcionalidades que esperan que `getName` sea de tipo función.

Aunque el lenguaje no tenga una sintaxis específica para declarar propiedades y métodos privados en los objetos, se pueden implementar usando closures. Para conseguir esta funcionalidad, se aprovecha que las closures recuerdan el ámbito en el que fueron creadas.

## Miembros privados en constructores

La forma más sencilla de implementar propiedades y métodos privados es usando constructores. Sólo hay que declarar la propiedad o el método como una variable o closure dentro de la función constructor.

    function Player() {
      // private
      var firstname = 'Kevin';
      // private
      var lastname = 'Durant';

      // private
      function getFirstName() {
        return firstname;
      }

      // private
      function getLastName() {
        return lastname;
      }

      // public
      this.getFullName = function() {
        return getFirstName() + ' ' + getLastName();
      };
    }
    var player1 = new Player();

    player1.getFullName(); // 'Kevin Durant'
    player1.firstname; // undefined
    player1.lastname; // undefined
    player1.getFirstName; // Error: player1.getFirstName is not a function

La función constructor `Player`, sólo tiene como miembro público el método `getFullName`. Cuando se intenta acceder a las variables `firstname` o `lastname`, se obtiene el valor `undefined` porque no pertenecen al objeto. A estas variables sólo tienen acceso las funciones closure `getFullName`, `getFirstName` y `getLastName`. Las funciones closure `getFirstName` y `getLastName` también se han definido como privadas. Sólo se puede acceder a ellas desde dentro del constructor.

Si las variables `firstname` y `lastname` se definen como propiedades públicas del objeto, las funciones privadas no tendrán acceso a ellas. Las funciones privadas pueden acceder a las propiedades y métodos del objeto si se invocan con el método `apply` o `call`. También se pueden definir como una expresión de función y después usar el método `bind` para que su objeto `this` sea el objeto que se ha creado con el constructor.

    function Player() {
      // private
      this.firstname = 'Kevin';
      // private
      this.lastname = 'Durant';

      // private
      var getFirstName = function() {
        return this.firstname;
      }.bind(this);

      // private
      function getLastName() {
        return this.lastname;
      }

      // public
      this.getFullName = function() {
        return getFirstName() + ' ' + getLastName.call(this);
      };
    }
    var player1 = new Player();

    player1.getFullName(); // 'Kevin Durant'
    player1.firstname; // 'Kevin'
    player1.lastname; // 'Durant'
    player1.getFirstName; // Error: player1.getFirstName is not a function

En este ejemplo, `firstname` y `lastname` son propiedades del objeto `player1`. Para que las funciones privadas puedan acceder a estas propiedades, hay que asignar a su objeto `this` el objeto creado con el constructor. La función `getFirstName` se ha creado como una expresión de función, para asignarle el valor de `this` se ha usado el método `bind`. La función `getLastName` se ha creado como una función closure normal. Para que funcione bien hay que invocarla con el método `call` o `apply` para asignarle el valor de `this`.

## Miembros privados en objetos literales

Para implementar miembros privados en un objeto creado con notación literal, se puede usar una IIFE donde se declaren las variables y funciones privadas, además del propio objeto. De esta forma todos los métodos del objeto tienen acceso a los miembros privados.

    var player;
    (function() {
      // private
      var firstname = 'Kevin';
      // private
      var lastname = 'Durant';

      // private
      function getFirstName() {
        return firstname;
      }

      // private
      function getLastName() {
        return lastname;
      }

      // using the global variable
      player = {
        // public
        getFullName: function() {
          return getFirstName() + ' ' + getLastName();
        }
      };
    })();

    player.getFullName(); // 'Kevin Durant'

Las variables `firstname` y `lastname` sólo son visibles dentro de la IIFE, igual que las funciones `getFirstName` y `getLastName`. La variable `player` que se usa dentro de la IIFE, es la variable global que se declaró antes de ejecutar la IIFE. Como el método `getFullName` se declaró dentro de la IIFE, tiene acceso a todas las variables y funciones creadas dentro de ella.

Se puede conseguir el mismo efecto que en el ejemplo anterior si en vez de usar una variable global, se asigna el valor devuelto por la IIFE a la variable que contendrá el objeto. En este caso la IIFE tiene que devolver el objeto en vez de asignarlo a una variable.

    var player = (function() {
      // private
      var firstname = 'Kevin';
      // private
      var lastname = 'Durant';

      // private
      function getFirstName() {
        return firstname;
      }

      // private
      function getLastName() {
        return lastname;
      }

      return {
        // public
        getFullName: function() {
          return getFirstName() + ' ' + getLastName();
        }
      };
    })();

    player.getFullName(); // 'Kevin Durant'

Se pueden implementar miembros privados en prototipos usando las mismas técnicas que para los objetos literales.

    function Player() {
      // private
      var firstname = 'Kevin';
      // private
      var lastname = 'Durant';

      // public
      this.getFullName = function() {
        return firstname + ' ' + lastname;
      };
    }

    Player.prototype = (function() {
      // private
      var teamName = 'Oklahoma City Thunder';

      return {
        // public
        getTeamName: function() {
          return teamName;
        }
      };
    })();

    var player1 = new Player();

    player1.getFullName(); // 'Kevin Durant'
    player1.getTeamName(); // 'Oklahoma City Thunder'

## Objetos privados

Cuando se devuelve una de las variables privadas de un objeto, se devuelve su valor en caso de que sea un dato primitivo. Pero si lo que se devuelve es de tipo objeto o array, lo que se estará pasando es la referencia al objeto. De esta forma el objeto privado se podrá modificar desde fuera del objeto.

    var player = (function() {
      var team = {
        name: 'Oklahoma City Thunder',
        abbreviation: 'okc',
        city: 'Oklahoma',
        country: 'USA'
      };

      return {
        name: 'Kevin Durant',
        getTeam: function() {
          return team;
        }
      };
    })();

    var team = player.team;
    team.name = 'Golden State Warriors';
    player.team.name; // 'Golden State Warriors'

Para evitar que pase esto, se puede devolver un objeto que sea una copia del privado. En caso de que sea un array, se puede usar el método `slice` para crear una copia y devolverla. Si es un objeto, se puede devolver sólo las propiedades que se necesiten. También se puede devolver una copia completa del objeto, creada con `Object.assign` o una implementación propia de este método.

    function extend(target, source) {
      var value;

      if (source) {
        for (var key in source) {
          value = source[key];
          if (typeof source[key] !== 'undefined') {
            target[key] = value;
          }
        }
      }

      return target;
    }

    var player = (function() {
      var team = {
        name: 'Oklahoma City Thunder',
        abbreviation: 'okc',
        city: 'Oklahoma',
        country: 'USA'
      };

      return {
        name: 'Kevin Durant',
        getTeam: function() {
          return extend({}, team);
        }
      };
    })();

    var team = player.team;
    team.name = 'Golden State Warriors';
    player.team.name; // 'Oklahoma City Thunder'

En este ejemplo, el método `getTeam` devuelve una copia del objeto privado `team` usando la función `extend`. Como en este caso lo que se devuelve no es el objeto privado, aunque se hagan cambios sobre él, no se reflejan en el objeto privado `team`.

## Métodos privilegiados

Los métodos privilegiados son métodos públicos que tienen acceso a los miembros privados del objeto.

    var player = (function() {
      // private
      var firstname = 'Kevin';
      // private
      var lastname = 'Durant';

      return {
        // public privileged method
        getFullName: function() {
          return firstname + ' ' + lastname;
        }
      };
    })();

    player.getFullName(); // 'Kevin Durant'

El método `getFullName`, es un método privilegiado porque tiene acceso a las variables privadas `firstname` y `lastname`.

## Funciones privadas expuestas

Las funciones privadas expuestas, son funciones privadas normales, pero que se asignan a alguna propiedad pública del objeto. De esta forma pueden ser usadas fuera del objeto.

    var player = (function() {
      // private
      var firstname = 'Kevin';
      // private
      var lastname = 'Durant';

      // private
      function getFirstName() {
        return firstname;
      }

      // private
      function getLastName() {
        return lastname;
      }

      return {
        // public privileged method
        getFullName: function() {
          return getFirstName() + ' ' + getLastName();
        },
        // revealed private functions
        getFirstName: getFirstName,
        getLastName: getLastName
      };
    })();

    player.getFullName(); // 'Kevin Durant'
    player.getFirstName(); // 'Kevin'
    player.getFirstName = 'foo';
    player.getFullName(); // 'Kevin Durant'
    player.getFirstName(); // Error: player.getFirstName is not a function

Cuando se modifica el valor de la propiedad `getFirstName`,  que contiene a una de las funciones privadas expuestas, no afecta al método privilegiado `getFullName`, porque este sigue usando las funciones privadas.

## Fuentes

* [https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties)
* [http://robertnyman.com/2008/10/14/javascript-how-to-get-private-privileged-public-and-static-members-properties-and-methods/](http://robertnyman.com/2008/10/14/javascript-how-to-get-private-privileged-public-and-static-members-properties-and-methods/)
* [http://javascript.crockford.com/private.html](http://javascript.crockford.com/private.html)
* [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do)
