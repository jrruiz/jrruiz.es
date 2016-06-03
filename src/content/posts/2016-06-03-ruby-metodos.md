---
title: "Ruby: métodos"
date: 2016-06-03
tags: ruby, methods
template: post.html
---

# Ruby: métodos

Los métodos son acciones que actúan sobre un objeto. Los objetos son cualquier cosa en Ruby como los números y los strings. Los métodos se invocan poniendo un punto después de un objecto, seguido del nombre del método. El método siempre lo ejecuta el objeto que esté antes del punto.

```
1.to_f
=> 1.0
```

En el ejemplo se llama al método `to_f` del objeto `1` para convertirlo en decimal.

Los métodos pueden recibir parámetros que usan para obtener un resultado. Los parámetros de un método se colocan después de la llamada al método. Cuando se llama a un método, los parámetros se pueden colocar dentro de unos paréntesis para indicar que son parámetros del método.

```
"hola".include?("la")
=> true
```

También se pueden pasar parámetros a un método sin usar los paréntesis. Para hacer esto, se pone un espacio entre la llamada al método y los parámetros.

```
"hola".include? "la"
=> true
```

Para pasar más de un parámetro a un método se separan por comas.

```
"hola".gsub /a/, "A"
=> holA
```

Las operaciones matemáticas también son métodos. `1 + 1` es lo mismo que `1.+ 1`.

```
1.+ 1
=> 2

1 + 1
=> 2

2.* 3
=> 6
```

Algunos métodos se llama sin usar un objeto seguido de un punto. Por ejemplo `puts`. Estos métodos pertenecen a un objeto que engloba a todo el programa de Ruby. Se puede acceder a este objeto usando la variable `self`.

```
puts "método puts"
=> método puts

self.puts "método puts"
=> método puts
```

Se pueden ver todos los métodos de un objeto llamando a su método `methods`.

```
"esto es un objeto string".methods
=> [:include?, :unicode_normalize, :%, :to_c, :unicode_normalize!, :unicode_normalized?, :*, :+, :count, :partition, :unpack, :encode, :encode!, :next, :casecmp, :insert, :bytesize, :match, :succ!, :next!, :upto, :index, :rindex, :replace, :clear, :chr, :+@, :-@, :setbyte, :getbyte, :<=>, :<<, :scrub, :scrub!, :byteslice, :==, :===, :dump, :=~, :downcase, :[], :[]=, :upcase, :downcase!, :capitalize, :swapcase, :upcase!, :oct, :empty?, :eql?, :hex, :chars, :split, :capitalize!, :swapcase!, :concat, :codepoints, :reverse, :lines, :bytes, :prepend, :scan, :ord, :reverse!, :center, :sub, :freeze, :inspect, :intern, :end_with?, :gsub, :chop, :crypt, :gsub!, :start_with?, :rstrip, :sub!, :ljust, :length, :size, :strip!, :succ, :rstrip!, :chomp, :strip, :rjust, :lstrip!, :tr!, :chomp!, :squeeze, :lstrip, :tr_s!, :to_str, :to_sym, :chop!, :each_byte, :each_char, :each_codepoint, :to_s, :to_i, :tr_s, :delete, :encoding, :force_encoding, :sum, :delete!, :squeeze!, :tr, :to_f, :valid_encoding?, :slice, :slice!, :rpartition, :each_line, :b, :to_r, :ascii_only?, :hash, :<, :>, :<=, :>=, :between?, :instance_of?, :public_send, :instance_variable_get, :instance_variable_set, :instance_variable_defined?, :remove_instance_variable, :private_methods, :kind_of?, :instance_variables, :tap, :is_a?, :extend, :define_singleton_method, :to_enum, :enum_for, :!~, :respond_to?, :display, :send, :object_id, :method, :public_method, :singleton_method, :nil?, :class, :singleton_class, :clone, :dup, :itself, :taint, :tainted?, :untaint, :untrust, :trust, :untrusted?, :methods, :protected_methods, :frozen?, :public_methods, :singleton_methods, :!, :!=, :__send__, :equal?, :instance_eval, :instance_exec, :__id__]
```

En la respuesta de este método, todos los nombres que aparecen con dos puntos delante son los métodos del objeto. Se puede encontrar iformación sobre qué hace cada método en la [documentación de Ruby](http://ruby-doc.org/).

## Fuentes

* [Learn to program](https://pine.fm/LearnToProgram/chap_05.html).
* [http://ruby-doc.org/](http://ruby-doc.org/).
* [Ruby Monk - Introduction to Objects](https://rubymonk.com/learning/books/1-ruby-primer/chapters/6-objects/lessons/35-introduction-to-objects).
* [Ruby Monk - Beign Methodical](https://rubymonk.com/learning/books/1-ruby-primer/chapters/19-ruby-methods/lessons/57-being-methodical).
