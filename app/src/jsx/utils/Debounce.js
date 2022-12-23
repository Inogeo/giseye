// Source: https://www.educative.io/answers/how-to-use-the-debounce-function-in-javascript
// export default function debounce(func, wait, immediate) {
//     var timeout;

//     return function executedFunction() {
//         var context = this;
//         var args = arguments;

//         var later = function () {
//             timeout = null;
//             if (!immediate) func.apply(context, args);
//         };

//         var callNow = immediate && !timeout;

//         clearTimeout(timeout);

//         timeout = setTimeout(later, wait);

//         if (callNow) func.apply(context, args);
//     };
// };

export default function debounce(func) {
    console.log('debouncing');
    console.log(func)
    let timer;

    return function (...args) {
        const context = this;
        func.apply(context, args);
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
            console.log('runninf debounced');
        }, 500);
    };
}