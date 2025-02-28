// 문제요약: 삼각형의 꼭대기에서 아래로 내려갈 때 가장 큰 숫자 구하기
// 입력: 
//  triangle: 삼각형 정보 2차원 배열, 1<=triangle.length<=500
// 알고리즘 선택: 
//  가장 위에서부터 dp로 내려오면 된다


function solution(triangle) {
    var answer = 0;
    
    const dp = Array.from({length: triangle.length}, () => 
                         Array.from({length: triangle.length}, () => 0));
    dp[0][0] = triangle[0][0];
    
    for (let i = 0; i < triangle.length - 1; i++) {
        for (let j = 0; j <= i; j++) {
            const item = dp[i][j];
            dp[i + 1][j] = Math.max(dp[i + 1][j], triangle[i + 1][j] + item);
            dp[i + 1][j + 1] = triangle[i + 1][j + 1] + item;
        }
    }
    
    return Math.max(...dp[triangle.length - 1]);
}