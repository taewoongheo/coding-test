// 알고리즘 요약: 서버 한 대가 m명 미만까지 수용 가능하고, k동안 유지될 때 최소 증설 횟수 구하기
// 알고리즘 선택: 
//  단순구현
// 부분문제 분해: 
//  0/3=0
//  1/3=0
//  2/3=0
//  3/3=1
//  4/3=1
//  10/3=3
//  현재 게임 이용자의 수를 이용해 필요한 서버의 개수를 구함=Math.floor(p/m);
//  현재 서버개수와 필요한 서버의 개수를 비교하고 부족하다면 추가
//  마지막에 서버의 타이머를 1씩 증가하고 k를 넘으면 제거

function solution(players, m, k) {
    var answer = 0;
    
    let server = [];
    for (let i = 0; i < players.length; i++) {
        const servercnt = server.length;
        const playercnt = players[i];
        const need = Math.floor(playercnt / m);
        
        if (servercnt < need) {
            for (let j = 0; j < need-servercnt; j++) {
                server.push(1);
                answer++;
            }
        }
        
        server = server.reduce((server, el) => {
            if (el + 1 > k) return server;
            server.push(el + 1);
            return server;
        }, []);

    }
    
    return answer;
}