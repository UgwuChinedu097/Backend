// Synchronous
console.log("start")
console.log("middle")
console.log('end')


// Asynchronous
setTimeout(() =>{
}, 5000)

setInterval(() => {
}, 10000)

let myPromise = new Promise ((Resolved, Rejected) => {
    let worked = true;
    if (worked) {
        Resolved ("it Worked")
    }else{
        Rejected("An error occured")
    }
})

myPromise.then((res) => {
    console.log("yes")
}).catch((err) =>{
    console.log("no, an error occured")
});