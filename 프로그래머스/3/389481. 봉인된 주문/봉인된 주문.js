// 문제요약: 봉인된 주문을 제외했을 때 n 번째 주문 찾기
// 알고리즘 선택: 
//  a~z를 사용하는 26진수
//  문자열->숫자, 숫자->문자열
// 부분문제 분해: 
//  bans 를 내림차순 정렬
//  pop 하면서 n 보다 작은 봉인된 문자열이 있다면, n++
//  만약 더 작은 문자열이 나온다면 break 후 n을 문자열로 바꿔서 바로 출력

function solution(n, bans) {
    var answer = '';
    
    bans = bans.sort((a, b) => strToNum(b) - strToNum(a));
    
    console.log(numToStr(n))
    console.log(bans)
    while (bans.length) {
        if (n >= strToNum(bans.pop())) {
            n++;
            continue;
        };
        
        break;
    }
    
    function strToNum(str) {
        let num = 0;
        
        for (let i = 0; i < str.length; i++) {
            num = num * 26 + (str.charCodeAt(i) - 96);
        }
        
        return num;
    }
    
    function numToStr(num) {
        let str = '';
        
        while (num > 0) {
            num--;
            str = String.fromCharCode(num % 26 + 97) + str;
            num = Math.floor(num / 26);
        }
        
        return str;
    }
    
    return numToStr(n);
}