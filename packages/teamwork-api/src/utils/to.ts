export const to = (promise: Promise<any>) =>
  promise
    .then((data: any) => {
      return [null, data];
    })
    .catch((err: any) => [err]);
