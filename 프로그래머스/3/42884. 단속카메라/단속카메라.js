function solution(routes) {
    const sort = routes.sort((a, b) => a[1] - b[1]);
    
    let cnt = 1; 
    let end = sort[0][1];
    for (let i = 1; i < sort.length; i++) {
        const [s, e] = sort[i];
        
        if (s > end) {
            end = e;
            cnt++;
        }
    }
    
    return cnt;
}