require_relative 'binary_search_tree'

def kth_largest(tree_node, k)
    arr = []
    until arr.length == k 
        # debugger
        largest = maximum(tree_node)
        arr << largest
        # p largest.parent.right.value 
        if largest.parent.nil?
            tree_node = tree_node.left
            tree_node.parent = nil
        else
            largest.parent.right = nil 
        end
    end
    arr[-1]
end

def maximum(tree_node = @root)
    return maximum(tree_node.right) unless tree_node.right.nil?
    tree_node
end