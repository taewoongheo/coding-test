class Status {
    constructor(info, treeinfo, visited, sheep, wolf) {
        this.info = info;
        this.treeinfo = treeinfo;
        this.visited = visited;
        this.sheep = sheep;
        this.wolf = wolf;
    }
    
    visitable() {
        const res = [];
        
        this.visited.forEach(v => {
            for (const node of this.treeinfo.get(v)) {
                if (!this.visited.has(node)) {
                    res.push(node);
                }
            }
        })
        
        return res;
    }
    
    visit(node) {
        const copyVisited = new Set(this.visited);
        copyVisited.add(node);
        const newSheep = this.sheep + (this.info[node] === 0 ? 1 : 0);
        const newWolf = this.wolf + (this.info[node] === 1 ? 1 : 0);
        return new Status(this.info, this.treeinfo, copyVisited, newSheep, newWolf);
    }
}

function dfs(status) {
    const visitable = status.visitable();
    let sheepValue = status.sheep;
    
    visitable.forEach(v => {
        const newStatus = status.visit(v);
        let newStatusValue = 0;
        
        if (newStatus.sheep > newStatus.wolf) newStatusValue = dfs(newStatus);
        
        sheepValue = Math.max(sheepValue, newStatusValue);
    })
    
    return sheepValue;
}

function solution(info, edges) {
    var answer = 0;
    
    const treeinfo = new Map();
    for (let i = 0; i < edges.length; i++) {
        const [s, e] = edges[i];
        if (!treeinfo.has(s)) treeinfo.set(s, []);
        if (!treeinfo.has(e)) treeinfo.set(e, []);
        treeinfo.get(s).push(e);
        treeinfo.get(e).push(s);
    }
    
    answer = dfs(new Status(info, treeinfo, new Set([0]), 1, 0));
    
    return answer;
}