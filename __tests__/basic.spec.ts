import { fatcher } from 'fatcher';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { parameters } from '../src';

const server = setupServer(
  http.get('https://foo.bar', ({ request }) => {
    const [, queryString] = request.url.split('?');
    return HttpResponse.text(queryString);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Basic Usage', () => {
  it('Base', async () => {
    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar');
  });

  it('Merge Origin Querystring', async () => {
    const response = await fatcher('https://foo.bar?count=1', {
      params: {
        foo: 'bar',
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar&count=1');
  });

  it('Cover Same Name Params', async () => {
    const response = await fatcher('https://foo.bar?foo=count', {
      params: {
        foo: 'bar',
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar');
  });

  it('Do nothing when params is empty', async () => {
    const response = await fatcher('https://foo.bar', {
      middlewares: [parameters],
    });

    expect(response.body).toBe(null);
  });
});
