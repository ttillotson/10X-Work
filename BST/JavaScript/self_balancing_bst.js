const BSTNode = require('./bst_node');


class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value, parent) {
        const black = "black";
        const red = "red";

        // First insert is assigned to root
        if (!this.root) {
            this.root = new BSTNode(value);
            this.root.parent = null;
            this.root.color = black;
            return this.root;
        }

        if (!parent) parent = this.root;

        let node;

        if (value <= parent.value) {
            // Our Value is Smaller than the Parent
            if (parent.left) {
                this.insert(value, parent.left);
            } else {
                node = new BSTNode(value);
                parent.left = node;
                node.parent = parent;
                node.color = red;
                this.balanceSubtree(node);
            }
        } else {
            // Our Value is Greater than the Parent
            if (parent.right) {
                this.insert(value, parent.right);
            } else {
                node = new BSTNode(value);
                parent.right = node;
                node.parent = parent;
                node.color = red;
                this.balanceSubtree(node);
            }
        }
    }

    balanceSubtree(zNode) {
        const black = "black";
        const red = "red";
        let parent;

        if (zNode.uncle.color === red) {
            if (zNode.grandparent !== this.root) {
                zNode.grandparent.color = red;
            }
            zNode.parent.color = black;
            zNode.uncle.color = black;
        } else if (zNode.uncle.color === black) {
            let grandparent = zNode.grandparent;
            parent = zNode.parent;

            // Triangle
            if ((zNode.value <= parent.value && parent.value > grandparent.value) ||
                (zNode.value > parent.value && parent.value <= grandparent.value)) {
                // Swap Pointers for parental hierarchy
                zNode.parent = grandparent;
                parent.parent = zNode;

                // Assign former parent to be z's child
                if (zNode.value > parent.value) zNode.left = parent;
                if (zNode.value <= parent.value) zNode.right = parent;
            // Line
            } else {
                // Account for change of root
                if (grandparent === this.root) this.root = parent;
                let cousin = (parent.value <= zNode.value ? parent.left : parent.right);
                
                // # Move Parent up
                parent.parent = grandparent.parent;
                grandparent.parent = parent;
                parent.color = black;
                grandparent.color = red;
                cousin.parent = grandparent;
                // # Move Grandparent Down
                if (parent.value > grandparent.value) {

                    parent.left = grandparent;
                    parent.right = zNode;
                    grandparent.right = cousin;
                } else {

                    parent.right = grandparent ;
                    parent.left = zNode;
                    grandparent.left = cousin; 
                }
            }
        }
        if (parent) this.balanceSubtree(parent);
    }

    find(value, treeNode) {
        if (!treeNode) treeNode = this.root;
        // We've found our Node
        if (value === treeNode.value) return treeNode;

        if (value < treeNode.value) {
            // Search the left subtree
            if (treeNode.left) {
                // We continue our search recursively
                return this.find(value, treeNode.left);
            } else {
                // Return nothing if there's nothing left to check
                return null;
            }
        }

        if (value > treeNode.value) {
            // Search the left subtree
            if (treeNode.right) {
                // We continue our search recursively
                return this.find(value, treeNode.right);
            } else {
                // Return nothing if there's nothing right to check
                return null;
            }
        }

        // // This can be alternatively written...
        // if (value < treeNode.value && !treeNode.left) return null; 
        // if (value > treeNode.value && !treeNode.right) return null; 
        
        // // # Recursive Step
        // if (value < treeNode.value) return find(value, treeNode.left);
        // if (value > treeNode.value) return find(value, treeNode.right);    
    }

    delete(value) {
        let node = this.find(value);
        if (!node) return null;

        let replacementNode;
        
        // If the node has 2 children
        if (node.left && node.right) {
            // Find largest node in left tree
            replacementNode = this._maximum(node.left);

            // Transition Replacement Out
            this._reassignParent(replacementNode, replacementNode.left);

            // Transition Replacement into Deleted's Spot
            this._reassignChildren(node, replacementNode);

            // Inform Parent of it's new child
            this._reassignParent(node, replacementNode);

            if (this.root === node) this.root = replacementNode;

            // If the node has atleast 1 child
        } else if (node.left || node.right) {
            replacementNode = node.left ? node.left : node.right;

            this._reassignParent(node, replacementNode);

            if (this.root === node) this.root = replacementNode;
        } else {
            if (node.parent) {
                this._reassignParent(node);
            } else {
                this.root = null;
            } 

            // node.parent ? this._reassignParent(node) : this.root = null;
        }
        this.balanceSubtree(node.parent);
    }

    depth(treeNode) {
        if (treeNode === undefined) treeNode = this.root;
        if (treeNode === null || (!treeNode.right && !treeNode.left)) return 0;

        let left = 1;
        let right = 1;

        if (treeNode.left) left += this.depth(treeNode.left);
        if (treeNode.right) right += this.depth(treeNode.right);

        if (left >= right) {
          return left;
        } else {
          return right;
        }
    }

    isBalanced(treeNode) {
        if (treeNode === undefined) treeNode = this.root;

        if (!treeNode || (!treeNode.right && !treeNode.left)) return true;
        if (Math.abs(this.depth(treeNode.left) - this.depth(treeNode.right)) > 1) {
            return false;
        }

        return this.isBalanced(treeNode.left) && this.isBalanced(treeNode.right);
    }

    inOrderTraversal(treeNode, arr) {
        if (!treeNode) treeNode = this.root;
        if (!arr) arr = [];

        let smallest;

        while (this.root) {
            smallest = this._minimum(this.root);
            arr.push(smallest.value);
            this.delete(smallest.value);
        }
        return arr;
    }

    // private

    _reassignChildren(oldNode, replacementNode) {
        replacementNode.left = oldNode.left;
        if (replacementNode.left) replacementNode.left.parent = replacementNode;
        
        replacementNode.right = oldNode.right;
        if (replacementNode.right) replacementNode.right.parent = replacementNode;
    }

    _reassignParent(oldNode, newNode) {
        if (!newNode) newNode = null;
        
        if (newNode) newNode.parent = oldNode.parent;
        if (oldNode.parent){
            if (oldNode.parent.value > oldNode.value) oldNode.parent.left = newNode;
            if (oldNode.parent.value <= oldNode.value) oldNode.parent.right = newNode;
        }
    }

    _maximum(treeNode) {
        if (!treeNode) treeNode = this.root;

        // Edge-case: Root is null
        if (!treeNode) return null;

        if (treeNode.right) {
            return this._maximum(treeNode.right);
        } else {
            return treeNode;
        }

        // Alternatively
        // return treeNode.right ? this._maximum(treeNode.right) : treeNode;
    }

    _minimum(treeNode) {
        if (!treeNode) treeNode = this.root;

        // Edge-case: Root is null
        if (!treeNode) return null;

        if (treeNode.left) {
            return this._minimum(treeNode.left);
        } else {
            return treeNode;
        }

        // Alternatively
        // return treeNode.left ? this._minimum(treeNode.left) : treeNode;
    }
}
