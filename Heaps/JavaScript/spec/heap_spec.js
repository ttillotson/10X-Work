const Heap = require('./heap.js');

describe('BinaryMinHeap', () => {
    describe('Indexing functions', () => {
        test('calculates child indices correctly', () => {
            expect(Heap.childIndices(6, 0)).toEqual([1, 2]);
            expect(Heap.childIndices(6, 1)).toEqual([3, 4]);
            expect(Heap.childIndices(6, 2)).toEqual([5]);
        });

        test('calculates parent indices correctly', () => {
            expect(Heap.parentIndex(5).toEqual(2));
            expect(Heap.parentIndex(4).toEqual(1));
            expect(Heap.parentIndex(3).toEqual(1));
            expect(Heap.parentIndex(2).toEqual(0));
            expect(Heap.parentIndex(1).toEqual(0));
            expect(Heap.parentIndex(0).toThrow('root has no parent'));
        });
    });

    describe('Heapify Up and Down', () => {
        test('it heapifyUps correctly', () => {
            expect(Heap.heapifyUp([4, 5, 1], 2)).toEqual([1, 5, 4]);
            expect(Heap.heapifyUp([3, 4, 5, 1], 3)).toEqual([1, 3, 5, 4]);
        });

        test('it heapifyDowns correctly', () => {
            expect(Heap.heapifyDown([7, 4, 5], 0)).toEqual([4, 7, 5]);
            expect(Heap.heapifyDown([7, 4, 5, 6, 8], 0)).toEqual([4, 6, 5, 7, 8]);
            expect(Heap.heapifyDown([9, 6, 5, 7, 8], 0)).toEqual([5, 6, 9, 7, 8]);
            expect(Heap.heapifyDown([7, 8, 6, 9, 10, 7, 9], 0)).toEqual([6, 8, 7, 9, 10, 7, 9]);
        });

        test('it heapifyDowns with comparator-function correctly', () => {
            let comparator = (val1, val2) => {
                if (val1 === val2) return 0;
                return val1 > val2 ? -1 : 1;
            };
            expect(Heap.heapifyDown([1, 2, 3], 0, comparator)).toEqual([3, 2, 1]);
            expect(Heap.heapifyDown([1, 5, 4, 3], 0, comparator)).toEqual([5, 4, 3, 1]);
        });

        test('it heapifyUps with comparator-function correctly', () => {
            let comparator = (val1, val2) => {
                if (val1 === val2) return 0;
                return val1 > val2 ? -1 : 1;
            };
            expect(Heap.heapifyUp([2, 1, 3], 2, comparator)).toEqual([3, 1, 2]);
            expect(Heap.heapifyUp([4, 3, 1, 5], 3, comparator)).toEqual([5, 4, 1, 3]);
        });
    });

    describe('Heap Operations', () => {
        let heap = new Heap;
        test('has a store that starts empty', () => {
            expect(heap._store()).toEqual([]);
        });
        
        test('pushes correctly', () => {
            heap.push(7);
            expect(heap._store()).toEqual([7]);

            heap.push(5);
            expect(heap._store()).toEqual([5, 7]);
            
            heap.push(6);
            expect(heap._store()).toEqual([5, 7, 6]);
            
            heap.push(4);
            expect(heap._store()).toEqual([4, 5, 6, 7]);
        });

        test('extracts correctly', () => {
            [7, 5, 6, 4].forEach(el => heap.push(el));

            expect(heap.extract()).toEqual(4);
            expect(heap._store()).toEqual([5, 7, 6]);

            expect(heap.extract()).toEqual(5);
            expect(heap._store()).toEqual([6, 7]);
        });
    });
});