import bindRouter, { animate } from '../src/bind-router';
import { router } from './__mocks__';

describe('bindRouter', () => {
  it('should bind router hooks', () => {
    const options = {
      namespace: 'animate',
    };
    bindRouter(router, options);
    expect(router.beforeEach).toHaveBeenCalledWith(expect.any(Function));
    expect(router.afterEach).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should set animation to element', () => {
    const el = document.createElement('div');
    el.dataset.entreacteenteranimation = 'reveal';
    el.dataset.entreacteenterduration = '0.5s';
    el.dataset.entreacteenterdelay = '0.5s';
    el.dataset.entreacteentertiming = 'linear';
    animate(el, 'entreacte', 'enter');
    expect(el.style.getPropertyValue('animation')).toBe('reveal-enter 0.5s linear 0.5s backwards');

    el.dataset.entreacteleaveanimation = 'zoom';
    el.dataset.entreacteleaveduration = '2s';
    el.dataset.entreacteleavedelay = '1s';
    el.dataset.entreacteleavetiming = 'ease-out';
    animate(el, 'entreacte', 'leave');
    expect(el.style.getPropertyValue('animation')).toBe('zoom-leave 2s ease-out 1s forwards');
  });
});
