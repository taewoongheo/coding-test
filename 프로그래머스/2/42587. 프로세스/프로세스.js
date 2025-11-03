function solution(priorities, location) {
    const queue = priorities.reduce((que, pri, idx) => {
        que.push({
            pri: pri,
            loc: idx
        });
        
        return que;
    }, []);
    
    const check = (priority) => {
        for (let i = 0; i < queue.length; i++) {
            const { pri } = queue[i];
            if (priority < pri) return false;
        }
        
        return true;
    }
    
    let ans = 0;
    while (queue.length) {
        const { pri, loc } = queue.shift();
        
        if (check(pri)) {
            ans++;
            
            if (loc === location) {
                break;
            }
            
            continue;
        }
        
        queue.push({ pri, loc });
    }
    
    return ans;
}