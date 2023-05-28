export const fakeFetch = <T>(data: T, timeout = 0, resolve: boolean = true) => {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });
}

export const fakeResolve = <T>(data: T, timeout = Math.random() * 2000) => fakeFetch<T>(data, timeout, true);

export const fakeReject = <T>(data: T, timeout = Math.random() * 2000) => fakeFetch<T>(data, timeout, false);