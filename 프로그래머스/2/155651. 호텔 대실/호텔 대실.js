// 시작시각 기준으로 정렬
// 예약 시간이 하나씩 들어옴
// 현재 사용중인 방 루프를 돌면서 새로 들어온 예약 시간의 시작시각보다 작은 것들은 제거
// 방을 현재 사용중인 방 배열에 추가, 배열의 길이 최솟값 갱신
//  방 최대 개수 1000, 최악의 경우 모든 방이 23:59까지라면 빠지는 방이 없으므로 1000x1000=1000000 가능

function solution(book_time) {
    const t = (time) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    }
    
    const b = book_time.map(el => [t(el[0]), t(el[1])]).sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return a[0] - b[0];
    });
    
    let ans = 0;
    let current = [];
    for (const book of b) {
        const [s, e] = book;
        
        const newCurrent = [];
        for (const c of current) {
            const [cs, ce] = c;
            if (s < ce) newCurrent.push([cs, ce]);
        }
        current = [...newCurrent, [s, e + 10]];
        ans = Math.max(current.length, ans);
    }
    
    return ans;
}