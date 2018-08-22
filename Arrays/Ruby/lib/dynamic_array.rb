require_relative "static_array"

class DynamicArray
  attr_reader :length

  def initialize
    @store = StaticArray.new(4)
    @length = 0
    @capacity = 8
  end

  # O(1)
  def [](index)
    raise "index out of bounds" if index >= @length
    @store[index]
  end

  # O(1)
  def []=(index, value)
    raise "index out of bounds" if index > @length
    @store[index] = value
  end

  # O(1)
  def pop
    raise "index out of bounds" if @length == 0

    @length -= 1
    val = @store[@length]
    @store[@length] = nil
    val
  end

  # O(1) ammortized; O(n) worst case. Variable because of the possible
  # resize.
  def push(val)
    resize! if @length == @capacity
    @store[@length] = val
    @length += 1 
  end

  # O(n): has to shift over all the elements.
  def shift
    raise "index out of bounds" if @length == 0
    @length -= 1
    val = @store[0]
    @length.times do |idx|
      @store[idx] = @store[idx + 1]
    end

    val
  end

  # O(n): has to shift over all the elements.
  def unshift(val)
    resize! if @length == @capacity

    @length += 1
    @length.downto(1) do |idx|
      @store[idx] = @store[idx - 1]
    end
    @store[0] = val
  end

  protected

  attr_accessor :capacity, :store
  attr_writer :length

  def check_index(index)
  end

  # O(n): has to copy over all the elements to the new store.
  def resize!
    previous_store = @store 
    @capacity *= 2
    @store = StaticArray.new(@capacity)
    
    @length.times do |idx|
      @store[idx] = previous_store[idx]
    end
  end
end
