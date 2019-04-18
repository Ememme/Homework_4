const promiseRace = async(promises) => {
    return new Promise((resolve, reject) => {
      for (let item of promises) {
        if (item != null && item instanceof Promise) {
          item.then(resolve, reject);
        }
        else {
          return resolve(item);
        }
      }
    });
};

export default promiseRace;