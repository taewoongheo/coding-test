class Node {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.left = null;
        this.right = null;
    }
}

let rootNode;
let preorder = [];
let postorder = [];

function makeTree(x, y, id) {
    if (!rootNode) {
        rootNode = new Node(x, y, id);
        return rootNode;
    } else {
        _makeTree(rootNode, x, y, id);
    }
}

function _makeTree(root, x, y, id) {
    const side = x < root.x ? 'left' : 'right';
    
    if (!root[side]) {
        root[side] = new Node(x, y, id);
    } else {
        _makeTree(root[side], x, y, id);
    }
}

function getPreorder(node) {
    preorder.push(node.id);
    if (node.left) getPreorder(node.left);
    if (node.right) getPreorder(node.right);
}

function getPostorder(node) {
    if (node.left) getPostorder(node.left);
    if (node.right) getPostorder(node.right);
    postorder.push(node.id);
}

function solution(nodeinfo) {

    const nodes = nodeinfo.map(([x,y], idx) => [x, y, idx + 1]);
    nodes.sort(([,y1], [,y2]) => y2 - y1);
    
    nodes.forEach(([x, y, idx]) => makeTree(x, y, idx));
    
    getPreorder(rootNode);
    getPostorder(rootNode);
    
    return [preorder, postorder];
}