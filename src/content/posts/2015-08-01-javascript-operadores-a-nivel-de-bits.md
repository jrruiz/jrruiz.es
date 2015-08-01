---
title: "JavaScript: operadores a nivel de bits"
date: 2015-08-01
tags: javascript
template: post.html
---

# JavaScript: operadores a nivel de bits

Los operadores a nivel de bits son operadores matemáticos que trabajan con la repesentación binaria de número enteros. JavaScript representa todos los números como conjuntos de 64 bits. Para hacer las operaciones, los operadores a nivel de bits, convierten los números en enteros de 32 bits. El resultado de las operaciones lo devuelven como números de 64 bits.

Aunque en algunos lenguajes estos operadores son más rápidos que los operadores matemáticos normales, en JavaScript no es así. Incluso algunas operaciones son más rápidas usando los operadores matemáticos normales.

Para representar números negativos y positivos en 32 bits, se usa el primer bit de la izquierda como signo. Si el primer bit es 1, el número es negativo, si es 0 el número es positivo. El número entero más grande que se puede conseguir usando 32 bits es 2<sup>31</sup>-1 = 2147483647. El número entero más pequeño en 32 bits es -(2<sup>31</sup>) = -2147483648.

Los números negativos se convierten en enteros de 32 bits usando el complemento a 2 de su valor positivo. El complemento a 2 en binario de un número se calcula en tres pasos. En este ejemplo se quiere obtener la representación binaria de 32 bits del número -13:

1. Se obtiene el valor absoluto del número que se quiere convertir a binario.

    |-13| = 13 -> 0000 0000 0000 0000 0000 0000 0000 1101

2. Se invierte el valor de todos los bits del número en binario.

    0000 0000 0000 0000 0000 0000 0000 1101 -> 1111 1111 1111 1111 1111 1111 1111 0010

3. Se suma 1 al resultado binario de invertir todos los bits.

    1111 1111 1111 1111 1111 1111 1111 0010 + 1 = 1111 1111 1111 1111 1111 1111 1111 0011    

El equivalente a -13 en binario de 32 bits es 11111111111111111111111111110011.

Hay siete operadores a nivel de bits en JavaScript.

1. AND (x & y)
2. OR (x | y)
3. XOR (x ^ y)
4. NOT (~ x)
5. Desplazamiento a la izquierda (x << y)
6. Desplazamiento a la derecha (x >> y)
7. Desplazamiento a la derecha con cambio de signo (x >>> y)

Estos operadores también se pueden combinar con el operador de asignación. Es lo mismo `x = x & 5` que `x &= 5`.

## AND (x & y)

El operador `AND` compara los bits de dos números y devuelve otro número con un **1 en las posiciones donde los otros dos números tienen un 1**. Este operador se representa con el un ampersand `&`.

|x|y|Resultado|
|:-:|:-:|:-:|
|0|0|0|
|1|0|0|
|0|1|0|
|1|1|1|

Siguiendo la tabla de verdad del operador `AND`, si se hace la operación `13 & 7` se obtiene 5.

    13 & 7; // 5

        0000 0000 0000 0000 0000 0000 0000 1101 (13 decimal)
    AND 0000 0000 0000 0000 0000 0000 0000 0111 (7 decimal)
        ---------------------------------------
        0000 0000 0000 0000 0000 0000 0000 0101 (5 decimal)

## OR (x | y)

El operador `OR` compara los bits de dos números y devuelve otro número con un **1 en las posiciones donde alguno de los otros dos números tienen un 1**. Este operador se representa con una barra vertical `|`.

|x|y|Resultado|
|:-:|:-:|:-:|
|0|0|0|
|1|0|1|
|0|1|1|
|1|1|1|

Siguiendo la tabla de verdad del operador `OR`, si se hace la operación `13 | 7` se obtiene 15.

    13 | 7; // 15

       0000 0000 0000 0000 0000 0000 0000 1101 (13 decimal)
    OR 0000 0000 0000 0000 0000 0000 0000 0111 (7 decimal)
       ---------------------------------------
       0000 0000 0000 0000 0000 0000 0000 1111 (15 decimal)

## XOR (x ^ y)

El operador `XOR` compara los bits de dos números y devuelve otro número con un **1 en las posiciones donde sólo uno de los operandos tienen un 1**. Este operador se representa con un símbolo de acento circunflejo `^`.

|x|y|Resultado|
|:-:|:-:|:-:|
|0|0|0|
|1|0|1|
|0|1|1|
|1|1|0|

