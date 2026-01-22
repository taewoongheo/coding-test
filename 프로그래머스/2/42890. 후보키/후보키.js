// 조합으로 가능한 키를 전부 구함
//  각 조합당 키의 개수는 계속 늘려감
//  이때 이전에 생성된 키가 포함되어 있다면 제외
// 각 키가 전부 가능한지 직접 검사

function solution(relation) {
    
    const getCombinations = (arr, selectedNumber) => {
        if (selectedNumber === 1) return arr.map(el => [el]);
        
        const res = [];
        arr.forEach((fixed, index, origin) => {
            const rest = origin.slice(index + 1);
            const combinations = getCombinations(rest, selectedNumber - 1);
            const attached = combinations.map(combi => [fixed, ...combi]);
            res.push(...attached);
        })
        
        return res;
    }
    
    const arr = Array.from({length: relation[0].length}, (_, i) => i);
    
    const getKey = (combi) => combi.join('-');
    
    const check = (combi, candidate) => {
        for (const candiSet of candidate) {
                // candiSet(이미 확정된 후보키)의 모든 요소가 
                // 현재 조사 중인 combi에 전부 포함되어 있는지 확인
                const isSubset = [...candiSet].every(el => combi.includes(el));

                if (isSubset) return false; // 하나라도 부분집합이면 최소성 위배
            }
        return true;    
    }
    
    const candidate = [];
    for (let i = 1; i <= arr.length; i++) {
        const combi = getCombinations(arr, i);

        for (const c of combi) {
            if (!check(c, candidate)) continue;
            
            const key = getKey(c);
        
            let possible = true;
            
            const validateSet = new Set();
            
            const map = new Map();
            
            for (let j = 0; j < relation.length; j++) {
                const r = relation[j];
                map.set(j, []);
                const arr = map.get(j);
                for (const idx of c) {
                    arr.push(r[idx]);
                }
            }
            
            for (const arr of map.values()) {
                validateSet.add(getKey(arr));
            }
            
            if (validateSet.size === relation.length) {
                candidate.push(new Set(c));
            }
        }
    }
    
    return candidate.length;
}