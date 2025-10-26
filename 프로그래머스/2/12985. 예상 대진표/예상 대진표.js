function solution(n,a,b)
{
    let ans = 1;

    let back = Math.max(a, b);
    let front = Math.min(a, b);
    
    while (front + 1 !== back || front % 2 !== 1 || back % 2 !== 0 ) {
        if (front !== 1) {
            if (front % 2 !== 2) {
                front = Math.floor((front + 1) / 2);
            } else {
                front = Math.floor(front / 2);
            }
        }
        
        if (back % 2 !== 2) {
            back = Math.floor((back + 1) / 2);  
        } else {
            back = Math.floor(back / 2);
        }
        
        ans++;
    }

    return ans;
}