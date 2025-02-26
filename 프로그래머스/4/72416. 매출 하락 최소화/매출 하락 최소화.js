// 문제요약: 각 팀에서 한 명 이상 선택, 선택된 사람들의 매출액이 최소화된 경우의 매출액 구하기
// 입력: 
//  sales: 인덱스 기준 직원들의 매출액: 2<=sales<=300000
//  links: [팀장-팀원] 관계: links<=sales.length - 1
//      [팀장-팀원] = [a, b]: 서로 다른 자연수, a,b <= sales.length - 1
//          ceo는 항상 직원번호 1번이므로 b != 1
// 알고리즘 선택: dp
//  각 팀마다 팀장을 포함시키면, 나머지 팀원들은 포함시키던 말던 상관 x
//  각 팀마다 팀장을 포함시키지 않으면, 나머지 팀원들 중 한명은 무조건 포함시켜야 함
//  dp[1][1] = 1번 팀장을 포함시킨 경우
//      = sales[1] + min(dp[9][0], dp[9][1]) + min(dp[5][0], dp[5][1]) + min(dp[3][0], dp[3][1]);
//  dp[1][0] = 1번 팀장을 포함시키지 않은 경우
//      = dp[9][1] + min(dp[5][0], dp[5][1]) + min(dp[3][0], dp[3][1])
//      = min(dp[9][0], dp[9][1]) + dp[5][1] +min(dp[3][0], dp[3][1])
//      = min(dp[9][0], dp[9][1]) + min(dp[5][0], dp[5][1]) + dp[3][1]
//  bottom up
// 부분문제분해:
//  팀장들을 저장
//      {} 객체에 담아 인덱스로 접근하도록. { num, employees }
//  A팀부터 팀원들을 검사, 만약 팀원들 중 팀장이 있다면 재귀
//      팀장의 팀원들을 검사, 만약 팀원들 중 팀장이 없다면
//          dp[팀장][0] = 팀장이 포함되지 않은 경우
//          dp[팀장][1] = 팀장이 포함된 경우
//  시간복잡도: 노드별로 한번씩만 탐색하면 되기 때문에 O(n)

function solution(sales, links) {
    var answer = 0;
    
    const tree = {};
    const dp = Array.from({length: sales.length + 1}, () => [0, 0]);
    for (let i = 0; i < sales.length; i++) {
        tree[i + 1] = { num: sales[i], employees: [] };
        dp[i + 1][1] = sales[i];
    }
    
    for (let i = 0; i < links.length; i++) {
        const [p, c] = links[i];
        tree[p].employees.push(c);
    }
    

    const calDP = (node) => {
        
        for (const employee of tree[node].employees) {
            if (tree[employee].employees.length > 0) calDP(employee);
        }
    
        let checkGroup = false;
        dp[node][0] = tree[node].employees.reduce((acc, employee) => {
            if (dp[employee][0] < dp[employee][1]) return acc + dp[employee][0];
            else {
                checkGroup = true;
                return acc + dp[employee][1];
            }
        }, 0);
        
        dp[node][1] = dp[node][0] + tree[node].num;
        
        if (!checkGroup) {
            let v = Infinity;
            for (const employee of tree[node].employees) {
                v = Math.min(dp[employee][1] - dp[employee][0], v);
            }
            dp[node][0] += v;
        }
    }
    
    calDP(1);
    
    return Math.min(dp[1][0], dp[1][1]);
}