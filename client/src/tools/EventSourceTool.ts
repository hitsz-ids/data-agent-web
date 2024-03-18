import { EventSourcePolyfill, EventSourcePolyfillInit } from 'event-source-polyfill';

const createEventSource = (params: {
  url: string;
  uid: string;
  onMessage: Function;
  onError: Function;
}) => {
  const { url, uid, onMessage, onError } = params;

  if (!url || !onMessage || !onError) {
    throw new Error('SSE 参数异常！');
  }

  const options: EventSourcePolyfillInit = {
    headers: {
      uid
    },
    heartbeatTimeout: 3 * 60 * 1000
  };
  const eventSource = new EventSourcePolyfill(`${url}`, options);

  eventSource.onmessage = event => {
    // console.log('onmessage', event);
    onMessage(event.data);
  };

  eventSource.onerror = error => {
    onError(error);
    console.error('EventSource error:', error);
  };

  return () => {
    eventSource.close();
  };
};

export default createEventSource;
