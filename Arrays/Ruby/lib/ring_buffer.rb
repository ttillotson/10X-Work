require_relative "static_array"
require 'byebug'

class RingBuffer
  attr_reader :length

  def initialize
    @store = StaticArray.new(0)
    @length = 0 
    @capacity = 8
    @start_idx = 0
  end

  # O(1)
  def [](index)
    check_index(index)
    @store[converted_index(index)] 
  end

  # O(1)
  def []=(index, val)
    check_index(index)
    @store[converted_index(index)] = val
  end

  # O(1)
  def pop
    raise "index out of bounds" if @length == 0
    val = @store[converted_index(@length - 1)]
    @length -= 1
    val
  end

  # O(1) ammortized
  def push(val)
    resize! if @length == @capacity 

    @store[converted_index(@length)] = val
    @length += 1
    @store
  end

  # O(1)
  def shift
    raise "index out of bounds" if @length == 0
    val = @store[@start_idx]
    @start_idx = (@start_idx + 1) % @capacity
    @length -= 1
    val
  end

  # O(1) ammortized
  def unshift(val)
    resize! if @length == @capacity 
      
    @length += 1
    @start_idx = (@start_idx - 1) % @capacity
    @store[@start_idx] = val
    @store
  end

  protected

  attr_accessor :capacity, :start_idx, :store
  attr_writer :length

  def check_index(index)
    if (index >= @length) || @length == 0
      raise "index out of bounds"
    end
  end

  def converted_index(index)
    (@start_idx + index) % @capacity
  end

  def resize!
    @capacity *= 2
    previous_store = @store 
    @store = StaticArray.new(capacity * 2)
    @length.times do |idx|
      @store[idx] = previous_store[idx]
    end
  end
end
