// 문제요약: 팀에서 한명 씩 뽑을 때, 매출액이 최소가 되는 경우의 금액 구하기
// 입력: 
//  sales: 인덱스 기준 매출액, 2<=sales<=300000
//  links: [팀장-팀원], links < sales.length - 1
// 알고리즘 선택: 
//  팀에서 팀장은 어떤 팀의 팀원일 수 있음
//  따라서 팀장을 고르면 두 팀의 조건을 한번에 만족할 수 있음
//  하지만 팀장의 매출액이 압도적으로 크다면, 두 팀에서 매출액이 낮은 직원 두 명을 뽑는 게 이득일 것임
//  그렇다면, 두 가지 경우를 생각해볼 수 있다
//      팀장이 포함된 경우
//      팀장이 포함되지 않은 경우
//  A팀을 기준으로 본다면, 팀장이 포함될 경우엔 나머지 팀원들이 포함되던 안되던 상관없음
//  이때 A팀의 9번 팀원은 B팀의 팀장임. 따라서 B팀이 조건을 만족하려면 9번이 포함되던가 안되던가 해야 됨
//  따라서 B팀에서 팀장 포함 여부를 고려해서 어떤 값이 더 작은지 구하고, 그 값을 A팀에서 사용할 수 있음
//  B팀에서 구한 답은 최적해이고, 그 값을 재사용하므로 dp로 풀 수 있다
//  점화식:
//      dp[1][1]: A팀에서 팀장을 포함 => 팀원들 포함여부는 상관없음
//          = sales[1] + min(dp[9][0], dp[9][1]) + min(dp[5][0], dp[5][1]) + min(dp[3][0], dp[3][1])
//      dp[1][0]: A팀에서 팀장을 포함하지 않음 => 팀원들 중 한명은 반드시 포함해야 함
//          = dp[9][1] + min(dp[5][0], dp[5][1]) + min(dp[3][0], dp[3][1])
//          = min(dp[9][0], dp[9][1]) + dp[5][1] + min(dp[3][0], dp[3][1])
//          = min(dp[9][0], dp[9][1]) + min(dp[5][0], dp[5][1]) + dp[3][1]

function solution(sales, links) {
    var answer = 0;
    
    const dp = Array.from({length: sales.length + 1}, () => [0, 0]);
    let tree = sales.reduce((tree, n, i) => {
        tree[i + 1] = {
            num: sales[i],
            emp: [],
        };
        dp[i + 1][1] = n;
        return tree;
    }, {});
    
    tree = links.reduce((tree, link) => {
        const [s, e] = link;
        tree[s].emp.push(e);
        return tree;
    }, tree);

    const calDP = (node) => {
        
        for (const em of tree[node].emp) {
            if (tree[em].emp.length > 0) calDP(em);
        }
        
        let grouped = false;
        dp[node][0] = tree[node].emp.reduce((acc, node) => {
            if (dp[node][0] < dp[node][1]) return acc + dp[node][0];
            else {
                grouped = true;
                return acc + dp[node][1];
            }
        }, 0);

        dp[node][1] = dp[node][0] + sales[node - 1];
        
        if (!grouped) {
            let v = Infinity;
            for (const em of tree[node].emp) {
                v = Math.min(v, dp[em][1] - dp[em][0]);
            }
            dp[node][0] += v;
        }
    }
    
    calDP(1);
    
    return Math.min(dp[1][0], dp[1][1]);
}