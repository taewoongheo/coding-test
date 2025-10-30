function solution(clothes) {
    let ans = 0;
    
    const c = clothes.reduce((obj, cur) => {
        const [_, name] = cur;
        if (!obj[name]) obj[name] = 1;
        obj[name]++;
        return obj;
    }, {});
    
    const arr = Object.keys(c);
    
    return arr.reduce((acc, cur) => acc * c[cur], 1) - 1;
}