export const createBrowserHistory = jest.fn().mockReturnValue({
  push: jest.fn()
});

export const createLocation = jest.fn();

export const createMemoryHistory = jest.fn().mockReturnValue({
  location: {
    pathname: ''
  },
  listen: jest.fn()
});
