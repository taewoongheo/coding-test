function solution(clothes) {
    const obj = clothes.reduce((o, c) => {
        o[c[1]] = o[c[1]] + 1 || 2;
        return o;
    }, {});
    
    console.log(Object.entries(obj));
    return Object.entries(obj).reduce((acc, cur) => acc * cur[1], 1) - 1;
}