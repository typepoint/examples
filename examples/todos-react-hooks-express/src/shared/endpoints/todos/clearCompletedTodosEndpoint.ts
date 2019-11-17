import { defineEndpoint, Empty } from '@typepoint/shared';

export const clearCompletedTodosEndpoint = defineEndpoint({
  method: 'post',
  path: (path) => path.literal('api/todos/clearCompleted'),
  requestParams: Empty,
  requestBody: Empty,
  responseBody: Empty,
});
