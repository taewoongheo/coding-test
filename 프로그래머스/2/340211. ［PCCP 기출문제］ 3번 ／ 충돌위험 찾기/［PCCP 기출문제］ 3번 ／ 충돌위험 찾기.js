function solution(points, routes) {
    var answer = 0;
    
    const robot_routes = [];
    let maxD = 0;
    for (let i = 0; i < routes.length; i++) {
        const robot_route = [];
        let cnt = 1; 
        let tr = 0, tc = 0;
        for (let j = 0; j < routes[i].length - 1; j++) {
            let [sr, sc] = points[routes[i][j] - 1];
            [tr, tc] = points[routes[i][j + 1] - 1];
            
            while (sr !== tr || sc !== tc) {
                robot_route.push([sr, sc]);
                const [nr, nc] = next(sr, sc, tr, tc);
                sr = nr;
                sc = nc;
                
                cnt++;
                maxD = Math.max(maxD, cnt);
            }
        }
        robot_route.push([tr, tc]);
        robot_routes.push(robot_route);
    }
    
    // 충돌 검사 로직 수정
    for (let i = 0; i < maxD; i++) {
        // 각 위치에 있는 로봇 수를 저장하는 맵
        const positionMap = new Map();
        
        for (let j = 0; j < robot_routes.length; j++) {
            // 로봇이 해당 시간에 경로를 완료했으면 건너뛰기
            if (i >= robot_routes[j].length) continue;
            
            const [r, c] = robot_routes[j][i];
            const key = `${r},${c}`;
            
            if (!positionMap.has(key)) {
                positionMap.set(key, 1);
            } else {
                positionMap.set(key, positionMap.get(key) + 1);
            }
        }
        
        // 각 위치별로 2대 이상의 로봇이 있는지 확인하고 위험 상황 카운트
        for (const count of positionMap.values()) {
            if (count >= 2) {
                answer++;
            }
        }
    }
    
    function next(r, c, nr, nc) {
        if (r !== nr) return r > nr ? [r - 1, c] : [r + 1, c];
        if (c !== nc) return c > nc ? [r, c - 1] : [r, c + 1];
        return [r, c];
    }
    
    return answer;
}