// 문제요약: 주어진 괄호 쌍 n을 통해 몇 개의 올바른 괄호 문자열을 만들 수 있는지 구하는 문제
// 입력: 
//  n: 괄호 쌍 개수, 1<=n<=14
// 출력: 
//  result: 정수
// 알고리즘 선택: 
//  dfs:가장먼저 dfs가 떠오름. 모든 괄호를 사용할 때까지 깊이 탐색
//      올바른 괄호 쌍이 되려면,'('이 나오기 전에 ')'이 나오면 안됨
//          dfs탐색을 진행하면서, 총 괄호 개수와, '('의 개수를 카운트 함
//              만약 '('의 개수가 0개라면, 다음에 올 수 있는 문자는 '('만 가능
// 부분문제 분할:
//  dfs(str, openCnt, closeCnt): str:현재 문자열, openCnt:'('개수, closeCnt:')'개수
//      str.length === n*2이면 현재 문자열 break;
//      openCnt, closeCnt 개수 비교
//          if openCnt-closeCnt===0이면 다음에 무조건 open이 와야됨
//          else 면 open, close 둘 다 가능

function solution(n) {
    const strArr = [];
    
    dfs('', n, n);
    
    function dfs(str, openCnt, closeCnt) {
        if (str.length === n * 2) {
            strArr.push(str);
            return;
        }
        
        if (openCnt === closeCnt) {
            // 현재 둘이 사용 개수가 같다 = 쌍이 모두 완성되었다 => 다음에 무조건 새로운 open이 와야 됨
            if (openCnt > 0) {
                dfs(str + '(', openCnt - 1, closeCnt);
            }
        } else {
            if (openCnt > 0) {
                dfs(str + '(', openCnt - 1, closeCnt);
            }
            if (closeCnt > 0) {
                dfs(str + ')', openCnt, closeCnt - 1);
            }
        }
    }
    
    console.log(strArr);
    
    return strArr.length;
}