Siguiendo la tabla de verdad del operador `XOR`, si se hace la operación `13 ^ 7` se obtiene 10.

    13 ^ 7; // 15

        0000 0000 0000 0000 0000 0000 0000 1101 (13 decimal)
    XOR 0000 0000 0000 0000 0000 0000 0000 0111 (7 decimal)
        ---------------------------------------
        0000 0000 0000 0000 0000 0000 0000 1010 (10 decimal)

## NOT (~ x)
El operador `NOT` invierte los valores de todos los bits del número en el que opera. Una operación `NOT` sobre un número `x` da como resultado el **mismo número más 1 en negativo `(x + 1) * -1`**. Este operador se representa con un símbolo de tilde `~`.

|x|Resultado|
|:-:|:-:|
|0|1|
|1|0|

Siguiendo la tabla de verdad del operador `NOT`, si se hace la operación `~ 13` se obtiene -14.

    ~ 13; // 2

    NOT 0000 0000 0000 0000 0000 0000 0000 1101 (13 decimal)
      = 1111 1111 1111 1111 1111 1111 1111 0010 (-14 decimal)

## Desplazamiento a la izquierda (x << y)

Cuando se hace una operación de desplazamiento a la izquierda, se mueven todos los bits del número hacia la izquierda las posiciones que se indiquen. Para mover los bits hacia la izquierda, **se añaden tantos ceros a la derecha como posiciones haya que moverlos**. Al desplazar los bits hacia la izquierda el resultado puede tener un signo distinto que el número original. Esta operación se representa con dos símbolos de menor que `<<`.

Si se deplaza 3 posiciones a la izquierda los bits del número 45, se obtiene el número 360.

    45 << 3; // 360

      0000 0000 0000 0000 0000 0000 0010 1101 << 3 (45 << 3)
    = 0000 0000 0000 0000 0000 0001 0110 1000 (360 decimal)

Cuando se desplazan a la izquierda los bits de un número negativo, se consigue el mismo resultado, pero con distinto signo, que si se desplazan a la izquierda las mismas posiciones del número en positivo. La formula que define esta igualdad es `-x << y === -(x << y)`.

    -45 << 3; // -360

      1111 1111 1111 1111 1111 1111 1101 0011 << 3 (-45 << 3)
    = 1111 1111 1111 1111 1111 1110 1001 1000 (-360 decimal)

    45 << 3; // 360

      0000 0000 0000 0000 0000 0000 0010 1101 << 3 (45 << 3)
    = 0000 0000 0000 0000 0000 0001 0110 1000 (360 decimal)

## Desplazamiento a la derecha (x >> y)

Cuando se hace una operación de desplazamiento a la derecha, se mueven todos los bits del número hacia la derecha las posiciones que se indiquen. Para mover los bits hacia la derecha, **se eliminan tantos bits de la derecha como posiciones haya que moverlos**. Esta operación se representa con dos símbolos de mayor que `>>`.

Usando este operador siempre se mantiene el signo del número desplazado. Si es negativo, el resultado será negativo, si es positivo, el resultado será positivo. Se añaden ceros a la izquierda si el número es positivo. Si el número es negativo se añaden unos a la izquierda.

Si se deplaza 3 posiciones a la derecha los bits del número 45, se obtiene el número 5.

    45 >> 3; // 5

      0000 0000 0000 0000 0000 0000 0010 1101 >> 3 (45 >> 3)
    = 0000 0000 0000 0000 0000 0000 0000 0101 (5 decimal)

Al desplazar a la derecha los bits de un número negativo, se consigue el mismo resultado que si se hace una operación `NOT` sobre el resultado de desplazar a la derecha las mismas posiciones del mismo número en positivo. Esto se puede resumir con la fórmula `-x >> y === ~ (x >> y)`.

    -45 >> 3; // -6

      1111 1111 1111 1111 1111 1111 1101 0011 >> 3 (-45 >> 3)
    = 1111 1111 1111 1111 1111 1111 1111 1010 (-6 decimal)

    ~(45 >> 3); // -6

      0000 0000 0000 0000 0000 0000 0010 1101 >> 3 (45 >> 3)
    = 0000 0000 0000 0000 0000 0000 0000 0101 (5 decimal)
    NOT 0000 0000 0000 0000 0000 0000 0000 0101
      = 1111 1111 1111 1111 1111 1111 1111 1010 (-6 decimal)

## Desplazamiento a la derecha con cambio de signo (x >>> y)

Esta operación es igual que un desplazamiento a la derecha normal, pero el resultado puede tener un signo distinto que el del número original. Esto pasa porque este desplazamiento siempre añade ceros a la izquierda. Cualquier número negativo que use esta operación dará como resultado un número positivo. Esta operación se representa con tres símbolos de mayor que `>>>`.

