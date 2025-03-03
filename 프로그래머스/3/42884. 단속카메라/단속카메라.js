function solution(routes) {
    var answer = 1;
    
    routes = routes.sort((a, b) => b[1] - a[1]);

    let out = routes.pop()[1];
    while (routes.length !== 0) {
        const car = routes.pop();
        if (out < car[0]) {
            out = car[1];
            answer++;
        }
    }
    
    return answer;
}