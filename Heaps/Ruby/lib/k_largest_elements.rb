require_relative 'heap'

def k_largest_elements(array, k)
    prc = Proc.new do |el1, el2|
        -1 * (el1 <=> el2)
    end

    working_idx = 0
    until working_idx == array.length 

        heap = array[working_idx..-1]
        unless heap.length <= 2
            BinaryMinHeap.heapify_up(heap, heap.length - 1, heap.length, &prc) 
        end
        BinaryMinHeap.heapify_down(heap, 0, heap.length, &prc)

        array[working_idx..-1] = heap
        working_idx += 1
    end

    array[0...k]
end
