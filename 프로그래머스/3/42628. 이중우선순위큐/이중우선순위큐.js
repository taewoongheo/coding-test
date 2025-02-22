function solution(operations) {
    var answer = [];
    
    const insert = (data) => {
        if (answer.length === 0) {
            answer.push(data);
            return;
        }
        
        let idx = 0;
        while (idx < answer.length) {
            if (answer[idx] < data) {
                idx++;
                continue;
            }
            answer.splice(idx, 0, data);
            return;
        }
        answer.push(data);
    }
    
    for (const operation of operations) {
        const [oper, num] = operation.split(' ');
        if (oper === 'I') {
            insert(Number(num));
        } else {
            if (num === '1') {
                answer.pop();
            } else {
                answer.shift();
            }
        }
    }
    if (answer.length === 0) return [0, 0];
    return [answer[answer.length - 1], answer[0]];
}