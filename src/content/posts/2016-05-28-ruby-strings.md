---
title: "Ruby: strings"
date: 2016-05-28
tags: ruby, data types
template: post.html
---

# Ruby: strings

Los strings son caracteres rodeados por comillas dobles o simples.Se puede crear un string vacío poniendo la comilla de inicio del final sin nada entre medias.

```
"Esto es un string con comillas dobles!"
=> Esto es un string con comillas dobles!

'Esto es un string con comillas simples!'
=> Esto es un string con comillas simples!

""
=> 
```

Los strings pueden contener cualquier tipo de caracter. Para usar comillas dentro de un string, hay que escaparlas poniendo una barra invertida delante. Sólo se necesita hacer esto si las comillas son iguales que las que rodean al string.

```
"string con \"comillas\" dobles"
=> string con "comillas" dobles

"string con 'comillas' simples"
=> string con 'comillas' simples

'string con \'comillas\' simples'
=> string con 'comillas' simples

'string con "comillas" dobles'
=> string con "comillas" dobles
```

Como la barra invertida tiene un significado especial dentro de un string, para poder usarla dentro de un string, hay que escaparla poniendo otra barra delante.

```
"string con una barra invertida \\"
=> string con una barra invertida \
```

En los strings con comillas dobles se pueden intercalar valores usando una notación especial. Se escribe la cadena `#{}` con la expresión que se quiere intercalar en el string entre las llaves.

```
"1 + 1 = #{1 + 1}"
=> 1 + 1 = 2
```

## Operaciones con strings

Se pueden unir dos strings usando el operador de la suma entre ellas. Igual que si se sumaran dos números.

```
"hola " + "desde Ruby"
=> hola desde Ruby
```

Los strings se pueden multiplicar usando el operador de multiplicación entre un string y un número. No se puede multiplicar un string por otro ni un número por un string.

```
"Ruby" * 3
=> RubyRubyRuby

3 * "Ruby"
=> TypeError: String can't be coerced into Fixnum

"Ruby" * "4"
=> TypeError: no implicit conversion of String into Integer
```

Para convertir un string en un número entero se usa `.to_i`. Para convertirlo en un número decimal se usa `.to_f`.

```
"Ruby" * "2".to_i
=> RubyRuby

"99".to_f + 1
=> 100.0
```

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_02.html).
* [Why's (Poignant) Guide to Ruby](http://poignant.guide/book/chapter-3.html).
* [Ruby Explained: Numbers, Operators and Expressions](http://www.eriktrautman.com/posts/ruby-explained-numbers-operators-and-expressions).
