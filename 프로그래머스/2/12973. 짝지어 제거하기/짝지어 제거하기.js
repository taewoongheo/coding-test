function solution(s) {
    
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const pop = stack.at(-1);
        
        if (char === pop) {
            stack.pop();
            continue;
        }
        
        stack.push(char);
    }

    return Number(!stack.length);
}