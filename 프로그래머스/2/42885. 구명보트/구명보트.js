function solution(people, limit) {
    var answer = 0;
    
    people.sort((a, b) => a - b);
    
    while (people.length) {
        const p = people.pop();
        
        if (people.length) {
            const s = people.at(0);
            if (p + s <= limit) {
                people.shift();
            }
        }
        
        answer++;
    }
    
    return answer;
}