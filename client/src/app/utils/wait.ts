const waitDebugTime = 500;

export async function wait(time = 2500) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}

export async function waitDebug() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, waitDebugTime);
  });
}
