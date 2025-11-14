// 숫자를 모두 사용하지 않아도 되므로 각 자릿수마다 7!/6! + 7!/5! + 7!/4! + 7!/3! + 7!/2! + 7!/1! + 7!/0!
//  가장 큰 수인 7!이 5000 이니까 나머질 다 더해도 시간초과 안뜸

function solution(numbers) {
    const set = new Set();
    const arr = numbers.split('');
    const len = arr.length;
    
    const dfs = (depth, num, v) => {
        if (len === depth) {
            return;
        }
        
        for (let i = 0; i < arr.length; i++) {
            if (v[i]) continue;
            
            v[i] = true;
            const nNum = num + arr[i];
            set.add(Number(nNum));
            dfs(depth + 1, nNum, v);
            v[i] = false;
        }
    }
    
    const v = Array.from({length: len}, () => false);
    dfs(0, '', v);
    
    let ans = 0;
    for (const num of set) {
        if (num <= 1) continue;
        const sq = Math.sqrt(num);
        let flag = true;
        for (let i = 2; i <= sq; i++) {
            if (num % i === 0) {
                flag = false;
                break;
            }
        }
        
        if (flag) ans++;
    }
        
    return ans;
}