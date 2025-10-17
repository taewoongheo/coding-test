// stack
// '(' 가 들어오면 push
// ')' 가 들어왔을 때 스택이 비어있으면 false, 비어있지 않다면 pop

function solution(s){
    const arr = s.split('');
    const stack = [];
    
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i];
        if (el === '(') {
            stack.push('(');
            continue;
        }
        
        if (!stack.length) {
            return false;
        }
        
        stack.pop();
    }
    
    return !stack.length;
}