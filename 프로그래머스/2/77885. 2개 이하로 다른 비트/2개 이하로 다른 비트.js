// 01111~(15자리)인 경우, num=10000~(15자리)부터 시작
// 그럼 13자리를 1로 채울때까지 루프 돌리면 시간초과

function solution(numbers) {
    const ans = [];
    
    for (const number of numbers) {
        if (number < 2 || number % 2 === 0) {
            ans.push(number + 1);
        } else {
            let c = 2;
            while(true) {
                if ((number + 1) % (c * 2) === 0) {
                    c *= 2;
                    continue;
                } 
                
                break;
            }
            ans.push(number + c / 2)
        }
    }
    
    return ans;
}