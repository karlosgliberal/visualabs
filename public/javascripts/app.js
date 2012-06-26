$(document).ready(function(){
  var visual = new Visualizacion();
  visual.init()
});
  
// function asyncfoo() {
//     var p = new promise.Promise();  /* (1) create a Promise */
//     setTimeout(function() {
//         p.done(null, "O hai!");     /* (3) resolve it when ready */
//     }, 1000);
//     return p;                       /* (2) return it */
// }
// 
// 
// var p = asyncfoo('hola', 'error', 'call');
// 
// p.then(function(error, result) {
//     if (error) return;
//     alert(result);
// });


// function late(n) {
//     var p = new promise.Promise();
//     setTimeout(function() {
//         p.done(null, n);
//   
//     }, n);
//     return p;
// }
// 
// promise.join([
//     function() {
//         return late(1000);
//     },
//     function() {
//         return late(2000);
//     },
//     function() {
//         return late(4000);
//     }
// ]).then(
//     function(errors, values) {
//         alert(values[0] + " " + values[1]+ " " + values[2]);
//     }
// );
