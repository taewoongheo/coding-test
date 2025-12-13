// 음수면 절댓값으로 변환
// 최대 3개의 연산자가 주어짐
//  나올 수 있는 최대 경우의 수는 6
// 그럼 완전탐색으로 풀어도 시간초과 발생 안함
// 계산할 땐 연산자 기준으로 나누고, 큐에다가 넣는 방식으로 풀면 됨

function solution(expression) {
    
    const opers = [];
    const dfs = (origin, arr, depth, v = new Set()) => {
        if (depth === 0) {
            opers.push([...arr]);
            return;
        }
        
        for (let i = 0; i < origin.length; i++) {
            if (v.has(origin[i])) continue;
            
            v.add(origin[i]);
            arr.push(origin[i]);
            dfs(origin, arr, depth - 1, v);
            arr.pop();
            v.delete(origin[i]);
        }
    }
    
    const parse = (exp) => {
        const q = [];
        const oper = new Set();
        
        let num = '';
        for (let i = 0; i < exp.length; i++) {
            const char = exp.charAt(i);
            
            if (char === '*') {
                q.push(Number(num));
                num = '';
                q.push('*');
                oper.add('*');
            } else if (char === '+') {
                q.push(Number(num));
                num = '';
                q.push('+');
                oper.add('+');
            } else if (char === '-') {
                q.push(Number(num));
                num = '';
                q.push('-');
                oper.add('-');
            } else {
                num += char;
            }
        }
        
        q.push(Number(num));
        
        return [q, oper];
    }
    
    const [q, oper] = parse(expression);
    
    dfs([...oper], [], oper.size);
    
    const cal = (opers, q) => {
        let temp = [];
        
        for (const oper of opers) {
            while (q.length) {
                const item = q.shift();
                
                if (item === oper) {
                    const num = temp.pop();
                    const next = q.shift();
                    if (oper === '*') {
                        temp.push(num * next);
                    } else if (oper === '+') {
                        temp.push(num + next);
                    } else if (oper === '-') {
                        temp.push(num - next);
                    }
                } else {
                    temp.push(item);
                }
            }
            q = [...temp];
            temp = [];
        }
        
        return q[0];
    }
    
    let ans = 0;
    for (const o of opers) {
        const res = Math.abs(cal(o, [...q]));
        ans = Math.max(res, ans);
    }
    
    return ans;
}