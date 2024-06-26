import { nextTick } from 'vue';
import type { Router } from 'vue-router';
import { NAMESPACE, ATTRIBUTES } from './defaults';
import type { DirectiveOptions, Transition } from './types';

export const animate = (el: HTMLElement, namespace: string, transition: Transition) => {
  const { animation, duration, delay, timing } = Object.fromEntries(
    Object.entries(ATTRIBUTES).map(([attribute, defaultValue]) => {
      const name = `${namespace}${transition}${attribute}`;
      return [attribute, el.dataset[name] ?? defaultValue];
    }),
  );
  const direction = transition === 'enter' ? 'backwards' : 'forwards';
  const property = `${animation}-${transition} ${duration} ${timing} ${delay} ${direction}`;
  el.style.setProperty('animation', property);
};

export default (router: Router, options: DirectiveOptions) => {
  const { namespace = NAMESPACE } = options;

  const elements = () => Array.from(document.querySelectorAll<HTMLElement>(`[data-${namespace}]`));

  router.afterEach(async () => {
    await nextTick();
    elements().forEach(el => animate(el, namespace, 'enter'));
  });

  router.beforeEach(async () => {
    const animations = elements().map(el => new Promise(resolve => {
      el.addEventListener('animationend', resolve);
      animate(el, namespace, 'leave');
    }));
    await Promise.all(animations);
  });
};
