function solution(arrayA, arrayB) {
    const gcd = (num1, num2) => {
        if (num1 % num2 === 0) return num2;
        return gcd(num2, num1 % num2);
    }
    
    let gcd1 = arrayA.length === 1 ? arrayA[0] : gcd(arrayA[0], arrayA[1]);
    for (let i = 2; i < arrayA.length; i++) {
        gcd1 = gcd(gcd1, arrayA[i]);
    }
    
    let gcd2 = arrayB.length === 1 ? arrayB[0] : gcd(arrayB[0], arrayB[1]);
    for (let i = 2; i < arrayB.length; i++) {
        gcd2 = gcd(gcd2, arrayB[i]);
    }
    
    let flag1 = true;
    for (const num of arrayB) {
        if (num % gcd1 === 0) {
            flag1 = false;
            break;
        }
    }
    
    let flag2 = true;
        for (const num of arrayA) {
        if (num % gcd2 === 0) {
            flag2 = false;
            break;
        }
    }
    
    if (flag1 && flag2) {
        return Math.max(gcd1, gcd2);
    } 
    if (flag1 && !flag2) {
        return gcd1;
    }
    if (!flag1 && flag2) {
        return gcd2;
    }
    if (!flag1 && !flag2) {
        return 0;
    }
}