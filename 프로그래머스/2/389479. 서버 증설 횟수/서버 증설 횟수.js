// 문제: 총 서버 증설 횟수 구하기
// 서버 객체를 만들어 놓고, 그 수와 비교하면서 서버를 추가

function solution(players, m, k) {
    var answer = 0;
    
    let servers = [];
    for (const player of players) {
        const need = Math.floor(player / m);
        const servercnt = servers.length;
        
        if (need > servercnt) {
            for (let j = 0; j < need - servercnt; j++) {
                servers.push({timer: k});
                answer++;
            }
        }
        
        const newServerStatus = [];
        for (const server of servers) {
            server.timer--;
            if (server.timer === 0) continue;
            newServerStatus.push(server);
        }
        
        servers = [...newServerStatus];
    }
    
    return answer;
}