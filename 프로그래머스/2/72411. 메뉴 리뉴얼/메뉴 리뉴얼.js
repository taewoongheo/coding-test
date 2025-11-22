// 각 order 별 가능한 조합을 모두 구한 뒤, 다른 order 의 조합에 2번 이상 포함되는지 확인
//  최악의 경우: orders 길이=20, order길이=10, course=10
//      order 하나 당 가능한 조합 수 = (10!/2!8! + 10!/3!7! + 10!/4!6! + ... + 10!/10!) x 10 x 20 = 202600 시간초과 x

function solution(orders, course) {
    const dfs = (depth, arr, str, s) => {
        if (str.length === depth) return [str];
        
        const res = [];
        for (let i = s; i < arr.length; i++) {
            res.push(...dfs(depth, arr, str + arr[i], i + 1));
        }
        
        return res;
    }
    
    const lenMap = course.reduce((obj, c) => {
        obj[c] = new Set();
        return obj;
    }, {});
    const cntMap = new Map();
    
    for (const order of orders) {
        const arr = order.split('').sort();
        for (const c of course) {
            const combinations = dfs(c, arr, '', 0);
            for (const combi of combinations) {
                lenMap[combi.length].add(combi);
                const cnt = cntMap.get(combi);
                if (!cnt) {
                    cntMap.set(combi, 1);
                    continue;
                }
                cntMap.set(combi, cnt + 1);
            }
        }
    }
    
    const res = [];
    for (const c of course) {
        const arr = lenMap[c];
        let max = 0;
        let maxArr = [];
        for (const str of arr) {
            const cnt = cntMap.get(str);
            if (cnt < 2) continue;
            if (cnt === max) maxArr.push(str);
            else if (cnt > max) {
                max = cnt;
                maxArr = [str];
            }
        }
        res.push(...maxArr);
    }
    
    return res.sort();
}