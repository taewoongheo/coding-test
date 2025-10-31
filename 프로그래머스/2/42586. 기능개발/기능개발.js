// 기능 완성까지 필요한 남은 일 수 구하기
// 0번째 progresses 부터 검사하면서 자신보다 큰 수가 나올때까지 계속 pop
// 멈추면 거기서 cnt++

function solution(progresses, speeds) {
    const ans = [];
    
    const remainArr = progresses.map((el, idx) => {
        const remain = 100 - el;
        return Math.ceil(remain / speeds[idx]);
    });
    
    let last = remainArr[0];
    let cnt = 1;
    
    for (let i = 1; i < remainArr.length; i++) {
        const item = remainArr[i];
        
        if (last < item) {
            last = item;
            ans.push(cnt);
            cnt = 1;
            continue;
        }
        
        cnt++;
    }
    
    ans.push(cnt);
    
    return ans;
}