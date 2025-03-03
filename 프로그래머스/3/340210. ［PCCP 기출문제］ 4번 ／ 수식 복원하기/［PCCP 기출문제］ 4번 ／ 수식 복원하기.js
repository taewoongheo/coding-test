function solution(expressions) {
    const answer = [];
    
    // 주어진 수를 base 진법에서 10진법으로 변환
    const numToDecimal = (number, base) => {
        const strNum = String(number);
        let num = Number(strNum[0]);
        
        for (let i = 1; i < strNum.length; i++) {
            num = num * base + Number(strNum[i]);
        }
        
        return num;
    }
    
    // 10진법 수를 base 진법으로 변환
    const decimalToNum = (number, base) => {
        if (number === 0) return '0';
        
        let num = '';
        
        while (number > 0) {
            num = (number % base) + num;
            number = Math.floor(number / base);
        }
        
        return num;
    }
    
    // 두 수의 연산 결과를 구함
    const cal = (num1, num2, oper, base) => {
        const nnum1 = numToDecimal(num1, base);
        const nnum2 = numToDecimal(num2, base);
        
        const ans = oper === '+' ? nnum1 + nnum2 : nnum1 - nnum2;
        
        return decimalToNum(ans, base);
    }
    
    // 수식에 포함된 가장 큰 숫자 찾기 (이를 통해 최소 진법 결정)
    let minbase = 2;
    for (const exp of expressions) {
        const parts = exp.split(' ');
        const num1 = parts[0];
        const num2 = parts[2];
        
        // 각 숫자의 자릿수들 중 최대값 찾기
        for (const digit of num1) {
            if (!isNaN(digit)) {
                minbase = Math.max(minbase, Number(digit) + 1);
            }
        }
        
        for (const digit of num2) {
            if (!isNaN(digit)) {
                minbase = Math.max(minbase, Number(digit) + 1);
            }
        }
        
        // 결과값이 X가 아닌 경우도 체크
        if (parts[4] !== 'X') {
            for (const digit of parts[4]) {
                if (!isNaN(digit)) {
                    minbase = Math.max(minbase, Number(digit) + 1);
                }
            }
        }
    }
    
    // 가능한 진법 후보군 (true면 가능, false면 불가능)
    const validBase = Array(10).fill(true);
    validBase.fill(false, 0, minbase); // 최소 진법보다 작은 값들은 제외
    
    // 완전한 수식(결과값이 있는)으로 가능한 진법 찾기
    const incompleteExpressions = [];
    for (const exp of expressions) {
        const [num1, oper, num2, _, ans] = exp.split(' ');
        
        if (ans === 'X') {
            incompleteExpressions.push(exp);
        } else {
            // 각 진법에 대해 검증
            for (let base = minbase; base <= 9; base++) {
                if (!validBase[base]) continue;
                
                const result = cal(num1, num2, oper, base);
                
                if (result !== ans) {
                    validBase[base] = false;
                }
            }
        }
    }
    
    // 불완전한 수식(결과값이 X)에 대해 계산
    for (const exp of incompleteExpressions) {
        const [num1, oper, num2, _, ans] = exp.split(' ');
        let firstValidResult = null;
        let isConsistent = true;
        
        for (let base = minbase; base <= 9; base++) {
            if (!validBase[base]) continue;
            
            const result = cal(num1, num2, oper, base);
            
            if (firstValidResult === null) {
                firstValidResult = result;
            } else if (result !== firstValidResult) {
                isConsistent = false;
                break;
            }
        }
        
        // 모든 가능한 진법에서 결과가 같으면 그 값을 사용, 아니면 ?
        const resultValue = isConsistent && firstValidResult !== null ? firstValidResult : '?';
        answer.push(`${num1} ${oper} ${num2} = ${resultValue}`);
    }
    
    return answer;
}