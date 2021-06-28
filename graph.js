/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) { 
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) { 
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) { 
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    // ITERATIVE
    let toVisitStack = [start];
    let seen = new Set();
    let values = [];
    seen.add(start);
    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      values.push(current.value);
      for (let node of current.adjacent) {
        if (!(seen.has(node))) {
          toVisitStack.push(node);
          seen.add(node);
        }
      }
    }
    return values;

    // RECURSIVE
    // let seen = new Set();
    // let values = [];

    // function traverse(vertex) {
    //   seen.add(vertex);
    //   values.push(vertex.value);
    //   for (let node of vertex.adjacent) {
    //     if (!(seen.has(node))) {
    //       traverse(node);
    //     }
    //   }
    // }
    // traverse(start);
    // return values;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) { 
    let toVisitQueue = [start];
    let seen = new Set();
    let values = [];
    seen.add(start);
    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();
      values.push(current.value);
      for (let node of current.adjacent) {
        if (!(seen.has(node))) {
          toVisitQueue.push(node);
          seen.add(node);
        }
      }
    }
    return values;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) { 
    // queue is array of arrays of [vertex, distance]
    let toVisitQueue = [[start, 0]];
    let seen = new Set();
    seen.add(start);
    while (toVisitQueue.length) {
      let [current, dist] = toVisitQueue.shift();
      if (current === end) {
        return dist;
      }
      for (let node of current.adjacent) {
        if (!(seen.has(node))) {
          seen.add(node);
          toVisitQueue.push([node, dist + 1]);
        }
      }
    }
  }
}

module.exports = { Graph, Node }
