const heapSort = require('./heap_sort.js');

describe("HeapSort", () => {
    test('sorts an unsorted array', () => {
        let arr = [4, 2, 1, 3, 5, 7, 8, 9];
        let sorted = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        expect(heapSort(arr)).toEqual(sorted);
    });
    
    test('sorts a reversed array', () => {
        let arr = [5, 4, 3, 2, 1];
        let sorted = [1, 2, 3, 4, 5];
        expect(heapSort(arr)).toEqual(sorted);
    });

    test('sorts a reversed array', () => {
        let arr = [1, 2, 3, 4, 5];
        expect(heapSort(arr)).toEqual([1, 2, 3, 4, 5]);
    });
});