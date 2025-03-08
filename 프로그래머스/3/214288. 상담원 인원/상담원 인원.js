function solution(k, n, reqs) {
    var answer = Infinity;
    
    const possible_mentos = [];
    
    bt(0, [], 0);
    
    for (const mentos of possible_mentos) {
        answer = Math.min(cal(mentos), answer);
    }
    
    function cal(mentos) {
        // 총 대기 시간을 저장할 변수
        let totalWaitTime = 0; 
        
        // 각 유형별 멘토 정보 초기화
        const current_mentos = {};
        for (let i = 0; i < k; i++) {
            current_mentos[i + 1] = {
                max: mentos[i],
                mentees: [] // 각 멘토가 상담 중인 종료 시간 배열
            };
        }
        
        // 요청 목록을 시간순으로 정렬
        const sortedReqs = [...reqs].sort((a, b) => a[0] - b[0]);
        
        for (const req of sortedReqs) {
            const [start, duration, type] = req;
            
            // 현재 요청 시작 시간에 맞춰 멘토 상태 업데이트
            for (let i = 1; i <= k; i++) {
                const updated = [];
                for (let j = 0; j < current_mentos[i].mentees.length; j++) {
                    // 상담이 아직 진행 중인 경우만 유지
                    if (current_mentos[i].mentees[j] > start) {
                        updated.push(current_mentos[i].mentees[j]);
                    }
                }
                current_mentos[i].mentees = updated;
            }
            
            // 해당 유형의 멘토가 가능한지 확인
            if (current_mentos[type].mentees.length < current_mentos[type].max) {
                // 멘토가 가능하면 바로 상담 시작
                current_mentos[type].mentees.push(start + duration);
            } else {
                // 멘토가 불가능하면 가장 빨리 끝나는 멘토를 찾아 대기
                current_mentos[type].mentees.sort((a, b) => a - b);
                const waitEndTime = current_mentos[type].mentees[0];
                const waitTime = waitEndTime - start;
                totalWaitTime += waitTime;
                
                // 멘토 상담 종료 시간 업데이트
                current_mentos[type].mentees[0] = waitEndTime + duration;
            }
        }
        
        return totalWaitTime;
    }
    
    function bt(cnt, arr, depth) {
        if (cnt > n) return; 
        if (depth === k) {
            if (cnt !== n) return; 
            possible_mentos.push([...arr]);
            return;
        }
        
        for (let i = 1; i <= n; i++) {
            arr.push(i);
            bt(cnt + i, arr, depth + 1);
            arr.pop();
        }
    }
    
    return answer;
}