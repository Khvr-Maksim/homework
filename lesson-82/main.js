function Name(YourName) {
    return `Hello ${YourName}`
}
console.log(Name('Vladimir'))
console.log('--------------------------------------------------------')
const Numbers = [1, 4, 5, 6, 3, 22, 105]
function Check(newch) {
    for (let i = 0; i < newch.length; i++ ){
        if (newch[i]>=10){
            return newch[i]
        }
    }
}
console.log(Check(Numbers))
console.log('--------------------------------------------------------')
function Operation(first,second,operacia){
    if(operacia==='plus'){
        return first+second
    }
    if (operacia==='minus'){
        return first-second
    }
    if (operacia==='multiply')
        return first*second
    if (operacia==='devide')
    return first/second
}
const result = Operation(3,2,'plus')
console.log(result)