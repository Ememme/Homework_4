console.log(`JS Async`);
import promiseAll from './utilities/promiseAll.js';
import promiseRace from './utilities/promiseRace.js';

// Kod testowy.

promiseAll([]).then(result => {
    console.log('Test promise.all: To powinien być []:', JSON.stringify(result));
  });
  
  promiseAll([futureSuccess(1), futureSuccess(2), futureSuccess(3)]).then(result => {
    console.log('Test promise.all: To powinien być [1, 2, 3]:', result);
  });
  
  promiseAll([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
    .then(() => {
      console.log('Test promise.all: WAT?! Nie powinno nas tu być..');
    })
    .catch(error => {
      if (error !== 'X') {
        console.log('Test promise.all:Coś poszło nie tak..:', error);
      }
      console.log('Test promise.all:To powinien być X:', error);
    });
   

  promiseRace([1, 2, 3]).then(result => {
    console.log('Test promise.race: This should be 1:', result);
  });
  
  const now = performance.now();
  promiseRace([delayedSuccess(1, 300), delayedSuccess(2, 200), delayedSuccess(3, 100)]).then(result => {
    const after = performance.now();
    const diff = after - now;
    if (diff < 100) {
      throw 'Test promise.race: Za szybko!'
    }
    if (diff >= 200) {
      throw 'Test promise.race: Za wolno!'
    }
    console.log('Test promise.race: To powinno być 3:', result);
  });
  
  promiseRace([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
    .then(() => {
      console.log('Test promise.race:WAT?! Nie powinno nas tu być..');
    })
    .catch(error => {
      if (error !== 'X') {
        console.log('Test promise.race: Coś poszło nie tak..:', error);
      }
      console.log('Test promise.race: To powinien być X:', error);
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