// 문제: 모든 집에 배달과 수거를 할 때 최소 이동거리 구하기
// 생각해보면 가장 먼 집부터 처리해야 이동거리가 최소가 됨
// 또한 cap만큼 가지고 출발할 수 있는데, 한번 출발할 때 최대한 배달하고 최대한 수거해야 함
// 이때 얼마나 갖고 출발할 지는 상관없음. 
//  왜냐하면 가능한만큼 최대로 배달하고 돌아올 때 수거한다고 했을 때, 현재 cap을 항상 0으로 맞출 수 있기 때문
//  따라서 맨 끝 집부터 cap만큼 배달하고, 맨 끝 집부터 cap만큼 수거하면 된다
// 두 배열을 따로 움직이도록, 이때 더 먼거리를 기준으로 거리를 증가시키면 된다

function solution(cap, n, deliveries, pickups) {
    var answer = 0;
    
    while (true) {
        const dIdx = getLast(deliveries);
        const pIdx = getLast(pickups);
        
        if (dIdx === -1 && pIdx === -1) break;
        
        update(deliveries, cap);
        update(pickups, cap);
        
        answer += (Math.max(dIdx, pIdx) + 1) * 2;
    }
    
    function getLast(arr) {
        let idx = arr.length - 1;
        while (arr.length) {
            if (arr.at(-1) !== 0) return idx;
            else arr.pop();
            idx--;
        }
        
        return idx;
    }
    
    function update(arr, cap) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] > cap) {
                arr[i] -= cap;
                return;
            } else {
                cap -= arr[i];
                arr[i] = 0;
            }
        }
    }
    
    return answer;
}