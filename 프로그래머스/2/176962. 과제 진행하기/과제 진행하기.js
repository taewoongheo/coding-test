// 시간을 분 단위로 변환해서 정렬
// 차례대로 루프
//  현재 진행중인 과제를 바로 끝낼 수 있을지 알아야됨 + 시간이 남으면 안끝난 과제를 마저 진행해야됨
//      이걸 알려면 다음 과제가 시작되는 시각을 알아야됨
//  현재 과제의 playtime 와 다음과제시각-현재과제시각 의 차를 구함 = diff
//      diff >= playtime 이라면 result 에 바로 담고, 남은 시간만큼 안끝난 과제를 진행
//          사용할 수 있는 시간인 diff - playtime 에서 차례대로 사용
//      diff < playtime 이라면 playtime -= diff 후 스택에 담음

function solution(plans) {
    const timeToMin = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
    }
    
    plans = plans.map(el => [el[0], timeToMin(el[1]), Number(el[2])]).sort((a, b) => a[1] - b[1]);
    
    const result = [];
    const stack = []; // [name, playtime]
    for (let i = 0; i < plans.length - 1; i++) {
        const [name, start, playtime] = plans[i];
        const nextStart = plans[i + 1][1];
        
        let timeLeft = nextStart - start;
        if (playtime <= timeLeft) {
            // 다 끝내고도 시간이 남음
            
            result.push(name);
            timeLeft -= playtime;
            while (stack.length) {
                const [rName, rPlaytime] = stack.pop();
                if (rPlaytime <= timeLeft) {
                    timeLeft -= rPlaytime;
                    result.push(rName);
                } else {
                    stack.push([rName, rPlaytime - timeLeft]);
                    break;
                }
            }
        } else {
            // 다 못끝냄
            stack.push([name, playtime - timeLeft]);
        }
    }
    
    result.push(plans.at(-1)[0]);
    while (stack.length) {
        result.push(stack.pop()[0]);
    }
    
    return result;
}