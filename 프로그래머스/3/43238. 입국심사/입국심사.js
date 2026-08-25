// 특정 숫자를 잡아놓고, 그 숫자 안에 전부 끝낼 수 있는지 체크?
// 특정 숫자안에서 times 가 각각 최대 몇 번 처리할 수 있는지 몫 구하기
// 몫이 n 보다 크거나 같으면 정답을 더 줄여보기

function solution(n, times) {
    function binarySearch(min, max) {
        while (min <= max) {
            const mid = Math.floor((min + max) / 2);
            
            let cnt = 0;
            for (const t of times) {
                cnt += Math.floor(mid / t);
            }
            
            if (cnt >= n) max = mid - 1;
            else min = mid + 1;
        }
        
        return min;
    }
    
    return binarySearch(0, times.reduce((acc, cur) => acc + cur * n, 0));
}
