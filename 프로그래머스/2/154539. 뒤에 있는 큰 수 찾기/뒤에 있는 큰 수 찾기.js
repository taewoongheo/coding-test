// 문제요약: 각 원소의 뒷 큰수 반환하기
// 알고리즘 선택: 
//  각 원소마다 자신보다 큰 수를 매 반복문 돌리면 시간초과
//  뒤에서부터 시작, 지금까지의 값을 기록하는 배열을 만듦
//  현재 수와 값 배열의 마지막 인덱스부터 비교,
//      현재 값이 값 배열의 값보다 모두 크다면 -1
//      현재 값이 값 배열의 원소보다 작다면, 그 값을 배열에 채워넣음
//          이때 현재 값보다 작은 값 배열의 원소들은 모두 갱신해야 됨
//  기록배열의 값보다 현재 값이 더 크다면,
//      앞에 있는 값들은 기록배열의 기존값이 아닌, 현재 값을 선택할 것이므로, 기존의 기록배열 값들은 의미가 없어짐
// 부분문제 분해: 
//  뒤에서부터 시작
//  for 기록배열 in i: 뒤에서부터 검사
//      현재 값보다 더 큰 값을 만날때까지 찾음
//      찾으면 바로 값 저장 후 break
//  기록된 값이 없다면 -1, 있으면 해당 값 사용
//  기록배열의 마지막 값에 현재 값 push

function solution(numbers) {
    var answer = Array.from({length: numbers.length}, () => 0);
    
    let memo = [];
    for (let i = numbers.length - 1; i >= 0; i--) {
        const current = numbers[i];
        
        let num = -1;
        const copyMemo = [];
        for (let j = 0; j < memo.length; j++) {
            if (current >= memo[j]) break;
            
            copyMemo.push(memo[j]);
            num = memo[j];
        }
        
        answer[i] = num;
        memo = [...copyMemo, current];
    }
    
    return answer;
}