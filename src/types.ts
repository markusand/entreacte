import type { Router } from 'vue-router';

export type Transition = 'enter' | 'leave';

export type Attributes = {
  animation: string;
  duration: string;
  delay: string;
  timing: string;
};

export type DirectiveOptions = {
  namespace?: string;
  attributes?: Partial<Attributes>;
};

export type PluginOptions = {
  router: Router;
} & DirectiveOptions;

export type DirectiveAttributes = Partial<{
  [key in Transition]: string | Partial<Attributes>;
} & Partial<Attributes>> | undefined;
