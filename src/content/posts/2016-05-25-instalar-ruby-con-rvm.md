---
title: "Ruby: instalar Ruby con RMV"
date: 2016-05-25
tags: ruby, rvm
template: post.html
---

# Ruby: instalar Ruby con RMV

RVM es un gestor de versiones de Ruby. Funciona en sitemas UNIX. Permite instalar y matener distintas versiones de Ruby en el mismo sistema. Con RVM también se pueden tener varios grupos de gemas para cada versión.

Para instalar RVM hay que ejecutar dos comandos en la consola:

```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
\curl -sSL https://get.rvm.io | bash -s stable
```

Antes de instalar Ruby, se pueden ver las versiones disponibles con el comando:

```
rvm list known
```

Se puede instalar cualquier versión de la lista que devuelve el comando anterior. Para instalar una versión de Ruby se usa el comando:

```
rvm install 2.3.0
```

Cuando se haya terminado la instalación de Ruby, se puede comprobar la versión instalada.

```
ruby -v
```

Cuando se tienen distintas versiones de Ruby instaladas, se puede indicar a RVM la versión por defecto usando la opción `--default`.

```
rmv --default use 2.3.0
```

Para cambiar la versión de Ruby que se está usando actualmente:

```
rvm use 2.3.0
```

Se puede ver todas las versiones de Ruby instaladas con:

```
rvm list
```

Se puede encontrar más información en la [web de RVM](https://rvm.io/).
