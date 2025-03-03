function solution(points, routes) {
    let answer = 0;
    
    const getNextPosition = (r, c, targetR, targetC) => {
        if (r !== targetR) return r > targetR ? [r-1, c] : [r+1, c];
        if (c !== targetC) return c > targetC ? [r, c-1] : [r, c+1];
        return [r, c];
    }
    
    let arr = [];
    let maxIdx = 0;
    
    // 각 로봇의 경로 계산
    routes.forEach((route) => {
        let routeCopy = [...route]; // 원본 보존을 위해 복사
        let sPoint = routeCopy.shift();
        let history = [points[sPoint - 1]];
        
        while (routeCopy.length) {
            let [r, c] = history.at(-1);
            let [tr, tc] = points[routeCopy[0] - 1];
            
            let [nr, nc] = getNextPosition(r, c, tr, tc);
            
            history.push([nr, nc]);
            if (nr === tr && nc === tc) {
                routeCopy.shift();
            }
        }
        
        maxIdx = Math.max(maxIdx, history.length);
        arr.push(history);
    });
    
    // 각 시간별로 위험 상황 확인
    for (let i = 0; i < maxIdx; i++) {
        let posMap = new Map();
        
        for (let j = 0; j < arr.length; j++) {
            if (i >= arr[j].length) continue;
            
            const pos = arr[j][i];
            const key = `${pos[0]},${pos[1]}`; // 배열을 문자열로 변환
            
            if (!posMap.has(key)) {
                posMap.set(key, 1);
            } else {
                posMap.set(key, posMap.get(key) + 1);
            }
        }
        
        // 위험 상황 카운트 (한 위치에 로봇이 2대 이상)
        for (const count of posMap.values()) {
            if (count >= 2) {
                answer++;
            }
        }
    }    
    
    return answer;
}