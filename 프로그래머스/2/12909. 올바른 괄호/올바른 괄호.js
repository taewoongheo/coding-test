function solution(s){

    const stack = [];
    
    for (const char of s) {
        
        if (char === ')') {
            if (stack.pop() !== '(') return false;
        } else {
            stack.push(char);
        }
    }
    
    if (stack.length) return false;

    return true;
}