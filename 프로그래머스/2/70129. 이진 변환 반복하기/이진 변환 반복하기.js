function solution(s) {
    var answer = [0, 0];
    
    const numToBin = (len, cnt) => {
        s = '';
        let num = len - cnt;
        
        while (num !== 0) {
            s = (num % 2).toString() + s;
            num = Math.floor(num / 2);
        }
        
        return s;
    }
    
    while (s !== '1') {
        let len = s.length;
        let cnt = 0;
        for (let i = 0; i < len; i++) {
            if (s[i] === '0') cnt++;
        }
        
        s = numToBin(len, cnt);
        
        answer[0]++;
        answer[1] += cnt;
    }
    
    return answer;
}