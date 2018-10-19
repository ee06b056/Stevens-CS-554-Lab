const dummyData = require('./dummyData.json');

module.exports = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            const result = dummyData.find((element) => {
                return element.id == id;
            });
            if (result) {
                resolve(result);
            } else {
                reject(new Error("data not found"));
            }
        }, 5000);
    });
};