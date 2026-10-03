const DEFAULT_DELAY_MS = 400;
const DEFAULT_FAILURE_RATE = 0;

export function mockRequest(data, options = {}) {
  const delayMs = options.delayMs ?? DEFAULT_DELAY_MS;
  const failureRate = options.failureRate ?? DEFAULT_FAILURE_RATE;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error("So‘rovni bajarib bo‘lmadi. Qayta urinib ko‘ring."));
        return;
      }
      resolve(data);
    }, delayMs);
  });
}
