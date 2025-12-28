// 재귀함수
//  크게 두 가지 단계
//      n 번째 원판을 원하는 칸으로 옮김
//      그 위의 원판들을 n 번째 원판 위로 옮김
// 동작
//  자신보다 작은 원판들(n-1, n-2, ...)을 나머지 위치로 옮김
//  자신이 옮기고자 하는 위치로 이동
//  자신보다 작은 원판들을 다시 내 위치로 옮김
// 나머지위치 구하기=자신의 위치와 상위 원판이 옮기고자 하는 위치만 알면 결정가능

// func(n, cur, next): n=원판, cur=내위치, next=옮기고자하는 위치
//  if (n === 0) return
//  dnext=getNext(cur, next);
//  func(n-1, cur, dnext); // 자신보다 작은 원판들을 옮기기
//  ans.push([cur, next]); // 기록
//  func(n-1, dnext, cur); // 자신보다 작은 원판들을 자신 위에 쌓기

function solution(n) {
    
    const ans = [];
    
    function hanoi(n, cur, next) {
        if (n === 0) return;
        
        const dnext = getNext(cur, next);
        hanoi(n - 1, cur, dnext);
        ans.push([cur, next]);
        hanoi(n - 1, dnext, next);
    }
    
    function getNext(c1, c2) {
        const arr = [c1, c2];
        if (!arr.includes(1)) return 1;
        else if (!arr.includes(2)) return 2;
        return 3;
    }
    
    hanoi(n, 1, 3);
    
    return ans;
}