// 규칙:
//  과제 시작 시각에 시작
//  과제 진행중일 때 새로운 과제가 들어오면 새로 들어온 과제 시작
//  현재 진행중인 과제가 없다면 아까 멈춘 과제 다시 시작
// 문제요약: 과제가 끝난 순서대로 이름을 반환
// 부분문제 분해: 
//  plans의 start를 모두 분 단위로 변환 후 오름차순 정렬
//  tasks=[]: 진행중인 과제들
//      {name: 이름, need: 남은시간}
//  current=plans.shift(): 현재 진행중인 과제
//  time=curent.start: 현재시각
//  for plans:
//      next: 다음과제
//      remain=next.start - time: 현재과제가 다음과제까지 남은 시간
//      time=next.start: 다음시간으로 업데이트
//      nextTasks=[next]: tasks에 복사할 배열, 상태 업데이트
//      for tasks: 
//          [name, need] = tasks
//          if (remain >= need): 필요시간보다 다음과제까지 남은 시간이 많거나 같은 경우
//              remain-=need
//              answer.push(task)
//          else (remain < need): 필요시간보다 남은 시간이 모자란 경우
//              remain = 0
//              nextTasks.push(task): 끝내지 못했으므로 다음 일과에 추가

function solution(plans) {
    var answer = [];
    
    const timeToMinute = (time) => {
        let ret = 0;
        
        const [hour, minute] = time.split(':').map(Number);
        
        ret += hour * 60;
        ret += minute;
        
        return ret;
    }
    
    plans = plans.sort((a, b) => timeToMinute(a[1]) - timeToMinute(b[1]));
    
    let current = { name: plans[0][0], need: Number(plans[0][2]) };
    let time = timeToMinute(plans[0][1]);
    let tasks = [current];
    
    for (let i = 1; i < plans.length; i++) {
        const next = plans[i];
        
        // 다음 과제까지 남은 시간
        let remain = timeToMinute(next[1]) - time;
        const nextTasks = [{ name: next[0], need: Number(next[2]) }];
        for (let j = 0; j < tasks.length; j++) {
            let { name, need } = tasks[j];
            
            if (remain >= need) {
                remain -= need;
                answer.push(name);
            } else {
                need -= remain;
                remain = 0;
                nextTasks.push({ name: name, need: need });
            }
        }
        
        time = timeToMinute(next[1]);
        tasks = [...nextTasks];
    }
    
    for (let i = 0; i < tasks.length; i++) {
        answer.push(tasks[i].name);
    }
    
    return answer;
}