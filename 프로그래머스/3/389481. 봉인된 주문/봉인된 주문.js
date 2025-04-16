function solution(n, bans) {
    
    function strToNum(str) {
        let num = 0;
        
        for (let i = 0; i < str.length; i++) {
            num = num * 26 + (str.charCodeAt(i) - 96);
        }
        
        return num;
    }
    
    function numToStr(num) {
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
        if (strToNum(bans.pop()) <= n) n++;
        else break;
    }
    
    return numToStr(n);
}