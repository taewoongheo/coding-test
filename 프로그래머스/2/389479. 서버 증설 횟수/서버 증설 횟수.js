// server: {time: number}
// 현재 사용자 수와 m을 나눈 몫과 servers 배열 길이 비교
// servers 배열돌면서 time 하나씩 증가 + 부족한 만큼 추가
//  k 지나면 서버 없애기
// 부족한만큼 카운트 증가

function solution(players, m, k) {
    let ans = 0;
    let servers = [];
    
    for (const player of players) {
        const newServers = [];
        for (const server of servers) {
            let { time } = server;
            time++;
            if (time > k) continue;
            newServers.push({time});
        };
        servers = [...newServers];
        
        const need = Math.floor(player / m);
        const diff = Math.max(need - servers.length, 0);
        
        ans += diff;
        
        for (let i = 0; i < diff; i++) {
            servers.push({time: 1});
        }
    }
    
    return ans;
}