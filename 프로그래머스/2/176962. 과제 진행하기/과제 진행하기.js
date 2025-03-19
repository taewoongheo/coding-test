// 규칙: 
//  과제는 시각이 되면 바로 시작, 기존에 진행중인 과제가 있으면 그걸 멈춤
//  현재 시각에 할 거 없으면 미뤄둔 과제 진행(최근에 멈춘 것부터)
// 문제 요약: 과제가 끝난 순서대로 반환
// 알고리즘 선택: 
//  구현
//  시작시각을 기준으로 정렬
//      분 단위로 변경
//  stop 배열을 만들고, 여기에 첫번째과제 넣고 시작
//  time=첫번째과제 시작 시각
//  for 나머지 과제들:
//      다음 과제의 시작시각과 현재시각 차이
//      for stop:
//          차이를 모두 소모할 때까지 stop 배열 갱신
//      stop 배열 업데이트
//   stop에 남아있는 순서대로 모두 출ㄹ력

function solution(plans) {
    var answer = [];
    
    const timeToMinute = (time) => {
        let minute = 0; 
        
        const [h, m] = time.split(':').map(Number);
        minute += h * 60;
        minute += m;
        
        return minute;
    }
    
    plans = plans.map(el => [el[0], timeToMinute(el[1]), el[2]])
                .sort((a, b) => b[1] - a[1]);
    let stop = [plans.pop()];
    let time = stop[0][1];
    
    while (plans.length) {
        const next = plans.pop();
        
        let diff = next[1] - time;
        time = next[1];
        const newStop = [next];
        for (let i = 0; i < stop.length; i++) {
            const cur = stop[i];
            if (diff >= cur[2]) {
                diff -= cur[2];
                answer.push(cur[0]);
            } else {
                cur[2] -= diff;
                diff = 0;
                newStop.push(cur);
            }
        }
        stop = [...newStop];
    }
    
    for (let i = 0; i < stop.length; i++) {
        answer.push(stop[i][0]);
    }
    
    return answer;
}