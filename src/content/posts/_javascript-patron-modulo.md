---
title: "JavaScript: el patrón módulo"
date: 2015-08-24
tags: javascript, objects
draft: true
template: post.html
---

# JavaScript: el patrón módulo

El patrón módulo en JavaScript consiste en usar IIFEs, closures y miembros privados para crear funcionalidades aisladas del ámbito global del programa.

Con este patrón se puede conseguir código reusable, organizado y más fácil de mantener. El código es reusable porque no ensucia el ámbito global, evitando que se sobrescriban funciones y variables globales creadas por alguna librería externa. Y es más organizado y fácil de mantener porque hace que el programa no sea una serie de funciones y variables repartidas por todo el código. Si no que cada funcionalidad pertenece a un módulo que contiene todas las funciones y variables que necesita.

    var module = (function() {
      // private variables
      var moduleName = 'My module';
      var moduleVersion = '1.0.0';

      // private function
      function getModuleVersion() {
        return moduleVersion;
      }

      // public API
      return {
        getVersion: function() {
          return getModuleVersion();
        },

        getName: function() {
          return moduleName;
        }
      };
    })();

    module.getVersion(); // '1.0.0'
    module.getName(); // 'My module'
    module.moduleVersion; // undefined
    module.name; // undefined
    module.getModuleVersion(); // error: module.getModuleVersion is not a function

En el ejemplo, la IIFE declara la función privada `getModuleVersion` y las variables privadas `moduleName` y `moduleVersion`. Como resultado devuelve un objeto con dos métodos. Este objeto es la API pública del módulo. Los métodos públicos del módulo son `getVersion` y `getName`. El método `getVersion` usa la función privada `getModuleVersion` del módulo para devolver su valor. El método `getName` devuelve el valor de la variable privada `moduleName`. Estas variables y funciones privadas no son accesibles desde el exterior del módulo. Si se intenta acceder directamente a ellos, se obtiene un error o el valor `undefined`.

## API pública del módulo

Lo más importante del módulo es lo que devuelve usando `return`. Como cualquier otra función, un módulo puede devolver un valor primitivo, un objeto o una función. Lo que devuelva la función que crea el módulo, será la API pública de este y contiene las propiedades, métodos y valores que se podrán usar desde fuera del módulo.

Como los módulos son funciones autoejecutables o IIFEs, se puede aprovechar esto para ejecutar algunas operaciones que sirvan para iniciar el módulo.

## Dependencias del módulo

Un módulo puede tener dependencias externas. Gracias a las IIFEs, se pueden pasar variables, funciones y objetos globales al módulo para su uso interno.

    var module = (function(document) {
      // private variables
      var moduleName = 'My module';
      var moduleVersion = '1.0.0';

      // private function
      function getModuleVersion() {
        return moduleVersion;
      }

      // public API
      return {
        getVersion: function() {
          return getModuleVersion();
        },

        getName: function() {
          return moduleName;
        },

        getDomNodes: function(selector) {
          if (document.querySelectorAll) {
            this.getDomNodes = function(selector) {
              return document.querySelectorAll(selector);
            };
          }
          else if (document.getElementsByTagName) {
            this.getDomNodes = function(tagName) {
              return document.getElementsByTagName(tagName);
            };
          }
          else {
            this.getDomNodes = function(selector) {
              console.log('getDomNodes warning: This browser does not support any type of query for an element');
              return { selector: selector };
            };
          }

          return this.getDomNodes(selector);
        }
      };
    })(document);

    module.getDomNodes('#element-id');

En este ejemplo, el módulo tiene como dependencia al objeto global `document`. Para declarar esta dependencia, se pasa el objeto `document` como argumento de la IIFE del módulo. Este objeto, se usa en el método público `getDomNodes` del módulo, que además es una función autodefinida. Al recibir el objeto `document` como parámetro, el módulo lo contiene como uno de sus miembros privados. De esta forma el intérprete de JavaScript puede acceder al objeto más rápido que si tiene que inspeccionar todos los ámbitos de ejecución hasta llegar al global para encontrarlo.

## Revelando el módulo

Un módulo revelado es un módulo normal, pero el objeto que devuelve revela funciones privadas del módulo. Este comportamiento es exactamente igual que cuando se expone de forma pública un método privado de un objeto.

    var module = (function() {
      // private variables
      var moduleName = 'My module';
      var moduleVersion = '1.0.0';

      // private function
      function getModuleVersion() {
        return moduleVersion;
      }

      // private function
      function getModuleName() {
        return moduleName;
      }

      // public API
      return {
        // reveals private functions of the module
        getModuleVersion: getModuleVersion,
        getModuleName: getModuleName
      };
    })();

Aquí las funciones privadas `getModuleVersion` y `getModuleName` se revelan al exterior del módulo a través de los métodos públicos con el mismo nombre.

Usar este patrón tiene como ventaja declarar todas las funciones como privadas y exponer al exterior sólo las necesarias como métodos públicos del módulo. Si en algún momento del desarrollo del módulo alguna de estas funciones se quiere dejar como privada, sólo habrá que eleminiarla del objeto que devuelve el módulo.

Si en el ejemplo anterior se quiere hacer que la función `getModuleName` sea privada, sólo habrá que eliminar la línea que la revela.

    var module = (function() {
      // private variables
      var moduleName = 'My module';
      var moduleVersion = '1.0.0';

      // private function
      function getModuleVersion() {
        return moduleVersion;
      }

      // private function
      function getModuleName() {
        return moduleName;
      }

      // public API
      return {
        getModuleVersion: getModuleVersion
      };
    })();

Hay que tener cuidado con la referencia al objeto `this` dentro de las funciones privadas que se revelen. Si más adelante alguna de estas funciones se quiere hacer privada, el objeto `this` se referirá al objeto global del programa. Esto puede hacer que se devuelvan valores erróneos o se sobrescriban variables globales.

    // globals
    var moduleName = 'My module';

    var module = (function() {
      // private function
      function getModuleVersion() {
        return this.moduleVersion;
      }

      // private function
      function getModuleName() {
        return this.moduleName;
      }

      // public API
      return {
        moduleVersion: '1.2.3',
        moduleName: 'The best module ever created',
        getModuleVersion: getModuleVersion,
        getModuleInfo: function() {
          return getModuleName() + ' ' + this.getMogetModuleVersion();
        }
      };
    })();

    module.getModuleInfo(); // My module 1.2.3

En el ejemplo se ve que al hacer que privada a la función `getModuleName`, si se usa dentro del objeto que devuelve el módulo, se obtiene el valor de la variable global `moduleName`.

## Usos avanzados del patrón módulo

## Fuentes

* [http://www.etnassoft.com/2011/04/11/el-patron-de-modulo-en-javascript-en-profundidad/](http://www.etnassoft.com/2011/04/11/el-patron-de-modulo-en-javascript-en-profundidad/)
* [http://www.etnassoft.com/2011/04/12/revealing-module-javascript/](http://www.etnassoft.com/2011/04/12/revealing-module-javascript/)
* [http://www.etnassoft.com/2011/04/18/ampliando-patron-modulo-javascript-submodulos/](http://www.etnassoft.com/2011/04/18/ampliando-patron-modulo-javascript-submodulos/)
* [http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)
* [http://toddmotto.com/mastering-the-module-pattern/](http://toddmotto.com/mastering-the-module-pattern/)
* [http://yuiblog.com/blog/2007/06/12/module-pattern/](http://yuiblog.com/blog/2007/06/12/module-pattern/)
* [JavaScript Patterns](http://shop.oreilly.com/product/9780596806767.do)
