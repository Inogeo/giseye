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

export default function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); console.log('resized'); }, timeout);
    };
}