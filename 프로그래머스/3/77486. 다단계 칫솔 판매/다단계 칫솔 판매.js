function solution(enroll, referral, seller, amount) {
    const tree = {};
    
    for (let i = 0; i < enroll.length; i++) {
        const e = enroll[i];
        const r = referral[i];
        
        tree[e] = {
            p: r,
            r: 0,
        };
    }
    
    const calculate = (r) => {
        const cr = r;
        const pcr = Math.floor(cr * 0.1);
        
        if (pcr < 1) return { 
            cCal: r, 
            pCal: 0 
        }

        return {
            cCal: cr - pcr,
            pCal: pcr
        }
    }
    
    for (let i = 0; i < seller.length; i++) {
        const s = seller[i];
        const a = amount[i];
        
        let current = tree[s];
        let total = a * 100;
        
        while (current) {
            // console.log('total: ', total);
            // console.log('tree: ', tree);
            // console.log('current: ', current);
            if (total < 1) {
                break;
            }
            const { cCal, pCal } = calculate(total);
            // console.log(cCal, pCal);
            current.r += cCal;
            
            current = tree[current.p];
            total = pCal;
            // console.log('after tree: ', tree);
        }
        // console.log('===========')
    }
    
    return enroll.map(el => tree[el].r);
}
