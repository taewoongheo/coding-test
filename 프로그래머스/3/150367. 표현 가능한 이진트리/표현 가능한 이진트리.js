function solution(numbers) {
    var answer = [];
    
    for (const num of numbers) {
        
        let bi = num.toString(2);
        const n = bi.length;
        const h = Math.ceil(Math.log2(n + 1));
        // 해당 깊이의 포화이진트리 총 노드 수 
        const totalNodes = Math.pow(2, h) - 1;
    
        // 필요한 0의 개수 계산
        let biTree = "0".repeat(totalNodes - n);
        
        biTree = biTree + '' + bi;
        if (checkBTree(biTree, 0, biTree.length - 1)) {
            answer.push(1);
        } else {
            answer.push(0);
        }
    }
    
    function checkBTree(b, s, e) {
        
        const m = Math.floor((s + e) / 2);
        const lChild = Math.floor((s + m - 1) / 2);
        const rChild = Math.floor((m + 1 + e) / 2);
        
        if (s === e) return true;
        
        if (b[m] === '0' && ((b[lChild] === '1') || (b[rChild] === '1'))) return false;
        
        if (!checkBTree(b, s, m - 1)) return false;
        if (!checkBTree(b, m + 1, e)) return false;
        
        return true;
    }
    
    return answer;
}