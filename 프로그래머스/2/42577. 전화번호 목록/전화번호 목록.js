// 길이 기준으로 돌리면 20x1000000
// 두 긴 문자열의 앞자리가 일치할 경우 예외
//  "97674223", "9765524421" => false(x)
// 길이별 문자열 분리, 길이 기준으로 루프, 해당 루프의 문자열을 자르고 비교

function solution(phone_book) {

    phone_book.sort((a, b) => a.length - b.length);

    const map = new Map();
    phone_book.forEach(el => map.set(el.length, el.length));
    
    const set = new Set();
    for (const len of map.keys()) {

        for (const number of phone_book) {
            if (len > number.length) continue;
            
            if (len === number.length) {
                set.add(number);
            } else {
                const str = number.substring(0, len);
                if (set.has(str)) return false;
            }
        }
    } 
    
    return true;
}