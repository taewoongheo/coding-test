class Node {
    constructor(num, x, y) {
        this.num = num;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }
}

function solution(nodeinfo) {

    const nodes = nodeinfo.map((v, i) => [i + 1, ...v]);
    nodes.sort(([num1, x1, y1], [num2, x2, y2]) => y2 - y1);
    
    const makeTree = (parent, num, x, y) => {
        const side = parent.x > x ? 'left' : 'right';
        
        if (parent[side]) {
            makeTree(parent[side], num, x, y);
        } else {
            parent[side] = new Node(num, x, y);
        }
    }
    
    const root = new Node(...nodes.shift());
    for (let i = 0; i < nodes.length; i++) {
        makeTree(root, nodes[i][0], nodes[i][1], nodes[i][2]);
    }
    
    const pre = [];
    const post = [];
    
    const preorder = (root) => {
        pre.push(root.num);
        if (root.left) preorder(root.left);
        if (root.right) preorder(root.right);
    }
    const postorder = (root) => {
        if (root.left) postorder(root.left);
        if (root.right) postorder(root.right);
        post.push(root.num);
    }
    
    preorder(root);
    postorder(root);
    
    return [pre, post];
}