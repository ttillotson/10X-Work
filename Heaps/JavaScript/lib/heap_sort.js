const MinHeap = require('./min_heap.js');

Array.prototype.heapSort = function (comparator) {
    const defaultComparator = function (val1, val2) {
        if (val1 === val2) return 0;
        return val1 > val2 ? 1 : -1;  
    };
    comparator = comparator ? comparator : defaultComparator;

    let currentIndex = 0;
    // Adjust this
    while (currentIndex !== this.length ) {
        // declare heap 
        // if ()
        // let heap = this[currentIndex..-1];
        let range = this.length - currentIndex;
        if (range > 1) MinHeap.prototype.heapifyUp(this, currentIndex, range, comparator);
        MinHeap.prototype.heapifyDown(this, 0, range, comparator);
        currentIndex += 1;
    }
    return this;
};