import { nextTick, type Plugin, type Directive } from 'vue';
import type { Router } from 'vue-router';

const NAMESPACE = 'entreacte';
const TRANSITIONS = ['enter', 'leave'] as const;
const ATTRIBUTES = {
  animation: 'fade',
  duration: '1s',
  delay: '0s',
  timing: 'ease',
};

type Transition = typeof TRANSITIONS[number];

type DirectiveOptions = {
  namespace?: string;
  attributes?: Partial<typeof ATTRIBUTES>;
};

export type PluginOptions = {
  router: Router;
} & DirectiveOptions;

type Attributes = Partial<{
  [key in Transition]: string | Partial<typeof ATTRIBUTES>;
} & Partial<typeof ATTRIBUTES>> | undefined;

const attach = (router: Router, options: DirectiveOptions) => {
  const { namespace = NAMESPACE } = options;

  const animate = (el: HTMLElement, transition: Transition) => {
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

  const elements = () => [...document.querySelectorAll<HTMLElement>(`[data-${namespace}]`)];

  router.afterEach(async () => {
    await nextTick();
    elements().forEach(el => animate(el, 'enter'));
  });

  router.beforeEach(async () => {
    const animations = elements().map(el => new Promise(resolve => {
      el.addEventListener('animationend', resolve);
      animate(el, 'leave');
    }));
    await Promise.all(animations);
  });
};

export const vRouteAnimate = (options: DirectiveOptions): Directive<HTMLElement, Attributes> => {
  const { namespace = NAMESPACE, attributes: global } = options;
  return {
    created: (el, { arg, value }) => {
      el.dataset[namespace] = 'true';
      TRANSITIONS.forEach(transition => {
        const { [transition]: specific, ...scoped } = value || {};
        const attributes = typeof specific === 'string'
          ? { ...global, animation: specific }
          : { ...global, ...(arg && { animation: arg }), ...scoped, ...specific };
        Object.entries(ATTRIBUTES).forEach(([attribute, defaultValue]) => {
          const name = `${namespace}${transition}${attribute}`;
          el.dataset[name] = attributes[attribute as keyof Attributes] ?? defaultValue;
        });
      });
    },
  };
};

const plugin: Plugin<PluginOptions> = {
  install: (app, { router, ...config }) => {
    const { namespace = NAMESPACE } = config;
    attach(router, config);
    app.directive(namespace, vRouteAnimate(config));
  },
};

export default plugin;
