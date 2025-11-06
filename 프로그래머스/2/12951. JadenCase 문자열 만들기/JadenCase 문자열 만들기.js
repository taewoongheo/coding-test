function solution(s) {
    return s.split(' ').reduce((arr, str) => {
        let temp = str.charAt(0).toUpperCase();
        temp += str.slice(1).toLowerCase();
        arr.push(temp);
        return arr;
    }, []).join(' ');
}