function solution(ingredient) {
    var answer = 0;
    
    const h = [];
    for (let i = 0; i < ingredient.length; i++) {
        const igd = ingredient[i];
        
        switch(igd) {
            case 1: {
                h.push(1);
                let flag = true;
                if (h.length >= 4) {
                    const o = [1, 3, 2, 1];
                    for (let j = 0; j < 4; j++) {
                        if (o[j] !== h[h.length - j - 1]) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        for (let j = 0; j < 4; j++) {
                            h.pop();
                        }
                        answer++;   
                    }
                }
                break;
            }
            default: {
                h.push(igd);
                break;
            }
        }
    }
    
    return answer;
}