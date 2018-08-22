require 'byebug'

class BinaryMinHeap
  attr_reader :store, :prc

  def initialize(&prc)
    @store = []
    @prc = prc
  end

  def count
    @store.length
  end

  def extract
    @store[0], @store[-1] = @store[-1], @store[0]
    el = @store.pop 
    self.class.heapify_down(@store, 0, (count - 1), &@prc)
    el
  end

  def peek
    @store[0]
  end

  def push(val)
    @store << val
    self.class.heapify_up(@store, (count - 1), count, &@prc) unless count == 1
  end

  public
  def self.child_indices(length, parent_index)
    children = []
    left_child = (2 * parent_index) + 1
    right_child = (2 * parent_index) + 2
    children << left_child if length > left_child
    children << right_child if length > right_child
    children
  end

  def self.parent_index(child_index)
    raise "root has no parent" if child_index == 0
    (child_index - 1) / 2
  end

  def self.heapify_down(array, parent_idx, len = array.length, &prc)
    children = self.child_indices(len, parent_idx)
    
    prc ||= Proc.new do |el1, el2|
      el1 <=> el2
    end


    if children.length > 1 
      case prc.call(array[children[0]], array[children[1]])
        when -1
          smallest_child = children[0]
        when 0
          smallest_child = children[1]
        when 1
          smallest_child = children[1]
      end
    elsif children.length > 0 
      smallest_child = children[0]
    else
      smallest_child = nil
    end

    if smallest_child 
      if prc.call(array[smallest_child], array[parent_idx]) == -1
        array[smallest_child], array[parent_idx] = array[parent_idx], array[smallest_child]
      end
      self.heapify_down(array, smallest_child, array.length, &prc)
    end
    
    children.each do |child| 
      self.heapify_down(array, child, &prc)
    end
    
    array
  end

  def self.heapify_up(array, child_idx, len = array.length, &prc)
    prc ||= Proc.new do |el1, el2|
      el1 <=> el2
    end

    parent_idx = self.parent_index(child_idx)

    if prc.call(array[parent_idx], array[child_idx]) == 1
      array[parent_idx], array[child_idx] = array[child_idx], array[parent_idx]
    end

    self.heapify_up(array, parent_idx, len, &prc) unless parent_idx == 0
    array
  end
end
