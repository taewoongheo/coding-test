function solution(n, bans) {
    var answer = '';
    
    const strToNum = (str) => {
        let num = 0; 
        for (let i = 0; i < str.length; i++) {
            num = num * 26 + (str.charCodeAt(i) - 96);
        }
        
        return num;
    }
    
    // 메서드가 생각이 안남. 
    const al = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numToStr = (num) => {
        let str = '';
        while (num > 0) {
            num--;
            str = al[num % 26] + str;
            num = Math.floor(num / 26);
        }
        
        return str;
    }
    
    bans = bans.sort((a, b) => strToNum(a) - strToNum(b));
    for (const ban of bans) {
        if (n >= strToNum(ban)) n++;
    }
    
    return numToStr(n);
}