function solution(s) {
    let answer = 0;
    
    const check = (arr) => {
        const stack = [];
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];

            if (stack.length) {
                const pop = stack.at(-1);

                if ((pop === '(' && item === ')') ||
                   (pop === '[' && item === ']') ||
                   (pop === '{' && item === '}')) {
                    stack.pop();
                    continue;
                }
            }
            
            stack.push(item);
        }
        
        return !stack.length;
    }
    
    let str = s;
    for (let i = 0; i < s.length; i++) {
        const sarr = str.split('');
        const fir = sarr.shift();
        sarr.push(fir);
        const nStr = sarr.join('');
        
        str = nStr;
        if (check(nStr)) answer++;
    }
    
    return answer;
}