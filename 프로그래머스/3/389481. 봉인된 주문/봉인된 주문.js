// 26진수로 보면 됨

function solution(n, bans) {
    
    const strToNum = (str) => {
        let num = 0; 
        
        for (let i = 0; i < str.length; i++) {
            num = num * 26 + (str.charCodeAt(i) - 96);
        }
        
        return num;
    }
    
    const numToStr = (num) => {
        let str = '';
        
        while (num > 0) {
            num--;
            str = String.fromCharCode(num % 26 + 97) + str;
            num = Math.floor(num / 26);
        }
        
        return str;
    }
    
    bans = bans.sort((a, b) => strToNum(b) - strToNum(a));
    
    while (bans.length) {
        const str = bans.pop();
        if (n >= strToNum(str)) n++;
        else break;
    }
    
    return numToStr(n);
}