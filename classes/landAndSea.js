'use strict';

class Box {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.area = Math.abs(c - a) * Math.abs(d - b);
    }
}

class Node {
    constructor(type, parent, a, b, c, d) {
        this.type = type;
        this.parent = parent;
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    isInside(box) {
        return(this.a < box.a) && (this.b < box.b) && (this.c > box.c) && (this.d > box.d);
    }

    accept(visitor) {
        visitor.visit(this);
    }
}

class NodeVisitor {
    constructor(total, boxes) {
        this.land = 0;
        this.total = total;
        this.boxes = boxes;
        this.counter = 0;

        this.boxes.sort((a, b) => (a.area < b.area) ? 1 : -1);
    }

    getNumLand() {
        return this.land;
    }

    traverse(rootNode) {
        this.currentNode = rootNode;

        while (this.counter < this.total) {
            this.currentNode.accept(this);
        }
    }

    visit(node) {
        let box = this.boxes[this.counter];

        if (node.isInside(box)) {
            let child, type;

            for (let i = 0; i < node.children.length; i++) {
                child = node.children[i];

                if (child.isInside(box)) {
                    child.accept(this);
                    return;
                }
            }

            type = node.type === 'sea' ? 'land' : 'sea';

            node.addChild(new Node(type, node, box.a, box.b, box.c, box.d));

            if (type == 'land') {
                this.land += 1;
            }

            this.counter += 1;
            this.currentNode = node;
        } else {
            node.parent.accept(this);
        }
    }
}

exports = module.exports = { Box, Node, NodeVisitor };
