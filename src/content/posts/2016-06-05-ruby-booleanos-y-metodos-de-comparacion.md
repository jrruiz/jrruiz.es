---
title: "Ruby: booleanos y métodos de comparación"
date: 2016-06-05
tags: ruby, booleans, comparisons
template: post.html
---

# Ruby: booleanos y métodos de comparación

Los booleanos en Ruby son los valores `true` y `false`. Los valores booleanos indican si una expresión es verdadera o falsa. Los booleanos son objetos igual que los demás valores en Ruby.

Los valores booleanos se generan cuando se comparan dos valores. Por ejemplo si se comparan dos números para saber cuál es mayor. Para hacer comparaciones se usan los métodos de comparación.

Los métodos de comparación básicos en Ruby son `==`, `!=`, `<`, `>`, `<=` y `>=`.

El método `==` comprueba si dos objetos son iguales. El contrario a este es `!=` que indica si dos objetos no son iguales. También existen el método `eql?` que es igual que `==`.

```
1 == 1
=> true

1.eql? 1
=> true

1 == 2
=> false

1 != 2
=> true

"hola" == "hola"
=> true

"hola" == "adios"
=> false

"hola" != "adios"
=> true
```

El método `<` comprueba si el objeto a su izquierda es menor que el de la derecha. El contrario a este método es `>` que comprueba si el objeto de la izquierda es mayor que el de la derecha. Con los objetos de tipo string, estos métodos indican como menor al string que va antes alfabéticamente.

```
1 < 2
=> true

1 > 2
=> false

1 < 1
=> false

"perro" > "gato"
=> true
```

El método `<=` comprueba si el objeto de la izquierda es menor o igual que el de la derecha. El método contrario es `>=` que indica si el objeto de la izquierda es mayor o igual que el de la derecha. Igual que los dos métodos anteriores, estos indican como menor al string que va antes alfabéticamente.

```
1 <= 2
=> true

1 >= 2
=> false

1 <= 1
=> true

"perro" >= "gato"
=> true

"gato" <= "gato"
=> true
```

Hay un método más de comparación especial que no devuelve un valor booleano. El método es `<=>`. Este método devuelve `-1` si el objeto de la izquierda es menor que el de la derecha, `0` si son iguales y `1` si el objeto de la derecha es menor que el de la izquierda.

```
1 <=> 2
=> -1

1 <=> 1
=> 0

1 <=> 0
=> 1
```

## Operadores booleanos

Los operadores booleanos pueden modificar el resultado de una expresión booleana.

### AND

El operador booleano AND se escribe en Ruby usando `&&` o la palabra clave `and`. Este operador se usa entre dos expresiones booleanas. Devuelve `true` sólo si las dos expresiones devuelven `true`. Si alguna de ellas devuelve `false`, el operador AND devolverá `false`.

```
1 > 0 && 1 < 2
=> true

1 > 0 && 1 > 2
=> false

1 > 0 && 1 < 2 && 3 < 2
=> false
```

### OR

El operador OR se escribe usando `||` o la palabra clave `or`. Este operador se usa entre dos expresiones booleanas, igual que el AND. Devuelve `true` si alguna de las dos expresiones devuelve `true`. Sólo devuelve `false` si las dos expresiones devuelven `false`.

```
1 > 0 || 1 < 2
=> true

1 > 0 || 1 > 2
=> true

1 > 2 || 3 < 2
=> false

(1 > 0 && 1 < 2) || 3 < 2
=> true
```

### NOT

El operador NOT se escribe `!`. Lo que hace es convertir un valor booleano en su contrario. Convierte las expresiones que dan como resultado `true` en `false` y viceversa.

```
!true
=> false

!false
=> true

1 > 2
=> false

!(1 > 2)
=> true

!1
=> false
```

Si se usa `!` dos veces seguidas siempre se obtiene el valor booleano real de la expresión.

```
!!(1 > 2)
=> true

!!false
=> false

!!1
=> true
```

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_06.html).
* [Ruby Monk](https://rubymonk.com/learning/books/4-ruby-primer-ascent/chapters/45-more-classes/lessons/105-equality_of_objects).
* [Techotopia](http://www.techotopia.com/index.php/Ruby_Operators).
