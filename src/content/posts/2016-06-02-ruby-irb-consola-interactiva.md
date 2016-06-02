---
title: "Ruby: IRB (consola interactiva)"
date: 2016-06-02
tags: ruby, terminal, irb
template: post.html
---

# Ruby: IRB (consola interactiva)

IRB	es la consola interactiva de Ruby. En ella se puede escribir código Ruby y la consola da el resultado. Para iniciarla se usa el comnado `irb` dentro de la terminal.

```
irb
2.3.0 :001 > 
```

La línea `2.3.0 :001 >` es lo que saldrá en la consola al entrar en IRB. El número `2.3.0` indica la versión de Ruby que se está ejecutando. Se puede empezar a escribir en esa línea y al pulsar la tecla `enter` se ejecutará el código.

## Escribir con puts y print

El método `puts` escribe en la consola lo que se ponga detrás de él. Después de escribir, pone un salto de línea.

```
puts 1 + 1
2
=> nil

puts "escribiendo con puts"
escribiendo con puts
=> nil
```

La línea `=> nil` quiere decir que el método `puts` devuelve como resultado `nil`.

El método `print` es igual que `puts` pero no pone un salto de línea después de escribir.

```
print 1 + 1
2 => nil

puts "escribiendo con print"
escribiendo con print => nil
```

Igual que el método `puts`, `print` devuelve como resultado `nil`.

## Leer con gets y gets.chomp

El método `gets` lee una línea que se escriba en la consola. Después de leer, devuelve lo que ha leído. Se puede usar para leer una línea que escriba un usuario y guardarlo en una variable.

```
var = gets
hola gets
=> "hola gets\n"

var
=> "hola gets\n"
```

El caracter `\n` que lee el método `gets` es el salto de línea que ocurre al pulsar la tecla `enter`. Se puede quitar el salto de línea de `gets` usando el método `chomp`.

```
var = gets.chomp
hola gets
=> "hola gets"

var
=> "hola gets"
```

`chomps` es un método que tienen todos los strings. Como `gets` siempre devuelve lo que ha leído como un string, se puede usar `chomp` sobre lo que devuelve `gets` para quitar el salto de línea.

## Ejecutar un archivo Ruby desde la terminal

A parte de usar IRB para ejecutar código Ruby, también se puede escribir en un archivo y ejecutarlo desde la consola. Para ejecutar el código Ruby de un archivo se usa el comando `ruby` seguido de la ruta al archivo.

```
# file1.rb

puts "¿Cómo te llamas?"
name = gets.chomp
puts "Tu nombre es " + name
```

El archivo `file1.rb` del ejemplo anterior se puede ejecutar desde la terminal así:

```
ruby file1.rb
¿Cómo te llamas?
Ruby
Tu nombre es Ruby
```

Al ejecutar el comando `ruby file1.rb` lo primero que pasa es que `puts` escribe en la consola. Después el programa se queda esperando a que se escriba algo para que lo recoja `gets`. Cuando `gets` ha leído una línea, se quita el salto de línea con `chomp` y se asigna el resultado a la variable `name`. Por último se vuelve a ejecutar `puts` para que escriba un texto y lo que contenga la variable `name`.

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_04.html).
