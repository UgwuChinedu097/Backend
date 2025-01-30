let num = [1, 2, 3, 4]
const sum = 0
for(let i = 0; i < num.length; i++) {
    sum += num[i]
}

console.log(sum)

const add = num.reduce((a , b) => {
    return a + b
})

console.log(add)
