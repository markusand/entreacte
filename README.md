# Entreacte. Vue 3 router animations

Create fancy enter/leave animations in page elements, when switching between vue-router views.

Entreacte is the catalan word for *Entr'acte*, a pause between two parts of a stage production where curtains are being closed for set or costume changes.

[![NPM](https://img.shields.io/npm/v/entreacte)](https://npmjs.org/package/entreacte)
[![NPM](https://img.shields.io/bundlephobia/minzip/entreacte)](https://npmjs.org/package/entreacte)
[![NPM](https://img.shields.io/npm/l/entreacte)](https://npmjs.org/package/entreacte)

![Entreacte for Vue 3](https://github.com/markusand/entreacte/assets/12972543/96f2efde-1a74-418b-8efe-fb99c871e300)

## Usage

Install the Entreacte plugin, passing the router object as a parameter and optional global options.

```bash
npm i entreacte
```

```js
import router from './router';
import entreacte from 'entreacte';

app.use(entreacte, { router });
```

Import default animations or create your own. Fade animation is imported by default. Animations are a pair of `*-enter` and `*-leave` steps.

```js
import 'entreacte/dist/animate/reveal.css;
```

```css
@keyframes mycustom-enter {
  from {
    opacity: 0;
    transform: rotate(180deg) translateX(100%) scale(0.5);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes mycustom-leave {
  from {
    opacity: 1;
    transform: none;
  }

  to {
    opacity: 0;
    transform: rotate(360deg) translate(-100%, 50%) scale(1.5);
  }
}
```

Assign an animation to any element by defining custom data attributes or a vue directive instead.
Other parameters such as duration and delay, both for enter and leave steps, can be defined using argument or a deep nested object as value.

```html
<div v-entreacte[:animation] />
<div v-entreacte="options" />
```

## Examples

```html
<!-- Use reveal animation width defaults for all steps -->
<img v-entreacte:reveal src="path.js">

<!-- Use fade animation with 2s delay -->
<img v-entreacte="{ animation: 'fade', delay: '2s' }" src="path.jpg">

<!-- Use different animations for enter/leave steps -->
<img
  v-entreacte="{
    enter: 'fade',
    leave: 'reveal',
  }"
  src="path.jpg">

<!-- Advanced configuration -->
<img
   src="path.jpg"
   v-entreacte="{
     enter: {
       animation: 'fade',
       duration: '2s',
       delay: '0s',
     },
     leave: {
       duration: '2s',
       delay: '0s',
     },
   }">
```
