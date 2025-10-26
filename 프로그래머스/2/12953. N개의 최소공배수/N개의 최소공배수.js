function solution(arr) {
    
    const gcm = (a, b) => {
        if (!b) {
            return a;
        }
        
        return gcm(b, a % b);
    }
    
    const lcm = (a, b) => {
        return (a * b) / gcm(a, b);
    }
    
    return arr.reduce((a, b) => 
        lcm(a, b)
    )
}