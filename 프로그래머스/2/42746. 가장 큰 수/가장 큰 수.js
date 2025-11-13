function solution(numbers) {

    numbers.sort((a, b) => {
        const strA = a.toString();
        const strB = b.toString();
        
        if (Number(strA + strB) > Number(strB + strA)) {
            return -1;
        } 
        
        return 1;
    });
    
    const ans = numbers.join('');
    if (ans.replaceAll('0', '').length === 0) return '0';
    
    return ans;
}