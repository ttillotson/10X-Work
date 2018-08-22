class BSTNode {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
        this.parent = null;
        this.color = null;
    }

    grandparent() {
        return this.parent.parent;
    }

    uncle() {
        if (this.value >= this.parent.value) {
            return this.grandparent.left;
        } else {
            return this.grandparent.right;
        }
    }
}

export default BSTNode;