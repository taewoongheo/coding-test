// 문제: 두 정수 X, Y로 만들 수 있는 최대 정수 구하기
// 가장 큰 정수가 나오려면 가장 큰 수부터 높은 자리에 배치해야 한다
// 두 문자열에서 각 정수가 나오는 개수를 카운트
// 개수가 큰 수부터 앞에 배치하기

function solution(X, Y) {
    let result = '';
    const numObj = {};

    for (const char of X) {
        numObj[char] = (numObj[char] || 0) + 1;
    }

    for (const char of Y) {
        if (!numObj[char]) continue;
        result += char;
        numObj[char]--;
    }
    
    if (result === '') return '-1';
    if (+result === 0) return '0';
    return [...result]
        .map((num) => +num)
        .sort((a, b) => b - a)
        .join(''); 
}