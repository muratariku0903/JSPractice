const dayjs = require('dayjs');


const d = dayjs.unix(1641049200);


const arr = ['a', 'b'];

console.log(typeof (arr));


if (typeof (arr) === 'object') {
    for (const char of arr) {
        console.log(char);
    }
}




