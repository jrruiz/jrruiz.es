---
title: "Ruby: bucles"
date: 2016-06-15
tags: ruby, loops
template: post.html
---

# Ruby: bucles

Los bucles sirven para ejecutar código un número determinado de veces.

El bucle más básico en Ruby es el `while`. El bucle `while` ejecuta el código que hay dentro de él mientras la expresión que recibe sea `true`. Cuando la expresión que recibe `while` devuelve `false`, deja de repetirse y se continúa con la ejecución del resto del programa.

```
i = 1

while i <= 10
  puts i
  i = i + 1
end

puts "FIN"
```

El ejemplo imprime los números del 1 al 10. Cuando termina el bucle imprime el string `"FIN"`.

## Bucle until

El bucle `until` se ejecuta hasta que la condición sea `true`. Otra forma de ver cómo se ejecuta este bucle es mientras la condición sea `false`.

```
i = 1

until i > 10
  puts i
  i = i + 1
end

puts "FIN"
```

Este ejemplo es igual que el del `while`. Imprime los números del 1 al 10 y al terminar imprime `"FIN"`.

## Bucle for

El bucle `for` ejecuta el código una vez por cada elemento que tenga la expresión que recibe. La expresión puede ser un rango de números, un array o un hash.

```
for i in 1..10
  puts i
end
```

En el ejemplo se crea un rango de números del 1 al 10. El bucle `for` va asignando por orden estos números a la variable `i`. Se imprime cada número que se asigna a `i`. Al final, el programa habrá imprimido los números del 1 al 10.

## Bucle loop

El bucle `loop` se ejecuta de forma infinita. La única forma de parar su ejecución es usando la expresión `break`. El código que va a ejecutar `loop` se pone entre la palabra clave `do` y `end`.

```
loop do
  puts "Infinito"
end
```

El bucle del ejemplo imprimirá el string `"Infinito"` para siempre si no se para el programa de forma forzada.

```
i = 1

loop do
  puts i
  i = i + 1

  if i > 10
    break
  end
end

puts "FIN"
```

En este ejemplo se ejecuta el bucle hasta que la variable `i` sea mayor que 10. En ese momento se ejecuta la expresión `break` que hace que pare el bucle. Después de parar el bucle se imprime el string `"FIN"`.

## Modificar bucles

Hay algunas expresiones que modifican el comportamiento normal de un bucle. Pueden hacer que el bucle termine antes de lo normal, que se reinicie o que se salte alguna iteración.

### Break

`break` hace que el bucle termine.

```
for i in 1..10
  if i > 5
    break
  end

  puts i
end
```

Este bucle imprime los números del 1 al 5. Los restantes hasta el 10 no se imprimen porque cuando `i` es mayor que 5, se ejecuta un `break` que hace que termine el bucle.

### Next

`next` hace que el bucle salte a la siguiente iteración.

```
for i in 1..10
  if i == 5
    next
  end

  puts i
end
```

Este bucle imprime los números del 1 al 10, pero se salta el 5. Cuando la variable `i` es igual a 5, se ejecuta `next` que hace que el bucle pase a la siguiente iteración.

### Redo

`redo` hace que el bucle vuelva a ejecutar la iteración actual.

```
for i in 1..10
  puts i

  if i == 3
    redo
  end
end
```

Este bucle imprime los números del 1 al 3. Cuando la variable `i` es igual a 3, se ejecuta `redo` que hace que el bucle vuelva a ejecutar la iteración con el valor 3. Esto hace que se vuelva a imprimir el número 3 de forma infinita.

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_06.html).
* [Ruby Monk](https://rubymonk.com/learning/books/1-ruby-primer/chapters/8-control-structures/lessons/44-loops-in-ruby).
* [Tutorials Point](http://www.tutorialspoint.com/ruby/ruby_loops.htm).
* [The Bastards Book of Ruby](http://ruby.bastardsbook.com/chapters/loops/).
