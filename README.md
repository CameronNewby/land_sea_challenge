# Land & Sea

# Problem
You are given a set of two-dimensional rectangular boxes on a two-dimensional Cartesian plane
with the following assumptions and constraints:

* All boxes are axis-aligned, i.e. each box can be defined in terms of the Cartesian
coordinates of its minimum corner {a, b} and its maximum corner {c, d} such that `a < c` and
`b < d`.
* Boxes may be contained within other boxes or may be disjoint from one another, i.e.
boxes do not overlap or touch one another..
* The boxes therefore partition the plane into a number of regions. The unbounded region,
which lies outside of all the boxes, is classified as `sea`.
* All other regions are classified either as `sea` or as `land`, subject to the constraint that
adjacent regions must not share the same classification.

The task is to read the definition of the rectangles from standard input formatted as defined
below, and output the number of regions classified as “land” to standard output.

If you make any other assumptions as part of your solution then please make comments in the
code. If there are further considerations that might affect the memory use or performance of your
solution then do make a note of them.

# Solution
The solution I have came up with here based upon the example given in instructions.
* First we want to read .txt file and transform the data into a nicer format, for this we take each line and its coordinates and create a 
new instance of the `Box` class. Which would generate and object like so `Box {a:, b:, c:, d:, area:}` with the total area pre calculated in constructor.
* We want to creat a tree like structure, where the root node is 'Sea' (the outling cartesian grid) from there we sort the Boxes we got from input in descending order by area. This will dramatically improve speed and will hopefully reduce the ammount of times we need to traverse back up and down the tree.
* From here we can then add the largest independant boxes as nodes to our tree and then we will check to see if each other box in sorted list is inside any other box, if it is then we add it a child node and set the type of that new child node to be the opposite of its parent.

# Design
* For the above solution to work we need to be able for each node to traverse down and up the tree to find the node to which to add itself as a child. To do this I have used the 'Visitor Pattern' https://www.geeksforgeeks.org/visitor-design-pattern/
* This pattern is used when you want to peform an operation on a group of similar kind of objects, in our case this similar kind of object is each `Node` in our tree. We want to perform a check on each node to see whether the next box in sorted box array is inside the given node, we also want to check if then that box is inside any of the given nodes children and we keep recurivley moving down the tree untill the box finds its adjacent parent.
* So we create two classes `Node` which will hold the coordinate information, type (land or sea), an array of child nodes and its parent node (to allow us to traverse up the tree). On this class we will have two main methods one `isInside` this method will take in a box (this will be the box looking to be added to the tree on each interation) and we will check if the bounds of that box fits inside our current node. Second method is for the visitor pattern and this is the `accept` method, this will get given an instance of the `NodeVisitor` class and call the `visit` method on that class passing a reference to itself (this) to that call.
The second class is the `NodeVisitor` which will perform the new logic/conditional checks on each reference to a node its given. Its primary method `visit` will first check to see if the next box from the top of the sorted boxes array is inside the current node it has been given by calling `node.isInside`, if the box is inside that node we then loop over all the child nodes of the given node calling the `accept` method on each child (which will intern recursivley call visit method again now with reference to child) breaking out of loop early once `child.isInside` check is true or if box is not inside any of given nodes children. if it is not inside then it calls the given nodes parent `accept` method passing in reference to itself (this) and then same checks are performed on parent traversing up the tree untill conditional is met. Once `isInside` conditionals have been met and the box is not inside of any of the current nodes children then we can create a new node and append it to the current nodes node array. We then increment the land counter if new node was of type land and then increment the overall counter of boxes to continue the while loop over all input boxes.

# Results
Results below are using the large input.txt (rename: ./inputs/finalInput.txt) file (all results include file loading/processing time) got the following outputs:
`   Land: 59528
    Execution Time: 5000ms  ` 

# Test Instructions
* Test files go inot `inputs` folder.
* Can then run tests using input files by giving the file path to `utils/parseAndLoadCartesianFile`, this will return new object
`
    {
        total: 3
        boxes: [
            Box {a:, b:, c:, d:, area:},
            Box {a:, b:, c:, d:, area:},
            Box {a:, b:, c:, d:, area:}
        ]
    }
`
you can then pass boxes array to the landAndSea calculator class
* Finally call method `getNumLand` to get total land areas for given input file.


# Node Commands:
* To install run `npm install`
* To run tests run `npm run test`

# Run from Command Line
* To run from command line `node .\landAndSeaRunner ./inputs/finalInput.txt`
* Make sure you are in root folder and run the runner script with first and only argument being the path to input.txt file