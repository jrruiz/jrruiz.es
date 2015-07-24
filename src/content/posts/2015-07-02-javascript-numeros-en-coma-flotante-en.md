---
title: "JavaScript: números en coma flotante"
date: 2015-07-02
tags: javascript, data types
template: post.html
---

# JavaScript: números en coma flotante

Los números en JavaScript se representan todos como valores de doble precisión en coma flotante. Esto significa que todos los número se representan como conjuntos de 64 bits.

Esta forma de representación de los números puede causar resultados poco precisos, debido a que en coma flotante sólo se puede representar un número finito de números:

    0.1 + 0.2 // 0.30000000000000004;

Para hacer cálculos precisos, es mejor usar números enteros. Por ejemplo si se está haciendo cálculos de dinero, se pueden hacer todos los cálculos con número enteros, como si se calculara en céntimos.

    (10 + 20) + 30 // 60 (céntimos)

## Fuentes

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [Effective JavaScript](http://www.amazon.es/Effective-JavaScript-Specific-Software-Development/dp/0321812182)
