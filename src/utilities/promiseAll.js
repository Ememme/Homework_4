const promiseAll = async(promises) => {
    let results = [];
    for await (let promise of promises) {
        results.push(promise);
    }
    return results;
}

export default promiseAll;