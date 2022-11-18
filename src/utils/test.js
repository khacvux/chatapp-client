const kaprekar = (a)=>{
    let ans = false;
    const n = (a+"").length;
    const split = (a*a+"").split("");
    let left = "";
    let right = "";
    split.map((value,index)=>{
        index>(n-1)?(right=""+right+value):(left=""+left+value)
    });
    (left-0)+(right-0)===a&&(ans = true);
    return ans;
}
const find_Kap = (n)=>{
    for (let index = 0; index < n+1; index++) {
        kaprekar(index)&&console.log(index)
    }
}
console.log(kaprekar(10000))
// 1518037444
// find_Kap(500000)
const sumMax =(a=[])=>{
    a.sort()
    return a[a.length-1]+(a[a.length-2]|0)
}
console.log(sumMax([1,2,3]))