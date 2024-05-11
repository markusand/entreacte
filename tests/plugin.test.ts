import entreacte from '../src/plugin';
import { app, router } from './__mocks__';

const directive = { create: expect.any(Function) };

jest.mock('../src/directive', () => ({
  __esModule: true,
  default: jest.fn(() => directive),
}));

describe('Plugin installation', () => {
  beforeEach(jest.clearAllMocks);

  it('shoult register the directive with defaults', () => {
    app.use(entreacte, { router });
    expect(app.directive).toHaveBeenLastCalledWith('entreacte', directive);
  });

  it('shoult register the directive with namespace rename', () => {
    app.use(entreacte, { router, namespace: 'animate' });
    expect(app.directive).toHaveBeenLastCalledWith('animate', directive);
  });
});
