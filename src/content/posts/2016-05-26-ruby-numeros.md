---
title: "Ruby: números"
date: 2016-05-26
tags: ruby, data types
template: post.html
---

# Ruby: números

En Ruby hay dos tipos de números, integers y floats.

Los que no tienen decimales son enteros o `integers`. Ejemplos de números enteros:

```
1
9348574
```

Los números con decimales se llaman `floats`. Se escriben con un punto para separar la parte entera de la decimal. Ejemplos de números decimales:

```
1.567
3.14
```

Se pueden usar números decimales en notación científica usando la letra `e` seguida del exponente. El número `1e2` en notación científica es igual a `100.0`.

Los números que empiezan con un guión son negativos.

```
-123
-1.47
```

No se pueden usar comas en los números. Se pueden separar los miles de un número con un guión bajo `123_456_789`.

Se puede cambiar el tipo de número de entero a decimal y viceversa. Para hacer que un número decimal sea entero se usa `.to_i`. Para que un número entero sea decimal se usa `.to_f`.

```
3.141592.to_i
=> 3

2.to_f
=> 2.0
```

## Operaciones matemáticas

Se pueden hacer operaciones matemáticas con Ruby usando los operadores `+ - * / % **`. Para sumar se usa `+`, para las restas `-`. Las multiplicaciones se hacen con `*` y las divisiones con `/`. El operador `%`, se conoce como módulo, da como resultado el resto de la división de dos números. El operador `**` sirve para hacer una exponenciación o elevar un número a una potencia.

```
1 + 1
=> 2

4 - 9
=> -5

2 * 2
=> 4

19 / 2
=> 9

19 % 2
=> 1

3 ** 4
=> 81
```

La división operación da como resultado 9. Esto es porque Ruby devuelve un resultado del mismo tipo que los números con los que se opera. Para que de un resultado decimal, al menos uno de los números tiene que ser decimal.

```
19 / 2.0
=> 9.5
```

Se pueden combinar varias operaciones en una misma expresión. También se pueden usar paréntesis para hacer operaciones más complejas.

```
5 + 1 * 2
=> 7

(5 + 1) * 2
=> 12
```

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_01.html).
* [Why's (Poignant) Guide to Ruby](http://poignant.guide/book/chapter-3.html).
* [Ruby Explained: Numbers, Operators and Expressions](http://www.eriktrautman.com/posts/ruby-explained-numbers-operators-and-expressions).
