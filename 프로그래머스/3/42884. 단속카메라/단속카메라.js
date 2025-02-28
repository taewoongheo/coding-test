function solution(routes) {
    var answer = 1;
    
    routes.sort((a, b) => a[1] - b[1]);

    let out = routes[0][1];
    for (let i = 1; i < routes.length; i++) {
        if (routes[i][0] > out) {
            answer++;
            out = routes[i][1];
        }
    }
    
    return answer;
}