Si se desplazan una posición los bits del número más pequeño en 32 bits, se obtiene un número positivo. El número más pequeño en 32 bits es el `-2147483648` que en binario se representa `1000 0000 0000 0000 0000 0000 0000 0000`.

    -2147483648 >>> 1; // 1073741824
    
      1000 0000 0000 0000 0000 0000 0000 0000 >>> 1 (-2147483648 >>> 1)
    = 0100 0000 0000 0000 0000 0000 0000 0000 (1073741824 decimal)

## Ejemplo

Uno de los casos de uso más comunes es el de convertir un color rgb en hexadecimal. Los colores rgb están compuestos de tres número. Cada uno de estos números va desde el 0 hasta el 255. Cada número indica la cantidad de rojo, verde o azul que tiene.

    var rgb = {
      r: 92,
      g: 131,
      b: 175
    };

Un color en hexadecimal es igual que uno rgb, pero usa sólo un número hexadecimal, en vez de tres como el rgb. En los colores hexadecimales, cada uno de los componentes de un color rgb se representan con dos cifras. Por ejemplo el color `rgb(255, 0, 0)` es el `FF0000` en hexadecimal. Si se representa este número en hexadecimal, se obtiene lo siguiente.

    FF0000 -> 0000 0000 1111 1111 0000 0000 0000 0000

Aquí se ve que cada color usa dos grupos 8 bits para su representación, lo que da el total de 256 ó 2<sup>8</sup> valores posibles.

Sabiendo esto se pueden usar los operadores a nivel de bits para convertir un color rgb a decimal.

    var rgb = {
      r: 92, // 0101 1100
      g: 131, // 1000 0011
      b: 175 // 1010 1111
    };

    var r = rgb.r << 16; // 0000 0000 0101 1100 0000 0000 0000 0000
    
    var g = rgb.g << 8; // 0000 0000 0000 0000 1000 0011 0000 0000
    
    var b = rgb.b; // 0000 0000 0101 1100 0000 0000 1010 1111
    
    var decimal = r | g | b; // 0000 0000 0101 1100 1000 0011 1010 1111 (6063023 decimal)

Como el color rojo ocupa los bits desde el 23 hasta el 16, hay que desplazat¡r

Teniendo el color en decimal, se puede convertir en hexadecimal usando el método `toString` del objeto number, pasándole como argumento la base del número que queremos obtener.

    decimal.toString(16); // '5c83af'

A partir del color decimal también se puede conseguir la cantidad de uno de los tres colores que componen este color. Para hacer esto se usa el desplazamiento a la derecha, una máscara de 8 bits y el operador `AND`.

    var decimal = 6063023 -> 0000 0000 0101 1100 1000 0011 1010 1111
    var mask = 255; // 0000 0000 0000 0000 0000 0000 1111 1111

    // 0000 0000 0000 0000 0000 0000 0101 1100 & 1111 1111
    var r = (decimal >>> 16) & mask; // 0101 1100 (92 decimal)

    // 0000 0000 0000 0000 0101 1100 1000 0011 & 1111 1111
    var g = (decimal >>> 8) & mask; // 1000 0011 (131 decimal)

    // 0000 0000 0101 1100 1000 0011 1010 1111 & 1111 1111
    var b = decimal & mask; // 1010 1111 (175 decimal)

En el ejemplo se ve que para conseguir la cantidad de un color, se hace la operación inversa que para convertir un color rgb en decimal. Primero se hace un desplazamiento a la derecha del número de bits que ocupe el color y después se usa la máscara de bits para obtener el valor.

Este uso de los operadores a nivel de bits es muy útil para componer número a partir de otros más pequeños y después obtener el valor de cada componente.

## Fuentes

* [http://code.tutsplus.com/articles/understanding-bitwise-operators--active-11301](http://code.tutsplus.com/articles/understanding-bitwise-operators--active-11301)
* [https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
* [http://michalbe.blogspot.com.es/2013/03/javascript-less-known-parts-bitwise.html](http://michalbe.blogspot.com.es/2013/03/javascript-less-known-parts-bitwise.html)
* [https://en.wikipedia.org/wiki/Bitwise_operation](https://en.wikipedia.org/wiki/Bitwise_operation)
* [http://danthedev.com/2015/07/25/binary-in-javascript/](http://danthedev.com/2015/07/25/binary-in-javascript/)
* [http://graphics.stanford.edu/~seander/bithacks.html](http://graphics.stanford.edu/~seander/bithacks.html)
* [Professional JavaScript for web developers](http://www.amazon.es/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691)
