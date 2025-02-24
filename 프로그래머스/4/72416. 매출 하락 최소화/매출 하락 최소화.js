function solution(sales, links) {
    const tree = {};
    const dp = {};
    links.map(link => {
        const [leader, member] = link;
        if (tree[leader]) tree[leader].push(member);
        else tree[leader] = [member];
    });
    
    calcDP(tree, sales, dp, 1);
    return Math.min(...dp[1]);
}

const calcDP = (tree, sales, dp, idx) => {
    dp[idx] = [0, 0];
    const children = tree[idx];
    
    children.map(child => {
        if (!dp[child]) {
            if (tree[child]) calcDP(tree, sales, dp, child);
            else dp[child] = [0, sales[child - 1]];
        }
    })
    
    let checkGroup = false;
    dp[idx][0] = children.reduce((acc, child) => {
        // 일단 자식 노드가 연관된 그룹 중 최소인 값들을 우선적으로 선택. 이 조건을 만족하면 자식 노드를 포함하지 않은 하위그룹을 선택
        if (dp[child][0] < dp[child][1]) return acc + dp[child][0];
        // 자식 노드를 포함한 하위 그룹을 선택 => 자식노드는 이미 현재 그룹의 팀원이기도 하기 때문에, 그룹 조건이 만족
        else {
            checkGroup = true;
            return acc + dp[child][1];
        }
    }, 0);
    
    dp[idx][1] = dp[idx][0] + sales[idx - 1];
    
    if (!checkGroup) {
        let minOffset = Number.MAX_VALUE;
        children.map(child => {
            const tempOffset = dp[child][1] - dp[child][0];
            minOffset = Math.min(minOffset, tempOffset);
        })
        dp[idx][0] += minOffset;
    }
}
