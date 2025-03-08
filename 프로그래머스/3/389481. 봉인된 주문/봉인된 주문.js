// 문제요약: 삭제된 주문들을 고려할 때 n 번째 주문을 return
// 알고리즘 선택: 
//  문자열이 나오는 순서가 길이, 알파벳 순서
//  따라서 문자열<->숫자 변환이 가능
//  문자열을 숫자로 변환하여 비교
//  bans를 내림차순으로 정렬
//  하나씩 pop하면서 n과 비교. 이때 n보다 작으면 n++

function solution(n, bans) {
    var answer = '';
    
    const strToNum = (str) => {
        let num = 0;
        
        for (let i = 0; i < str.length; i++) {
            num = num * 26 + (str.charCodeAt(i) - 96);
        }
        
        return num;
    }
    
    const numToStr = (num) => {
        let str = '';
        
        while (num > 0) {
            num--;
            str = String.fromCharCode(num % 26 + 97) + str;
            num = Math.floor(num / 26);
        }
        
        return str;
    }
    
    bans = bans.sort((a, b) => strToNum(b) - strToNum(a));
    while (bans.length) {
        if (n >= strToNum(bans.pop())) n++;
    }
    
    return numToStr(n);
}