---
title: "Ruby: variables y constantes"
date: 2016-06-01
tags: ruby, variables
template: post.html
---

# Ruby: variables y constantes

## Variables

Las variables sirven para dar un nombre a algún dato y poder usarlo después. El nombre de una variable puede tener letras, números y guiones bajos. Además no puede empezar con un número ni con una letra mayúscula.

```
variable_1
var2
variableNumberThree
```

Para guardar un dato en una variable se usa el operador `=`. Guardar un dato en una variable se llama asignación.

```
number_1 = 1
my_string = "string en una variable"
```

Se pueden hacer operaciones con variables igual que con los números y los strings.

```
price = 10
tax = 21
total = price * (tax.to_f / 100 + 1)
=> total = 12.1
```

```
saludo = "Hola"
despedida = "Adiós"
saludo + ". " + despedida
=> Hola. Adiós
```

Una variable puede cambiar de valor después de haber sido asignada. Se hace con una asignación, igual que cuando no tiene valor.

```
number_1 = 1
sum = number + 1
=> sum = 2

sum = number + 2
=> sum = 3

sum = sum + 1
=> sum = 4
```

## Constantes

Las constantes son igual que las variables pero su nombre tiene que empezar con una letra mayúscula.

```
Constant_string = "primera constante"
ConstantNumber = 7
UPPERCASE_CONSTANT = "constante con todas las letras en mayúsculas"
```

Las constantes no pueden cambiar su valor después de haber sido asignadas. Si se cambia el valor de una constante, Ruby dará un aviso.

```
CONSTANT_NUMBER = 7
CONSTANT_NUMBER = 2
=> warning: already initialized constant CONSTANT_NUMBER
=> warning: previous definition of CONSTANT_NUMBER was here
```

Aunque Ruby avise de que se ha cambiado una constante, sí que se cambiar su valor.

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_03.html).
* [Why's (Poignant) Guide to Ruby](http://poignant.guide/book/chapter-3.html).
