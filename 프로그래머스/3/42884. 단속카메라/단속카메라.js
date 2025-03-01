function solution(routes) {
    var answer = 1;
    
    routes = routes.sort((a, b) => b[1] - a[1]);

    let v = routes.pop()[1];
    while (routes.length !== 0) {
        const [s, e] = routes.pop();
        if (v < s) {
            answer++;
            v = e;
        }
    }
    
    return answer;
}