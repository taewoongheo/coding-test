// 모든 order 를 오름차순 정렬
// course 크기별로 orders 에서 가능합 조합을 생성 및 카운트
// set 에 조합=키 를 저장
// course 별로 가장 많은 메뉴를 선택

function solution(orders, course) {
    orders = orders.map(el => el.split('').sort((a, b) => a.localeCompare(b)).join(''));

    const getCombinations = (arr, selectedNumber) => {
        if (selectedNumber === 1) return arr.map(el => [el]);
        
        const res = [];
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combi = getCombinations(rest, selectedNumber - 1);
            const attached = combi.map(el => [fixed, ...el]);
            res.push(...attached);
        });
        return res;
    }
    
    const res = [];
    
    for (const c of course) {
        const obj = {};
        const keys = new Set();
        
        for (const o of orders) {
            const combinations = getCombinations(o.split(''), c);
            
            for (const combi of combinations) {
                const key = combi.join('');
                keys.add(key);
                
                if (obj[key]) obj[key]++;
                else obj[key] = 1;
            }
        }
        
        let temp = [];
        let max = 0;
        for (const key of keys) {
            const cnt = obj[key];
            if (cnt < 2) continue;
            
            if (cnt > max) {
                max = cnt;
                temp = [key];     
            } else if (cnt === max) {
                temp.push(key);
            }
        }
        
        res.push(...temp);
    }

    return res.sort((a, b) => a.localeCompare(b));
}