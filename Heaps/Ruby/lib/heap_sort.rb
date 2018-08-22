require_relative "heap"

class Array
  def heap_sort!
    # Create Max Heap
    # Extract, push repeat, working with a smaller array each time
    prc = Proc.new do |el1, el2|
      el1 <=> el2
    end



    # With a valid heap
    working_idx = 0
    until working_idx == self.length

      heap = self[working_idx..-1]
      unless heap.length <= 2
        BinaryMinHeap.heapify_up(heap, heap.length - 1, heap.length, &prc) 
      end
      BinaryMinHeap.heapify_down(heap, 0, heap.length, &prc)

      self[working_idx..-1] = heap
      working_idx += 1
    end

    self
  end
end

