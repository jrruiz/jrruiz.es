---
title: "Ruby: control de flujo"
date: 2016-06-10
tags: ruby, flow control
template: post.html
---

# Ruby: control de flujo

El control de flujo se usa para ejecutar algunas partes del código teniendo en cuenta unas condiciones. A las construcciones de control de flujo también se las llama condicionales.

Ruby tiene la construcción condicional `if`. Un `if` evalua una expresión para conseguir un valor booleano. Si la expresión da como resultado `true`, se ejecuta el código que hay dentro del `if`.

Los `if` se cierran poniendo la palabra clave `end` al final. Todo el código entre el `if` y su `end` sólo se ejecuta si la expresión que se pasa al `if` devuelve `true`.

```
if 1 > 0
  puts "1 es mayor que 0"
end

if 1 < 0
  puts "1 es menor que 0"
end
```

En el ejemplo, siempre se ejecuta el método `puts` que está dentro del primer `if`. Esto es porque la expresión `1 > 0` devuelve el valor `true`. El código que está dentro del segundo `if` nunca se ejecutará porque la expresión devuelve `false`.

Los `if` también tienen la construcción `else`. El  `else` se ejecuta siempre que la expresión del `if` de como resultado `false`. Cuando se usa `else`, el `if` se cierra con `end` después del código del `else`.

```
if 1 <= 0
  puts "1 es menor o igual que 0"
else
  puts "1 es mayor que 0"
end
```

También se puede usar `elsif` para comprobar otra expresión en caso de que la que contiene el `if` sea `false`.

```
puts "Escribe un número"
num1 = gets.chomp.to_i

puts "Escribe otro número"
num2 = gets.chomp.to_i

if num1 < num2
  puts "#{num1} es menor que #{num2}"
elsif num1 > num2
  puts "#{num1} es mayor que #{num2}"
else
  puts "#{num1} es igual que #{num2}"
end
```

En este ejemplo, se pide al usuario que introduzca dos números. El primer número se guarda en `num1`, el segundo en `num2`. Después usando un `if` con un `elsif` y un `else`, imprime en la consola si el primer número es mayor que el segundo.

Los `if` se pueden poner dentro de otros `if` para hacer dos comprobaciones distintas.

```
puts "Escribe un número"
num = gets.chomp.to_i

if num > 10
  if num < 20
    puts "tu número está entre 10 y 20"
  else
    puts "tu número es mayor o igual que 20"
  end
else
  puts "tu número es menor o igual a 10"
end
```

Se pueden usar los operadores booleanos para evaluar varias expresiones en un `if`.

```
puts "Escribe un número"
num = gets.chomp.to_i

if num > 10 && num < 20
  puts "tu número está entre 10 y 20"
elsif num >= 20
  puts "tu número es mayor o igual que 20"
else
  puts "tu número es menor o igual a 10"
end
```

## Construcción unless

El `unless` es el contrario de un `if`. El código dentro de una construcción `unless` se ejecutará siempre que la expresión de cómo resultado  `false`. Se puede usar `else` con un `unless` igual que con un `if`. Pero no se puede usar `elsif`.

```
unless 0 > 1
  puts "1 es mayor que 0"
else
  puts "1 es menor o igual que 0"
end
```

Se puede conseguir el mismo resultado que en un `unless` usando el operador de negación sobre la expresión de un `if`.

```
if !(0 > 1)
  puts "1 es mayor que 0"
else
  puts "1 es menor o igual que 0"
end
```

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_06.html).
* [Ruby Monk](https://rubymonk.com/learning/books/1-ruby-primer/chapters/8-control-structures/lessons/41-conditions-using-the-if-statement).
* [Techotopia](http://www.techotopia.com/index.php/Ruby_Flow_Control).
