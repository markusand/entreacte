import type { App, Plugin } from 'vue';
import type { Router } from 'vue-router';
import type { PluginOptions } from '../src';

export const app = {
  use: jest.fn((plugin: Plugin<PluginOptions>, options: PluginOptions) => {
    plugin.install?.(app, options);
  }),
  directive: jest.fn(),
} as unknown as App;

export const router = {
  beforeEach: jest.fn(),
  afterEach: jest.fn(),
} as unknown as Router;
