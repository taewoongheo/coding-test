// 문제: 특정 상자를 꺼내야할 때 위에서부터 꺼내야 하는 총 상자의 개수
// 짝수 칸은 왼->오, 홀수칸은 오->왼
// num의 높이와 맨 위의 높이를 알 수 있음
// 현재 num의 열에서 맨 윗 칸에 상자가 있는지 없는지 검사하면 됨
// 둘 다 같은 방향인 경우 반대 방향인 경우 나눠서 계산

function solution(n, w, num) {
    var answer = 0;
    
    const th = Math.ceil(n / w);
    const nh = Math.ceil(num / w);
    
    const tr = (n % w) || w;
    const nr = (num % w) || w;
    
    if (th % 2 === nh % 2 && tr >= nr) answer++;
    if (th % 2 !== nh % 2 && w - nr < tr) answer++;
    
    return th - nh + answer;
}