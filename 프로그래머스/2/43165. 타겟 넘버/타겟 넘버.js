// 문제요약: 주어진 숫자로 타겟넘버를 만드는 방법의 수 구하기
// 입력: 
//  numbers: 주어진 숫자
//  target: 타겟넘버
// 출력: 경우의 수
// 조건: 
//  2<=numbers<=20
//  1<=number<=50
//  1<=target<=1000
// 알고리즘 선택: dfs
//  dfs: 각 숫자를 더하거나 빼는 방식으로 모든 numbers를 사용할 때까지 재귀
//      O(2^20)
// 부분문제 분할: 
//  dfs(idx, num):
//      idx가 numbers.length-1이 되면 num과 target을 비교 후 카운트
//      idx을 1씩 증가시키면서 다음 숫자를 더하기 + 빼기 하면서 재귀

function solution(numbers, target) {
    var answer = 0;
    
    dfs(-1, 0);
    
    function dfs(idx, num) {
        if (idx === numbers.length - 1) {
            if (num === target) {
                answer++;
            }
            return;
        }
        dfs(idx + 1, num + numbers[idx + 1]);
        dfs(idx + 1, num - numbers[idx + 1]);
    }
    
    return answer;
}