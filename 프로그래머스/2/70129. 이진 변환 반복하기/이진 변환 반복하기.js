function solution(s) {
    const t = (str) => {
        const zcnt = str.matchAll(/0/g);
        
        const nstr = str.replace(/0/g, '').length.toString(2);
        
        return [nstr, [...zcnt].length]
    }
    
    let ans = 0;
    let cnt = 0;
    let str = s;
    while (str !== '1') {
        const [nstr, zcnt] = t(str);
        str = nstr;
        ans++;
        cnt += zcnt;
    }
    
    return [ans, cnt];
}