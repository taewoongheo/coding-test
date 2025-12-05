// 첫째자리는 3^0 마다 변경
// 둘째자리는 3^1 마다 변경
// 셋째자리는 3^2 마다 변경
// n 번째 자릿수의 시작 수를 구한 뒤, 해당 자릿수가 몇 번 반복되었는지 구함
//  n 번째 자릿수가 몇 번째마다 변경되는지 알기 때문에 몇 번 반복되었는지 알면 현재 수에 대한 n 번째 자릿수를 구할 수 있음

function solution(n) {
    const de = [0, 0];
    let d = 0;
    while (de.at(-1) < n) {
        const pop = de.at(-1);
        de.push(pop + Math.pow(3, d++) * 3);
    }
    
    const md = de.length - 2;
    let ans = '';
    for (let i = md; i >= 1; i--) {
        const scnt = n - de[i]; // 현재 자릿수가 등장한 횟수
        const lcnt = Math.floor(scnt / (Math.pow(3, i - 1) * 3)); // 1,2,4 루프 횟수
        const cnum = lcnt * (Math.pow(3, i - 1) * 3) + de[i]; // 1,2,4 루프 제외하고 시작점부터 가장 가까운 수
        
        const diff = n - cnum;
        if (i === 1) {
            if (diff === 0) ans += '4';
            else ans += diff.toString();
        } else {
            if (diff >= 1 && diff < 1 + Math.pow(3, i - 1)) ans += '1';
            else if (diff >= 1 + Math.pow(3, i - 1) && diff < 1 + Math.pow(3, i - 1) + Math.pow(3, i - 1)) ans += '2';
            else ans += '4';   
        }
    }
    
    return ans;
}