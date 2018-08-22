class BSTNode

  attr_accessor :parent, :right, :left, :color
  attr_reader :value

  def initialize(value)
    @value = value
    @right = nil
    @left = nil
    @parent = nil
    @color = nil
  end

  def grandparent
    parent.parent
  end

  def uncle
    grandparent.left if value >= parent.value
    grandparent.right if value < parent.value
  end
  # def inspect
  #   "Node: value=#{@value} parent=#{@parent.value} right=#{@right.value} left=#{@left.value}"
  # end
end
