import { fatcher } from 'fatcher';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { parameters, ParameterSerializer } from '../src';

const server = setupServer(
  http.get('https://foo.bar', ({ request }) => {
    const [, queryString] = request.url.split('?');
    return HttpResponse.text(queryString);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('Serializer', () => {
  it('Custom Serializer', async () => {
    const serializer: ParameterSerializer = () => {
      return 'bar=foo';
    };

    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
      },
      serializer,
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('bar=foo');
  });

  it('Custom Serializer', async () => {
    const serializer: ParameterSerializer = () => {
      return '';
    };

    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
      },
      serializer,
      middlewares: [parameters],
    });

    expect(response.body).toBe(null);
  });

  it('Custom Serializer Ignore undefined value', async () => {
    const response = await fatcher('https://foo.bar', {
      params: {
        foo: 'bar',
        count: undefined,
      },
      middlewares: [parameters],
    });

    const result = await response.text();
    expect(result).toBe('foo=bar');
  });
});
