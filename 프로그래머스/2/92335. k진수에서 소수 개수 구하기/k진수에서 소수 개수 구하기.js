// k진수로 바꾸고 0 기준으로 잘라서 각 원소가 소수인지 검사하면 됨

function solution(n, k) {
    let ans = 0;
    
    const arr = n.toString(k).split('0').reduce((acc, cur) => {
        if (cur !== '' && cur !== '1') acc.push(Number(cur));
        return acc;
    }, []);
    
    const isPrime = (num) => {
        const n = Math.trunc(Math.sqrt(num));
        for (let i = 2; i <= n; i++) {
            if (num % i === 0) return false;
        }
        
        return true;
    }
    
    for (const num of arr) {
        if (isPrime(num)) ans++;
    }
    
    return ans; 
}