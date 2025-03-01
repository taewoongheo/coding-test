function solution(n, bans) {
    var answer = '';
    
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
            str = String.fromCharCode(97 + (num % 26)) + str;
            num = Math.floor(num / 26);
        }
        return str;
    }
    
    bans.sort((a, b) => strToNum(a) - strToNum(b));
    
    for (const ban of bans) {
        if (n >= strToNum(ban)) n++;
    }
    
    return numToStr(n);
}