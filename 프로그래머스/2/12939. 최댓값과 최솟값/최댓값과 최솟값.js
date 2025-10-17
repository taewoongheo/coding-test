function solution(s) {
    const sort = s.split(' ').sort((a, b) => a - b);
    
    return `${sort[0]} ${sort[sort.length - 1]}`;
}