function solution(files) {
    const arr = [];
    
    for (const file of files) {
        let head = '';
        let number = '';
        let headFlag = false;
        let numberFlag = false;
            
        for (let i = 0; i < file.length; i++) {
            const char = file[i];
            
            if (char === ' ' || isNaN(Number(char))) {
                if (headFlag) {
                    numberFlag = true;
                    continue;
                }
                
                head += char;
            } else {
                headFlag = true;
                if (numberFlag) continue;
                if (number.length >= 5) continue;
                
                number += char;

            }
        }
        
        arr.push({file, head: head.toLowerCase(), number: Number(number)});
    }
        
    arr.sort((a, b) => {
        const compare = a.head.localeCompare(b.head);
        if (compare === 0) {
            return a.number - b.number;
        }
        return compare;
    });
    
    return arr.reduce((acc, cur) => {
        acc.push(cur.file);
        return acc;
    }, []);
}