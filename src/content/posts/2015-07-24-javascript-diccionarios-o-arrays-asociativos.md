---
title: "JavaScript: diccionarios o arrays asociativos"
date: 2015-07-24
tags: javascript, objects
template: post.html
---

# JavaScript: diccionarios o arrays asociativos

Un diccionario o array asociativo es un objeto que asocia claves con valores. Es igual que un array, pero en un diccionario se puede usar cualquier valor como clave. En algunos lenguajes de programación existen estos objetos con el nombre de *hash* o *map*. En JavaScript, antes de EcmaScript 6, no había ningún objeto diseñado específicamente para actuar como un diccionario. Lo más parecido son los objetos, que asocian valores primitivos con un dato de cualquier tipo.

## Objetos como diccionarios

Se puede usar la notación literal de los objetos para usarlos como diccionarios. Se pueden recorrer las propiedades y valores almacenados en un objeto usando un bucle `for in`. Los bucles `for in` recorren las propiedades de los objetos asignando el nombre de la propiedad a una variable.

    var team = { pointGuard: 'Westbrook, shootingGuard: 'Waiters', smallForward: 'Durant', powerForward: 'Ibaka', center: 'Kanter' };
    var result = [];

    for (var position in team) {
      result.push(position + ': ' + team[position]);
    }

    result; // ['pointGuard: Westbrook', 'shootingGuard: Waiters', 'smallForward: Durant', 'powerForward: Ibaka', 'center: Kanter'];

Uno de los mayores problemas que tiene el uso de los objetos es que los objetos heredan propiedades de su prototipo. Las propiedades que hereda un objeto también se enumeran en el bucle `for in`.

    function Dictionary() {}

    Dictionary.prototype.set = function(key, value) {
      this[key] = value;
    }

    Dictionary.prototype.size = function() {
      var count = 0;

      for (var key in this) {
        count++;
      }

      return count;
    }

    var team = new Dictionary();

    team.size(); // 2
    team.set('Small forward', 'Durant');
    team.size(); // 3

Los objetos creados a partir de la clase `Dictionary` tienen el problema de que heredan los método `set` y `size`. Cuando queremos obtener el tamaño del diccionario, dentro del bucle `for in` también se enumeran los dos métodos heredados.

También puede darse el caso de las propiedades heredadas cuando se usa la forma literal para crear objetos. Puede que alguna librería de terceros haya implementado un método nuevo en el prototipo del objeto `Object`. En estos casos se puede usar `Object.create` pasando el valor `null` como primer argumento del método para crear un objeto sin prototipo.

    Object.prototype.myMethod = function() {
      return 'hello';
    }

    function countObjectProperties(obj) {
      var count = 0;
      for (var key in obj) {
        count++;
      }
      return count;
    }

    var team1 = {};
    var team2 = Object.create(null);

    countObjectProperties(team1); // 1
    countObjectProperties(team2); // 0

Cuando se cuentan las propiedades del objeto `team1`, creado usando la notación literal de objetos, se obtiene 1 como resultado, porque se cuenta el método `myMethod` que hereda del protitopo de `Object`. Si se hace lo mismo con el objeto `team2`, se obtiene 0 como resultado porque no hereda de ningún prototipo.

Si crea un objeto literal para usarlo como diccionario, se puede usar el método `hasOwnProperty`, para saber qué propiedades son del objeto y no heredadas.

    var team = { pointGuard: 'Stephen Curry' };
    team1.hasOwnProperty('toString'); // false
    team1.hasOwnProperty('pointGuard'); // true

La parte mala de usar este método en los diccionarios, es que se puede asignar una propiedad que se llame `hasOwnProperty` y rompa la funcionalidad del método. Para evitarlo, es conveniente almacenar una copia del método en una variable. A la función almacenada en la variable se la puede llamar usando el método `call` para asignar su objeto `this` al objeto sobre el que se quiera hacer la comprobación.

    var team1 = {};
    var team2 = {};
    var hasOwnPropertyCopy = Object.prototype.hasOwnProperty;

    team1.hasOwnProperty = 'Hello';
    team1.pointGuard = 'Stephen Curry';
    team1.hasOwnProperty('pointGuard'); // error
    
    team2.hasOwnProperty = 'Hello';
    team2.pointGuard = 'Rusell Westbrook';
    hasOwnPropertyCopy.call(team2, 'pointGuard'); // true

Otro de los inconvenientes de usar un objeto como diccionario es la propiedad especial `__proto__`. Esta propiedad almacena el prototipo del objeto. En algunos intérpretes de JavaScript esta propiedad se asigna incluso cuando se crea el objeto usando `Object.create(null)`. También puede pasar que se asigne una valor con la clave `__proto__` y se rompa la cadena de prototipos del objeto. Para evitar las incompatibilidades entre distintos intérpretes de JavaScript, se puede usar un constructor para los diccionarios que tenga un comportamiento especial con la clave `__proto__`. Este ejemplo se puede encontrar en el libro [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182).

    function Dictionary(elements) {
      this.elements = elements || {}; // inicialización del diccionario
      this.hasSpecialProto = false; // ¿se ha asignado una clave '__proto__'?
      this.specialProto = undefined; // valor de la clave '__proto__'
    }

    Dictionary.prototype.has = function(key) {
      if (key === '__proto__') {
        return this.hasSpecialProto;
      }
      return {}.hasOwnProperty.call(this.elements, key);
    }

    Dictionary.prototype.get = function(key) {
      if (key === '__proto__') {
        return this.specialProto;
      }
      return this.has(key) ? this.elements[key] : undefined;
    }

    Dictionary.prototype.set = function(key, value) {
      if (key === '__proto__') {
        this.hasSpecialProto = true;
        this.specialProto = value;
      }
      else {
        this.elements[key] = value;
      }
    }

    Dictionary.prototype.remove = function(key) {
      if (key === '__proto__') {
        this.hasSpecialProto = false;
        this.specialProto = undefined;
      }
      else {
        delete this.elements[key];
      }
    }

    var team = new Dictionary({ pointGuard: 'Westbrook' });
    
    team.has('pointGuard'); // true
    team.get('pointGuard'); // 'Westbrook'
    team.remove('pointGuard');
    team.has('pointGuard'); // false

    team.has('__proto__'); // false
    team.set('__proto__', 'my proto');
    team.get('__proto__'); // 'my proto'

## Objeto `Map`

Aunque se puede usar el constructor anterior para crear objetos diccionarios, en EcmaScript 6 existe el objeto `Map` para crearlos. El objeto `Map` es un objeto iterable, lo que quiere decir que se puede recorrer usando un bucle `for of`.

    var team = new Map();

Para insertar un nuevo valor con su clave se usa el método `set`. Se puede usar cualquier tipo de dato como clave, incluidos los objetos y funciones.

    var objectKey = {};
    var functionKey = function() {};

    team.set('Small forward', 'Kevin Durant');
    team.set(objectKey, 'object key value');
    team.set(functionKey, 'function key value');

Para obtener el valor asociado con una clave existe el método `get`. Si en una clave se ha usado un objeto o una función, en realidad lo que se almacena como clave es su referencia.

    team.get('Small forward') // 'Kevin Durant'
    
    team.get(objectKey); // 'object key value'
    team.get({}); // undefined; {} !== objectKey

    team.get(functionKey); // 'function key value'
    team.get(function() {}); // undefined; function() {} !== functionKey

También se pueden eliminar el valor de una clave con el método `delete`. Otro método para eliminar valores es `clear` que eliminar todas las claves y valores almacenados en el objeto. Se puede comprobar si se ha asociado algún valor con una clave usando el método `has`.

    team.has(objectKey); // true
    team.delete(objectKey); // true
    team.has(objectKey); // false

    team.has('Small forward'); // true
    team.clear();
    team.has('Small forward'); // false

La forma más sencilla de recorrer un objeto `Map` es usando el método `forEach` del objeto o un bucle `for of`. Usando el método `forEach` se recorren los valores del objeto en orden de inserción.

    var team = new Map();
    var forEachResult = [];
    var forOfResult = [];
    team.set('Point guard', 'Russell Westbrook');
    team.set('Small forward', 'Kevin Durant');
    team.set('Power forward', 'Serge Ibaka');

    team.forEach(function(value, key) {
      forEachResult.push(key + ': ' + value);
    });

    for (var [key, value] of team) {
      forOfResult.push(key + ': ' + value);
    }

    forEachResult; // ['Point guard: Russell Westbrook', 'Small forward: Kevin Durant', 'Power forward: Serge Ibaka']
    forOfResult; // ['Point guard: Russell Westbrook', 'Small forward: Kevin Durant', 'Power forward: Serge Ibaka']

Otras formas de recorrer un objeto `Map` es usando sus métodos que devuelven un objeto iterable. Uno de estos métodos es `entries`, que devuelve un objeto iterable en el que cada elemento es un array en el que el primer elemento es la clave y el segundo el valor.

    var teamEntries = team.entries();
    var result = [];

    for (var [key, value] of teamEntries) {
      result.push(key + ': ' + value);
    }

    result; // ['Point guard: Russell Westbrook', 'Small forward: Kevin Durant', 'Power forward: Serge Ibaka']

Las claves del objeto `Map` también se pueden obtener en forma de objeto iterable usando el método `keys`.
    
    var teamKeys = team.keys();
    var result = [];

    for (var key of teamKeys) {
      result.push(key);
    }

    result; // ['Point guard', 'Small forward', 'Power forward']

También se puede obtener un iterable de los valores usando el método `values`.

    var teamValues = team.values();
    var result = [];

    for (var value of teamValues) {
      result.push(value);
    }

    result; // ['Russell Westbrook', 'Kevin Durant', 'Serge Ibaka']

A parte de todos estos métodos, los objetos `Map` también tienen la propiedad `size` que devuelve el número de elementos que contiene el objeto.

    team.size; // 3

Usar el objeto `Map` es la mejor forma de crear un diccionario en JavaScript. El mayor inconveniente es que hay navegadores que todavía no han inplementado el objeto `Map` ni el bucle `for of`. Para saber la compatibilidad de estas características con cada uno de los motores de JavaScript se puede consultar [esta tabla](https://kangax.github.io/compat-table/es6/).

## Fuentes

* [http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets](http://wiki.ecmascript.org/doku.php?id=harmony:simple_maps_and_sets)
* [http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements](http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements)
* [http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects](http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
* [http://blog.xkoder.com/2008/07/10/javascript-associative-arrays-demystified/](http://blog.xkoder.com/2008/07/10/javascript-associative-arrays-demystified/)
* [http://www.less-broken.com/blog/2010/12/lightweight-javascript-dictionaries.html](http://www.less-broken.com/blog/2010/12/lightweight-javascript-dictionaries.html)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
