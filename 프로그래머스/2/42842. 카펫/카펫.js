// brown 의 가로 길이는 최소 3
// 3*2=6, 4*2=8, 5*2=10, ...
// 가로 크기를 하나씩 늘려가면서 세로크기와 곱셈, 노란색 영역의 개수와 일치하면 true

function solution(brown, yellow) {
    let answer = [];
    
    for (let i = ((brown - 2)) / 2; i >= 3; i--) {
        // 세로 최소 크기 1
        const width = i;
        const height = (brown - (width * 2)) / 2;
        console.log()
        if ((width - 2) * height === yellow) {
            answer = [width, height + 2];
            break;
        }
    }
    
    return answer;
}