// 문제요약: 손님들을 받을 수 있는 최소 객실 수 구하기
// 알고리즘 선택: 
//  구현
//  시각을 분 단위로 바꾼 뒤, 시작 시각을 기준으로 오름차순 정렬
//  예약 시각을 하나씩 받으면서 시간 갱신
// 부분문제 분해: 
//  시각->분단위
//      이때 종료시각에는 +10분
//  첫번쨰 예약: book_time.pop()
//  for book_time
//      두번째 예약: book_time.pop()
//      현재 사용중인 방 중 두번째 예약 시작 시각보다 작거나 같은 방들을 모두 제거
//      두번째 예약 방 추가
//      배열 최댓값 길이 갱신

function solution(book_time) {
    var answer = 1;
    
    book_time = book_time.map(el => [
        timeToMinute(el[0]), timeToMinute(el[1]) + 10
    ]);
    
    book_time.sort((a, b) => b[0] - a[0]);
    
    let status = [book_time.pop()[1]];
    
    while (book_time.length) {
        
        const next = book_time.pop();
        const nextStartTime = next[0];
        const nextEndTime = next[1];
        
        const newStatus = [];
        for (let i = 0; i < status.length; i++) {
            if (status[i] > nextStartTime) newStatus.push(status[i]);
        }
        newStatus.push(nextEndTime);
        status = [...newStatus];
        
        answer = Math.max(answer, status.length);
    }
    
    function timeToMinute(time) {
        let minute = 0;
        
        const [h, m] = time.split(':').map(Number);
        minute += h * 60;
        minute += m;
        
        return minute;
    }
    
    return answer;
}