const promiseRace = async(promises) => {
    return new Promise((resolve, reject) => {
      for (let item of promises) {
        if (item != null && item instanceof Promise) {
          item.then(resolve).catch(reject);
        }
        else {
          return resolve(item);
        }
      }
    });
};

export default promiseRace;

// ememme.github.io/:1 Uncaught (in promise) Test 2 promise.race:// Za wolno!