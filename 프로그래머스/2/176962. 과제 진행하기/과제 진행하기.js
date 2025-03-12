// 규칙: 
//  과제는 시간이 되면 무조건 시작, 기존 과제는 멈춤
//  현재 진행할 과제가 없다면 아까 멈춰놨던 과제를 이어서 마저 진
//  최근에 멈춘 과제부터 시작
// 문제요약: 과제가 끝난 순서대로 이름을 리턴
// 알고리즘 선택: 
//  구현
// 부분문제 분해: 
//  시작시각을 분으로 파싱, 오름차순 정렬
//  현재 시각=첫번째 과제의 시작시각
//  for 두번째과제부터 끝까지:
//      다음과제와 현재시각의 차를 계산
//      for 대기중인 과제:
//          대기중인 과제들에서 차만큼 차감
//      현재시각 갱신

function solution(plans) {
    var answer = [];
    
    const timeToNum = (time) => {
        let minute = 0; 
        
        const [h, m] = time.split(':').map(Number);
        
        minute += h * 60;
        minute += m;
        
        return minute;
    }
    
    plans = plans.sort((a, b) => timeToNum(b[1]) - timeToNum(a[1]));
    
    const first = plans.pop();
    let time = timeToNum(first[1]);
    let stop = [{ name: first[0], need: first[2] }];
    
    while (plans.length) {
        const next = plans.pop();
        const nname = next[0];
        const nstart = timeToNum(next[1]);
        const nneed = next[2];
        
        let remain = nstart - time;
        let newStop = [{ name: nname, need: nneed }];
        for (let i = 0; i < stop.length; i++) {
            const cur = stop[i];
            const cname = cur.name;
            let cneed = cur.need;
            
            if (remain >= cneed) {
                // 남은 시간이 더 많다면,
                remain -= cneed;
                answer.push(cname);
            } else {
                // 남은 시간이 더 적다면,
                cneed -= remain;
                remain = 0;
                newStop.push({ name: cname, need: cneed });
            }
        }
        time = nstart;
        stop = [...newStop];
    }
    
    for (let i = 0; i < stop.length; i++) {
        answer.push(stop[i].name);
    }
    
    return answer;
}