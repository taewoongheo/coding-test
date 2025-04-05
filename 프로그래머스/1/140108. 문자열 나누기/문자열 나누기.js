// 문자열을 하나씩 돌면서 카운트 하면 됨

function solution(s) {    
    const arr = [s[0]];
    
    let idx = 0;
    let cCnt = 1;
    let oCnt = 0;
    for (let i = 1; i < s.length; i++) {
        const cur = s[i];
        
        if (!arr[idx]) {
            arr.push(cur);
            cCnt = 1; 
            oCnt = 0;
            continue;
        }
        
        if (arr[idx] === cur) {
            cCnt++;
        }
        else {
            oCnt++;
        }
        
        if (cCnt === oCnt) {
            idx++;
        }
    }
    
    console.log(arr);
    
    return arr.length;
}