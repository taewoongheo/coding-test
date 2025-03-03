class Route {
    constructor(r, c, t) {
        this.r = r;
        this.c = c;
        this.t = t;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    push(node) {
        if (this.head === null) this.head = node;
        else this.tail.next = node;
        this.tail = node;
        this.length++;
    }
    
    pop() {
        if (this.length === 0) return null;
        const ret = this.head;
        this.head = this.head.next;
        this.length--;
        return ret;
    }
}

function solution(points, routes) {
    var answer = 0;
    
    const maxR = points.reduce((maxR, point) => Math.max(point[0], maxR), 0);
    const maxC = points.reduce((maxC, point) => Math.max(point[1], maxC), 0);
    
    const robots = Array.from({length: routes.length}, () => null);
    // 문제 조건에 맞는 이동 우선순위: r 좌표 이동 우선 (-r, +r, -c, +c)
    const m = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    for (let i = 0; i < routes.length; i++) {
        const routeCopy = [...routes[i]]; // 원본 route 배열 보존을 위해 복사
        bfs(routeCopy, i);
    }
    
    // 충돌 검사
    // 모든 시간대에서 로봇들의 위치를 확인
    const maxTime = Math.max(...robots.map(robot => robot ? robot.t.length : 0));
    
    for (let time = 0; time < maxTime; time++) {
        // 각 시간대의 로봇 위치를 맵에 기록
        const positions = new Map();
        
        for (let robot = 0; robot < robots.length; robot++) {
            if (!robots[robot] || time >= robots[robot].t.length) continue;
            
            const [r, c] = robots[robot].t[time];
            const key = `${r},${c}`;
            
            if (!positions.has(key)) {
                positions.set(key, [robot]);
            } else {
                positions.get(key).push(robot);
            }
        }
        
        // 각 위치에 2대 이상의 로봇이 있는 경우 카운트
        for (const robotsAtPosition of positions.values()) {
            if (robotsAtPosition.length >= 2) {
                answer++;
            }
        }
    }

    function bfs(route, idx) {
        // 시작 포인트 설정
        const startPointIndex = route[0] - 1;
        const [sr, sc] = points[startPointIndex];
        let curRoute = new Route(sr, sc, [[sr, sc]]);
        
        // 각 포인트를 순서대로 방문
        for (let r = 1; r < route.length; r++) {
            const currentPointIndex = route[r] - 1;
            const nextPoint = points[currentPointIndex];
            const q = new Queue();
            q.push(curRoute);
            
            // visited 배열 초기화
            const v = Array.from({length: maxR + 1}, () => 
                          Array.from({length: maxC + 1}, () => false));
            v[curRoute.r][curRoute.c] = true;
            
            while (q.length !== 0) {
                const current = q.pop();
                
                // 목표 지점에 도달한 경우
                if (current.r === nextPoint[0] && current.c === nextPoint[1]) {
                    curRoute = new Route(current.r, current.c, current.t);
                    break;
                }
                
                // 최단 경로 우선순위에 따라 이동
                // 이동 방향의 우선순위: r 좌표 변화 우선 (가까워지는 방향으로)
                const directions = [];
                
                // r 좌표 먼저 이동
                if (current.r < nextPoint[0]) {
                    directions.push(1); // +r 방향
                } else if (current.r > nextPoint[0]) {
                    directions.push(0); // -r 방향
                }
                
                // 그 다음 c 좌표 이동
                if (current.c < nextPoint[1]) {
                    directions.push(3); // +c 방향
                } else if (current.c > nextPoint[1]) {
                    directions.push(2); // -c 방향
                }
                
                // 우선순위 방향이 없다면 모든 방향 시도
                if (directions.length === 0) {
                    directions.push(0, 1, 2, 3);
                }
                
                for (const dir of directions) {
                    const mr = current.r + m[dir][0];
                    const mc = current.c + m[dir][1];
                    
                    // 범위 체크 및 방문 여부 확인
                    if (mr <= 0 || mr > maxR || mc <= 0 || mc > maxC || v[mr][mc]) continue;
                    
                    const newRoute = new Route(mr, mc, [...current.t, [mr, mc]]);
                    q.push(newRoute);
                    v[mr][mc] = true;
                }
            }
        }
        
        robots[idx] = curRoute;
    }
    
    return answer;
}