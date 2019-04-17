// MDN Definition:
// The Promise.all() method returns a single Promise that resolves when all of the promises passed as an iterable have resolved or when the iterable contains no promises. It rejects with the reason of the first promise that rejects. Fail-fast.

// https://promisesaplus.com/

async function promiseAll2(promises) {
    // Twój kod tu
    const results = [];
    for (let i = 0; i < promises.length; i++) {
        results.push(await promises[i]);
    }
  return results;
}

/* Promise.race() definition:
- returns a Promise that takes the same value as the first promise that settles amongst the promises of the iterable passed as an argument.
- If the iterable passed is empty, the promise returned will be forever pending.

If the iterable contains one or more non-promise value and/or an already resolved/rejected promise, then Promise.race will resolve to the first of these values found in the iterable.*/

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      if (promises[i] != null && promises[i] instanceof Promise) {
        promises[i].then(resolve, reject);
      } else {
        return resolve(promises[i]);
      }
    }
  });
}


// Kod testowy.
promiseAll([]).then(result => {
  console.log('To powinien być []:', JSON.stringify(result));
});

promiseAll([futureSuccess(1), futureSuccess(2), futureSuccess(3)]).then(result => {
  console.log('To powinien być [1, 2, 3]:', result);
});

promiseAll([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
  .then(() => {
    console.log('WAT?! Nie powinno nas tu być..');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('Coś poszło nie tak..:', error);
    }
    console.log('To powinien być X:', error);
  });

promiseRace([1, 2, 3]).then(result => {
  console.log('This should be 1:', result);
});

const now = performance.now();
promiseRace([delayedSuccess(1, 300), delayedSuccess(2, 200), delayedSuccess(3, 100)]).then(result => {
  const after = performance.now();
  const diff = after - now;
  if (diff < 100) {
    throw 'Za szybko!'
  }
  if (diff >= 200) {
    throw 'Za wolno!'
  }
  console.log('To powinno być 3:', result);
});

promiseRace([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
  .then(() => {
    console.log('WAT?! Nie powinno nas tu być..');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('Coś poszło nie tak..:', error);
    }
    console.log('To powinien być X:', error);
  });

function futureSuccess(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
};

function delayedSuccess(val, time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), time);
  });
};