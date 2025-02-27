// 문제요약: 각 팀마다 한 명씩 뽑을 때, 최소가 되는 매출액 구하기
// 입력: 
//  salse: 인덱스 기준 직원들의 매출액: 2<=sales<=300000
//  links: [팀장-팀원]: links<=sales.length-1
// 알고리즘 선택: 
//  팀마다 한명씩 최소가 되도록 골라야 한다
//  만약 팀장이 팀원에도 속해있다면, 두 팀에 동시에 속해있기 때문에 한번에 조건을 만족할 수 있다
//      하지만 팀장=10000, 팀원1=1, 팀원2=1 이라면, 팀원 두 명을 선택하는게 더 유리하다
//  따라서 한 팀에 팀장이 포함된 경우와 포함되지 않았을 경우로 나눠 고려한다
//  D에서부터 팀원을 고른다고 가정해보자
//  팀장을 포함하거나, 포함하지 않을 경우 매출액은 최적해다. 또한 이를 재사용하여 팀 C에서 사용해야 하기 때문에 dp
//  dp[1][1]: 팀장을 포함하는 경우 => 조건을 바로 만족하므로, 팀원 포함여부는 상관없다
//  dp[1][0]: 팀장을 포함하지 않으면, 팀원 중 한명이라도 반드시 포함해야 한다
//      = dp[9][1] + min(dp[5][0], dp[5][1]) + min(dp[3][0], dp[3][1])
//      = min(dp[9][0], dp[9][1]) + dp[5][1] + min(dp[3][0], dp[3][1])
//      = min(dp[9][0], dp[9][1]) + min(dp[5][0], dp[5][1]) + dp[3][1]

function solution(sales, links) {

    const dp = Array.from({length: sales.length + 1}, () => [0, 0]);
    let tree = sales.reduce((tree, el, i) => {
        dp[i + 1][1] = el;
        tree[i + 1] = {
            num: el,
            emp: []
        };
        return tree;
    }, {});
    
    tree = links.reduce((tree, link) => {
        const [s, e] = link;
        tree[s].emp.push(e);
        return tree;
    }, tree);
    
    console.log(dp);
    const calDP = (node) => {
        
        for (const em of tree[node].emp) {
            if (tree[em].emp.length > 0) calDP(em);
        }
        
        let grouped = false;
        dp[node][0] = tree[node].emp.reduce((acc, em) => {
            if (dp[em][0] < dp[em][1]) return acc += dp[em][0];
            else {
                grouped = true;
                return acc += dp[em][1];
            }
        }, 0);
        
        dp[node][1] = dp[node][0] + tree[node].num
        
        if (!grouped) {
            let v = Infinity;
            for (const em of tree[node].emp) {
                const diff = dp[em][1] - dp[em][0];
                v = Math.min(v, diff);
            }
            dp[node][0] += v;
        }
    }
    
    calDP(1);
    console.log(dp);
    
    return Math.min(dp[1][0], dp[1][1]);
}