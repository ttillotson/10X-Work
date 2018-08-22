const BinarySearchTree = require('./binary_search_tree.js');

function kthLargest(treeNode, k) {
    let arr = [];

    let largest;
    while (arr.length !== k) {
        largest = BinarySearchTree.prototype._maximum(treeNode);
        arr.push(largest);

        if (!largest.parent) {
            treeNode = treeNode.left;
            treeNode.parent = null;
        } else {
            largest.parent.right = null;
        }
    }
    return arr[k - 1];
}

