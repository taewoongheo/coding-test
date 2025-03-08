// 문제요약: 행렬의 최소 곱셈 횟수를 구하기
// 알고리즘 선택: 
//  행렬을 곱하는 '순서'에 따라 달라짐
//  만약 A~D까지 행렬을 곱한다고 해보자
//      (((AB)C)D), ((AB)(CD)), ... 
//      결과를 보면 AB를 곱하는 횟수가 중복된다. 즉, 상태까지 도달하는데 있어 여러 방법들은 반드시 중복이 존재한다
//  또한 각 행렬들을 곱하는 순서는 서로 독립적임. 결정문제이기도 함(예/아니오=행렬을 곱할건지 아닌지)
//  따라서 dp로 풀 수 있다
//  점화식
//      행렬의 특성상 인접한 행렬들끼리만 곱할 수 있음
//      만약 A~C까지 행렬을 곱한다고 했을 때, 그 안에서는 여러 번의 중복이 발생함
//      이 결과는 A~D에서도 재사용할 수 있다. 
//      따라서 고려해야 하는 상태는 '몇 개의 행렬을 곱했는가'
//      이를 바탕으로 점화식을 세워보면,
//          만약 A~E행렬곱 중, 범위2를 기준으로 C에서 끊는다고 가정
//          A~C까지의 행렬곱 수 + D~E까지의 행렬 곱 수가 될 것임
//          dp[A][C] + dp[D][E] + (c와 d의 행렬곱 수)
//          이걸 범위마다 반복하면 됨. 즉, 행렬 곱의 범위를 늘려가면서 계산하면 최종 A~E는 하나의 답이 도출될 것임
// 부분문제 분해: 
//  dp[행렬 수][행렬 수]
//  for 2~행렬 수-1 반복:
//      for 첫번째 행렬부터 마지막-1번째 행렬까지
//          범위를 체크하고 가능할 경우
//          dp[시작행렬][중간행렬] + dp[중간행렬 + 1][마지막행렬] + ~

function solution(matrix_sizes) {
    var answer = 0;
    
    const n = matrix_sizes.length;
    const dp = Array.from({length: n}, () => 
                         Array.from({length: n}, () => Infinity));
    for (let i = 0; i < n; i++) {
        dp[i][i] = 0;
    }
    
    for (let size = 1; size < n; size++) {
        for (let start = 0; start < n - 1; start++) {

            const end = start + size;
            if (end >= n) continue;
            
            for (let fixed = start; fixed < end; fixed++) {
                dp[start][end] = Math.min(
                    dp[start][fixed] + dp[fixed + 1][end] + (
                        matrix_sizes[start][0] * matrix_sizes[fixed][1] * matrix_sizes[end][1]
                    ),
                    dp[start][end]
                )
            }
        }
    }
    
    return dp[0][n - 1];
}