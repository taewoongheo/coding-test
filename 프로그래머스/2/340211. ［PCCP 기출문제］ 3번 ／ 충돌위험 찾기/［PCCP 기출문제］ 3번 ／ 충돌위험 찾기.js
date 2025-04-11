// 문제: 로봇들이 경로로 이동 시 충돌위험의 개수 구하기
// points<=100, routes(=로봇 수)<=100
// 로봇은 항상 최단경로로 이동(r좌표 우선) => bfs x, 단순 계산으로 가능
// 시간대별로 로그를 기록하는 map을 하나 만들고, map의 각 시간을 순회하며 동일한 좌표가 있는지 검사

function solution(points, routes) {
    var answer = 0;
    
    const map = new Map();
    
    for (const route of routes) {
        let time = 0; 
        if (!map.has(time)) map.set(time, []);
        
        let [cr, cc] = points[route.shift() - 1];
        map.get(time).push([cr, cc]);
        time++;
        
        for (const r of route) {
            let [nr, nc] = points[r - 1];
            while (cr !== nr || cc !== nc) {
                if (!map.has(time)) map.set(time, []);
                
                if (cr !== nr) {
                    const dir = cr > nr ? -1 : 1;
                    cr += dir;
                } else if (cc !== nc) {
                    const dir = cc > nc ? -1 : 1;
                    cc += dir;
                }
                
                map.get(time).push([cr, cc]);
                time++;
            }
        }
    }
    
    for (const coor of map.values()) {
        const cntmap = new Map();
        for (const c of coor) {
            const key = `${c[0]} ${c[1]}`;
            if (!cntmap.has(key)) cntmap.set(key, {cnt: 0});
            else cntmap.get(key).cnt++;
        }
        
        for (const v of cntmap.values()) {
            const { cnt } = v;
            if (cnt > 0) answer++;
        }
    }
    
    return answer;
}