// function getRoles(){
//     var roles = []

//     setTimeout(function(){
//         roles.push("manager")
//     }, 1 * 1000)

//     return roles
// }
// const roles = getRoles()
// console.log(roles)

// function getRoles() {
//   return new Promise((resolve, reject) => {
//     var roles = [];
//     setTimeout(function () {
//       roles.push("manager");
//       resolve(roles);
//     }, 1 * 1000);
//   });
// }

// getRoles().then(function (roles) {
//     console.log(roles);
// });

function getRoles(callback) {
  var roles = [];
  setTimeout(function () {
    roles.push("intern");
    callback(roles);
  }, 1 * 1000);
}

getRoles(function(roles){
    console.log(roles)
})