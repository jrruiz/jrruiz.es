---
title: "JavaScript: espacios de nombres"
date: 2015-08-23
tags: javascript, objects
template: post.html
---

# JavaScript: espacios de nombres

Los espacios de nombres son una forma de agrupar variables, funciones y objetos. Usando espacios de nombres se reduce el número de globales que usa nuestra aplicación. También se reducen las sobrescrituras de variables y funciones por accidente.

En JavaScript no hay una sintaxis específica para usar espacios de nombres. Se puede conseguir un funcionamiento similar usando un objeto global. En este objeto global se añaden todas las variables, funciones y objetos de la aplicación. Además de esto se pueden añadir otros objetos que funcionen como espacio de nombres anidado.

    var app = {};

    app.teams = {};

    app.teams.okc = {
      name: 'Oklahoma City Thunder',
      players: []
    };
    app.teams[0].players.push({
      name: 'Kevin Durant',
      number: 35
    });

    app.getGamesWonByTeam = function(teamId) {
      // ...
    };

El objeto `app` es el espacio de nombres global que usa la aplicación. Dentro del espacio de nombres global, existe el objeto `teams` y la función `getGamesWonByTeam`. El objeto `teams` se está usando como un subespacio de nombres que contiene todos los equipos con sus jugadores.

Un problema de los espacios de nombres en JavaScript es la anidación de muchos niveles. Si se quiere organizar un espacio de nombres que contenga `app.associations.nba.teams.okc` habría que hacerlo así:

    var app = {
      associations: {
        nba: {
          teams: {
            okc: {
              ...
            }
          }
        }
      }
    };

Tener una estructura con tantos niveles puede ser muy costoso para añadir funcionalidades y para usarlas. En el libro [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do) se implementa una función para crear nuevos espacios de nombres y recorrerlos.

    var app = {
      namespace: function(nsString) {
        var parent = app;
        var parts = nsString.split('.');

        if (parts[0] === 'app') {
          parts = parts.slice(1);
        }

        parts.forEach(function(part) {
          if (typeof parent[part] === 'undefined') {
            parent[part] = {};
          }

          parent = parent[part];
        });

        return parent;
      }
    };

    app.namespace('associations.nba.teams.okc');

El método `namespace` del espacio de nombres global crea otros espacios de nombres y devuelve el de nivel más bajo de los que ha creado. Para crear espacios de nombres recibe un string separado por puntos. Cada una de las partes separadas por un punto es un espacio de nombres dentro del espacio de nombres global. El método recorre cada una de las partes y si el espacio de nombres no existe, lo crea. Después cambia la variable local `parent` para que contenga el último espacio de nombres creado. Cuando termina el método, devuelve el último espacio de nombres que se ha creado.

Si existen todos los espacios de nombres incluidos en el string que recibe el método `namespace`, el método sólo devuelve el espacio de nombres con un nivel más bajo de los que ha recibido.

    // el espacio de nombres existe, lo devuelve sin crear nada
    var okc = app.namespace('associations.nba.teams.okc');
    // el espacio de nombres no existe, lo crea y lo devuelve
    var sas = app.namespace('associations.nba.teams.sas');

## Declaración de dependencias

Cuando los espacios de nombres tienen muchos niveles, hay que escribir más código para llegar al objeto o función que queramos usar. Además de tener que escribir más, al intérprete de JavaScript también le costará más recorrer toda la esctructura del espacio de nombres para llegar al data que necesitemos.

Para evitar estos problemas, es buena idea declarar variables al inicio de las funciones, a las que se le asigne los objetos, funciones y variables que se quieran usar del espacio de nombres. Así, el intérprete de JavaScript sólo tendrá que recorrer el espacio de nombres una vez y queda claro qué partes del espacio de nombres usa la función.

    function foo() {
      var nbaTeams = app.associations.nba.teams;
      var manUPlayers = app.associations.fifa.teams.manU.players;
      // ...
    }

En la función `foo` se han declarado dos dependencias. La primera dependencia se ha asignado a la variable `nbaTeams`, la segunda a `manUPlayers`.

## Fuentes

* [https://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/](https://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/)
* [http://addyosmani.com/blog/essential-js-namespacing/](http://addyosmani.com/blog/essential-js-namespacing/)
* [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do)
