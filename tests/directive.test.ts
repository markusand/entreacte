import directive from '../src/directive';
import { ATTRIBUTES } from '../src/defaults';

const vnode = {} as any; // eslint-disable-line @typescript-eslint/no-explicit-any

describe('Directive', () => {
  it('should tag element with namespace and default attributes', () => {
    const { animation, duration, delay, timing } = ATTRIBUTES;
    const { created } = directive({});
    const el = document.createElement('div');
    const options = { value: undefined, modifiers: {}, instance: null, oldValue: null, dir: {} };
    created?.(el, options, vnode, null);
    expect(el.dataset).toHaveProperty('entreacte', 'true');
    expect(el.dataset).toHaveProperty('entreacteenteranimation', animation);
    expect(el.dataset).toHaveProperty('entreacteenterduration', duration);
    expect(el.dataset).toHaveProperty('entreacteenterdelay', delay);
    expect(el.dataset).toHaveProperty('entreacteentertiming', timing);
  });

  it('should tag element with custom global attributes', () => {
    const animation = 'reveal';
    const duration = '2s';
    const delay = '3s';
    const timing = 'linear';
    const { created } = directive({
      attributes: { animation, duration, delay, timing },
    });
    const el = document.createElement('div');
    const options = { value: undefined, modifiers: {}, instance: null, oldValue: null, dir: {} };
    created?.(el, options, vnode, null);
    expect(el.dataset).toHaveProperty('entreacteenteranimation', animation);
    expect(el.dataset).toHaveProperty('entreacteenterduration', duration);
    expect(el.dataset).toHaveProperty('entreacteenterdelay', delay);
    expect(el.dataset).toHaveProperty('entreacteentertiming', timing);
  });

  it('should tag element with custom scoped attributes', () => {
    const animation = 'reveal';
    const duration = '2s';
    const delay = '3s';
    const timing = 'linear';
    const { created } = directive({});
    const el = document.createElement('div');
    const value = { animation, duration, delay, timing };
    const options = { value, modifiers: {}, instance: null, oldValue: null, dir: {} };
    created?.(el, options, vnode, null);
    expect(el.dataset).toHaveProperty('entreacteenteranimation', animation);
    expect(el.dataset).toHaveProperty('entreacteenterduration', duration);
    expect(el.dataset).toHaveProperty('entreacteenterdelay', delay);
    expect(el.dataset).toHaveProperty('entreacteentertiming', timing);
  });

  it('should tag element with custom specific string attributes', () => {
    const { duration, delay } = ATTRIBUTES;
    const { created } = directive({});
    const el = document.createElement('div');
    const value = {
      enter: 'reveal',
      leave: 'fade',
    };
    const options = { value, modifiers: {}, instance: null, oldValue: null, dir: {} };
    created?.(el, options, vnode, null);
    expect(el.dataset).toHaveProperty('entreacteenteranimation', 'reveal');
    expect(el.dataset).toHaveProperty('entreacteleaveanimation', 'fade');
    expect(el.dataset).toHaveProperty('entreacteenterduration', duration);
    expect(el.dataset).toHaveProperty('entreacteenterdelay', delay);
    expect(el.dataset).toHaveProperty('entreacteleaveduration', duration);
    expect(el.dataset).toHaveProperty('entreacteleavedelay', delay);
  });

  it('should tag element with custom specific object attributes', () => {
    const duration = '2s';
    const delay = '3s';
    const { created } = directive({});
    const el = document.createElement('div');
    const value = {
      enter: { duration, delay },
    };
    const options = { value, modifiers: {}, instance: null, oldValue: null, dir: {} };
    created?.(el, options, vnode, null);
    expect(el.dataset).toHaveProperty('entreacteenterduration', duration);
    expect(el.dataset).toHaveProperty('entreacteenterdelay', delay);
    expect(el.dataset).toHaveProperty('entreacteleaveduration', ATTRIBUTES.duration);
  });

  it('should override attributes when necessary', () => {
    const { created } = directive({
      attributes: { animation: 'reveal' },
    });
    const el = document.createElement('div');
    const value = {
      duration: '4s',
      enter: { delay: '5s' },
    };
    const options = { value, modifiers: {}, instance: null, oldValue: null, dir: {} };
    created?.(el, options, vnode, null);
    expect(el.dataset).toHaveProperty('entreacteenteranimation', 'reveal'); // From global
    expect(el.dataset).toHaveProperty('entreacteenterduration', '4s'); // From scoped
    expect(el.dataset).toHaveProperty('entreacteenterdelay', '5s'); // From specific
    expect(el.dataset).toHaveProperty('entreacteenteranimation', 'reveal'); // From global
    expect(el.dataset).toHaveProperty('entreacteleaveduration', '4s'); // From scoped
    expect(el.dataset).toHaveProperty('entreacteleavedelay', ATTRIBUTES.delay); // From default
  });
});
