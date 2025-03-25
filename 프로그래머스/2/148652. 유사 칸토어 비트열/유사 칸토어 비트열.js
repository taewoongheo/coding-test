// 현재 위치가 어디서 왔는지 거슬러 올라가면 된다. 
// 하나 당 x5개씩 늘어나니까, 5로 나눈 몫이 근원지가 됨
// 이때 11011 이므로, 2번째면 false

function solution(n, l, r) {
    var answer = 0;
    
    function check(num) {
        if (num < 5 && num !== 2) return true;
        if ((num - 2) % 5 === 0) return false;
       
        return check(Math.floor(num / 5));
    }
    
    for (let i = l - 1; i <= r - 1; i++) {
        if (check(i)) answer++;
    }
    
    return answer;
}