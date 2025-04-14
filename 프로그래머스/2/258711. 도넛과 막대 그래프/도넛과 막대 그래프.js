// 문제요약: 트리에서 정점 하나를 택한 뒤, 그 정점에서 뻗어나가는 도넛, 막대, 8자 그래프 개수 구하기
// 알고리즘 선택: 

function solution(edges) {
    var answer = [0, 0, 0, 0];
    
    const tree = edges.reduce((tree, link, i) => {
        const [s, e] = link;
        if (!tree.get(s)) tree.set(s, []);
        if (!tree.get(e)) tree.set(e, []);
        tree.get(s).push(e);
        return tree;
    }, new Map());
        
    const v = new Set();
    for (const node of tree) {
        for (const child of tree.get(node[0])) {
            v.add(child);
        }
    }
    
    let roots = [];
    for (const node of tree) {
        if (!v.has(node[0]) && tree.get(node[0]).length > 0) roots.push(node[0]);
    }
    
    let root = roots[0];
    for (let i = 1; i < roots.length; i++) {
        const n1 = tree.get(root);
        const n2 = tree.get(roots[i]);
        if (n1.length < n2.length) {
            root = roots[i];
        }
    }
    
    answer[0] = root;
    for (const child of tree.get(root)) {
        const result = [0, 0];
        dfs(child, new Set([child]), result);
        if (result[0] - result[1] === 0) answer[1]++;
        else if (result[0] > result[1]) answer[2]++;
        else answer[3]++;
    }
    
    function dfs(root, v, result) {
        const stack = [root];
        
        while (stack.length) {
            const node = stack.pop();
            result[0]++;
            
            for (const child of tree.get(node)) {
                result[1]++;
                if (!v.has(child)) {
                    v.add(child);
                    stack.push(child);
                }
            }
        }
    }
    
    return answer;
}