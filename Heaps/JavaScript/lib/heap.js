// Please note that we are using a modified heapify_up/down to allow us 
// to call these methods on non-MinHeap instances

class MinHeap {
    constructor(comparatorFunction) {
        // Array representation of the heap.
        const defaultComparator = function(val1, val2) {
            if (val1 === val2) return 0;

            return (val1 < val2 ? -1 : 1);
        };
        this.store = [];
        this.compare = comparatorFunction ? comparatorFunction : defaultComparator;
        
    }

    getChildrenIndices(parentIndex, length) {
        const children = [];
        const leftChild = (2 * parentIndex) + 1;
        const rightChild = (2 * parentIndex) + 2;
        if (length > leftChild) children.push(leftChild);
        if (length > rightChild) children.push(rightChild);
        return children;
    }

    getParentIndex(childIndex) {
        let index = Math.floor((childIndex - 1) / 2);
        if (index < 0) return null;
        return index;
    }

    // hasParent(childIndex) {
    //     return this.getParentIndex(childIndex) >= 0;
    // }

    swap(array, indexOne, indexTwo) {
        const temp = array[indexTwo];
        array[indexTwo] = array[indexOne];
        array[indexOne] = temp;
    }

    peek() {
        if (this.store.length === 0) return null;

        return this.store[0];
    }

    poll() {
        if (this.store.length === 0) {
        return null;
        }

        if (this.store.length === 1) {
        return this.store.pop();
        }

        const item = this.store[0];

        // Move the last element from the end to the head.
        this.store[0] = this.store.pop();
        this.heapifyDown(this.store);

        return item;
    }

    add(item) {
        this.store.push(item);
        this.heapifyUp(this.store, null, this.compare);
        return this;
    }

    extract() {
        this.swap(0, -1);
        const element = this.store.pop();
        this.heapifyDown(this.store, null, this.compare);
        return element;
    }

    // remove(item, customFindingComparator) {
    //     // Find number of items to remove.
    //     const customComparator = customFindingComparator || this.compare;
    //     const numberOfItemsToRemove = this.find(item, customComparator).length;

    //     for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
    //     // We need to find item index to remove each time after removal since
    //     // indices are being change after each heapify process.
    //     const indexToRemove = this.find(item, customComparator).pop();

    //     // If we need to remove last child in the heap then just remove it.
    //     // There is no need to heapify the heap afterwards.
    //     if (indexToRemove === (this.store.length - 1)) {
    //         this.store.pop();
    //     } else {
    //         // Move last element in heap to the vacant (removed) position.
    //         this.store[indexToRemove] = this.store.pop();

    //         // Get parent.
    //         const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null;
    //         const leftChild = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null;

    //         // If there is no parent or parent is less then node to delete then heapify down.
    //         // Otherwise heapify up.
    //         if (
    //         leftChild !== null
    //         && (
    //             parentItem === null
    //             || this.compare.lessThan(parentItem, this.store[indexToRemove])
    //         )
    //         ) {
    //         this.heapifyDown(indexToRemove);
    //         } else {
    //         this.heapifyUp(indexToRemove);
    //         }
    //     }
    //     }

    //     return this;
    // }

    find(item, customComparator) {
        const foundItemIndices = [];
        const comparator = customComparator || this.compare;

        for (let itemIndex = 0; itemIndex < this.store.length; itemIndex += 1) {
        if (comparator.equal(item, this.store[itemIndex])) {
            foundItemIndices.push(itemIndex);
        }
        }

        return foundItemIndices;
    }

    heapifyUp(array, childIndex, range, compare) {
        // Take last element (last in array or the bottom left in a tree) in
        // a heap container and lift him up until we find the parent element
        // that is less then the current new one.
        const parentIndex = this.getParentIndex(childIndex);

        if (compare(array[parentIndex], array[childIndex] === 1)) {
            this.swap(array, parentIndex, childIndex);
        }
        
        if (parentIndex !== null) this.heapifyUp(array, parentIndex, range, compare);
        return array;
    }

    heapifyDown(array, parentIndex, range, compare) {
        // Compare the root element to its children and swap root with the smallest
        // of children. Do the same for next children after swap.
        parentIndex = parentIndex ? parentIndex : 0;

        const children = this.getChildrenIndices(parentIndex, range);
        let smallestChild = children[0];
        if (children.length > 1 && compare(array[children[0]], array[children[1]]) === 1) smallestChild = children[1];

        if (smallestChild) {
            if (compare(array[parentIndex], array[smallestChild]) === 1) {
                this.swap(array, parentIndex, smallestChild);
            }
            this.heapifyDown(array, smallestChild, range, compare);
        }

        children.forEach(child => this.heapifyDown(array, child, range, compare));
        return array;
    }

    isEmpty() {
        return !this.store.length;
    }

    toString() {
        return this.store.toString();
    }
}

module.exports = MinHeap;