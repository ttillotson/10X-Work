require 'byebug'
require_relative 'bst_node'
# There are many ways to implement these methods, feel free to add arguments 
# to methods as you see fit, or to create helper methods.

class BinarySearchTree
  attr_reader :root
  def initialize
    @root = nil
  end

  def insert(value, parent = @root)
    # First Insert is assigned to Root
    unless @root 
      @root = BSTNode.new(value)
      @root.parent = nil
      return
    end

    # Logic for a value smaller than the parent
    if value <= parent.value 
      if parent.left
        insert(value, parent.left) 
      else
        node = BSTNode.new(value)
        parent.left = node
        node.parent = parent
      end
    end

    # Logic for a value larger than the parent
    if value > parent.value 
      if parent.right
        insert(value, parent.right) 
      else
        node = BSTNode.new(value)
        parent.right = node
        node.parent = parent
      end
    end
  end

  def find(value, tree_node = @root)
    return tree_node if value == tree_node.value
    # Base Cases
    return nil if value < tree_node.value && tree_node.left.nil?
    return nil if value > tree_node.value && tree_node.right.nil?
    # Recursive Step
    return find(value, tree_node.left) if value < tree_node.value
    return find(value, tree_node.right) if value > tree_node.value
  end

  def delete(value)
    node = find(value)
    return nil unless node 

    # If desired node has 2 children
    if node.left && node.right 
      # Find largest node in left tree
      rep_node = maximum(node.left) 

      # Transition Replacement Out (rep_node)
      reassign_parent(rep_node, rep_node.left)

      # Transition Replacement Into Deleted's Spot
      reassign_children(node, rep_node)

      # Tell the parent it has a new child
      reassign_parent(node, rep_node)

      @root = rep_node if @root == node 

    elsif node.left || node.right
      rep_node = node.left 
      rep_node ||= node.right 

      # reassign_children(node, rep_node)
      reassign_parent(node, rep_node)

      @root = rep_node if @root == node 

    else # No Children
      @root = nil unless node.parent

      reassign_parent(node) if node.parent
    end
  end

  # helper method for #delete:
  def maximum(tree_node = @root)
    return maximum(tree_node.right) unless tree_node.right.nil?
    tree_node
  end

  def depth(tree_node = @root)
    return 0 if tree_node.nil?
    return 0 if tree_node.left.nil? && tree_node.right.nil?
    
    left, right = 1, 1
    (left += depth(tree_node.left)) unless tree_node.left.nil?
    (right += depth(tree_node.right)) unless tree_node.right.nil?

    (left >= right ? left : right)
  end 

  def is_balanced?(tree_node = @root)
    return true if tree_node.nil?
    return false if (depth(tree_node.left) - depth(tree_node.right)).abs > 1 
    return true if tree_node.left.nil? && tree_node.right.nil?

    is_balanced?(tree_node.left) && is_balanced?(tree_node.right)
  end

  def in_order_traversal(tree_node = @root, arr = [])
    until @root == nil 
      # debugger
      smallest = minimum(@root)
      arr << smallest.value 
      delete(smallest.value)
    end
    arr 
  end

  private

  # optional helper methods go here:
  def reassign_children(old_node, rep_node)
    # Reassign pointers for rep_node
    rep_node.left = old_node.left 
    rep_node.left.parent = rep_node if rep_node.left
    rep_node.right = old_node.right
    rep_node.right.parent = rep_node if rep_node.right
  end

  def reassign_parent(old_node, new_node = nil)
    # Tell the parent it has a new child
    new_node.parent = old_node.parent unless new_node.nil?
    unless old_node.parent.nil?
      old_node.parent.left = new_node if old_node.parent.value > old_node.value
      old_node.parent.right = new_node if old_node.parent.value <= old_node.value
    end
  end

  def minimum(tree_node = @root)
    return minimum(tree_node.left) unless tree_node.left.nil? 
    tree_node
  end
end
