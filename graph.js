class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach((v) => {
      this.nodes.add(v);
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    vertex.adjacent.forEach((a) => {
      this.removeEdge(vertex, a);
    });
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = [start.value]) {
    start.adjacent.forEach((a) => {
      if (!seen.includes(a.value)) {
        seen.push(a.value);
        this.depthFirstSearch(a, seen);
      }
    });
    return seen;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start, seen = [start.value]) {
    const queue = [start];

    while (queue.length) {
      const node = queue.shift();

      node.adjacent.forEach((a) => {
        if (!seen.includes(a.value)) {
          seen.push(a.value);
          queue.push(a);
        }
      });
    }
    return seen;
  }
}

module.exports = { Graph, Node }