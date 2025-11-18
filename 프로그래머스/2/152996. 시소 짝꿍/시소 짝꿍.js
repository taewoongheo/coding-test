// 하나 잡고 나머지들이랑 전부 비교하면 100000x100000=10000000000 시간초과
// 정렬하고 자신보다 큰 애들이랑만 비교하면 최악의 경우 1~100000 더하기=100000x99999/2=9999900000/2 시간초과
//  근데 최대 길이보다 weights 의 범위가 더 작음. 즉, 최악의 경우에도 항상 중복이 존재
//  중복을 고려해서 최악의 경우의 수는 중복이 최소 100 개 존재(=weigths 가 1000개의 종류라면, 최대길이 100000에서 중복이 100개 존재)
//  즉, 중복을 제외하고 비교하면 1~1000 더하기 = 1000x999/2=999000/2 가능

function solution(weights) {
    const obj = new Map();
    for (const weight of weights) {
        const cnt = obj.get(weight);
        if (!cnt) {
            obj.set(weight, 1);
            continue;
        }
        obj.set(weight, cnt + 1);
    }
    
    const arr = [];
    for (const key of obj.keys()) {
        arr.push({weight: key, cnt: obj.get(key)});
    }

    arr.sort((a, b) => a.weight - b.weight);
    
    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
        const sw = arr[i].weight;
        const sc = arr[i].cnt;
        // 자기자신
        if (sc > 1) {
            ans += (sc * (sc - 1)) / 2;
        }
        for (let j = i + 1; j < arr.length; j++) {
            // 4:2, 4:3, 3:2
            const bw = arr[j].weight;
            const bc = arr[j].cnt;
            if (sw * 4 === bw * 2) {
                ans += sc * bc;
            } 
            if (sw * 4 === bw * 3) {
                ans += sc * bc;
            }
            if (sw * 3 === bw * 2) {
                ans += sc * bc;
            }
        }
    }
    
    return ans;
}