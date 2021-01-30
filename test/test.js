async function retryRequest(promiseFunc, nrOfRetries) {
    return new Promise((resolve, reject) => {
        promiseFunc().Promise()
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                if (nrOfRetries >= 0) {
                    resolve(retryRequest(promiseFunc, nrOfRetries - 1));
                } else {
                    reject(error);
                }
            });
    });
}

let hasFailed = false;
function getUserInfo() {
    return new Promise((resolve, reject) => {
        if (!hasFailed) {
            hasFailed = true;
            reject('Exception!');
        } else {
            resolve('Fetched user!');
        }
    });
}
let promise = retryRequest(getUserInfo, 3);
if (promise) {
    promise.then((result) => console.log(result)).catch((error) => console.log('Error!'));
}
module.exports.retryRequest = retryRequest;
