import { type Directive } from 'vue';
import { NAMESPACE, TRANSITIONS, ATTRIBUTES } from './defaults';
import type { DirectiveOptions as Options, DirectiveAttributes, Attributes } from './types';

export default (options: Options): Directive<HTMLElement, DirectiveAttributes> => {
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
