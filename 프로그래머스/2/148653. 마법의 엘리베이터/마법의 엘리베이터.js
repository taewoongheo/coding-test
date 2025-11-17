// 각 자리수가 차례대로 0이 되도록 하면 됨

function solution(storey) {
    let cnt = 0;
    
    const s = 10;
    
    const q = [{cnt: 0, num: storey}];
    
    let min = Infinity;
    while (q.length) {
        let {cnt, num} = q.shift();
        if (num === 0) {
            min = Math.min(cnt, min);
            continue;
        }
        
        const div = num % s;
        num = Math.floor(num / s);
        
        if (div > 5) {
            q.push({cnt: cnt + (10 - div), num: num + 1});
        } else if (div === 5) {
            q.push({cnt: cnt + (10 - div), num: num + 1});
            q.push({cnt: cnt + div, num});
        } else {
            q.push({cnt: cnt + div, num});
        }

    }
    
    return min;
}