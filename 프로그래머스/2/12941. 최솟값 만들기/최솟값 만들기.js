function solution(A,B){

    A = A.sort((a, b) => a - b);
    B = B.sort((a, b) => b - a);
    
    return A.reduce((acc, cur, idx) => {
        acc += A[idx] * B[idx];
        return acc;
    }, 0);
}