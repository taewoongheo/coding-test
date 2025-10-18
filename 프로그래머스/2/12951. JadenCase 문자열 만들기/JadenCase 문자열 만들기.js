function solution(s) {
    var answer = [];
    
    const arr = s.split(' ');
    
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        let nStr = '';
        for (let j = 0; j < str.length; j++) {
            const char = str[j];
            const ascii = char.charCodeAt();
            if (j === 0 && ascii >= 97 && ascii <= 122) {
                nStr += String.fromCharCode(ascii - 32);
                continue;
            }        
            
            if (j !== 0 && ascii >= 65 && ascii <= 90) {
                nStr += String.fromCharCode(ascii + 32);
                continue;
            }
            
            nStr += char.trim();
        }

        answer.push(nStr);
    }
    
    return answer.join(' ');
}