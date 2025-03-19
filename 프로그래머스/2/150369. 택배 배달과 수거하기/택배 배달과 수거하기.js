// greedy: cap만큼 최대로 채워서 먼 곳에 있는 집부터 처리
//  왜냐하면 거리가 최소가 되려면 먼 곳에 있는 집부터 처리해야 거리가 줄어들기 때문
//  배달관점에서 보면 cap만큼 최대로 채워서 최대로 배달하면 됨
//  수거관점에서 보면 cap만큼 최대로 채워오면 됨
//  cap의 개수는 넘치지만 않으면 상관없음
//  배달과 수거를 따로 분리해서 처리
// 부분문제 분해: 
//  배달해야 하는 가장 멀리있는 집, 수거해야 하는 가장 멀리 있는 집의 인덱스를 구함
//  매 루프마다 cap만큼 처리할 수 있으니까, 
//      배달, 수거를 각각 최대 cap만큼 항상 처리함
//  더해야 하는 거리는 배달, 수거 중 더 멀리 있는 집의 거리만큼
//  만약 두 거리 모두 0이 되면 배달, 수거가 완료됐다는 뜻이므로 종료

function solution(cap, n, deliveries, pickups) {
    var answer = 1;
    
    function getLastHomeIdx(arr) {
      var len  = arr.length;
      for(var i = len-1;i>=0;i--){
        if(arr[i]!==0){
          return i;
        }
        else{
          arr.pop();
        }
      }
      return -1;
    }
    
    function update(arr, idx, cap) {
        while (idx !== -1) {
            let lastIdx = getLastHomeIdx(arr);
            if (cap >= arr[lastIdx]) {
                cap -= arr[lastIdx];
                arr[lastIdx] = 0;
                lastIdx--;
            } else {
                arr[lastIdx] -= cap;
                break;
            }
        }
    }
    
    while (true) {
        const lastDeliverIdx = getLastHomeIdx(deliveries);
        const lastPickupIdx = getLastHomeIdx(pickups);
        
        update(deliveries, lastDeliverIdx, cap);
        update(pickups, lastPickupIdx, cap);
        
        if (lastDeliverIdx === -1 && lastPickupIdx === -1) break;
        
        const longest = Math.max(lastDeliverIdx, lastPickupIdx);
        answer += (longest + 1) * 2;
    }
    
    return answer - 1;
}