function solution(n) {
    var answer = 0;
    
    const nCnt = n.toString(2).match(/1/g).length;
    
    let num = n;
    while (true) {
        const cnt = (++num).toString(2).match(/1/g).length;
        
        if (nCnt === cnt) return num;
    }
}