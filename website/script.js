// Global Functions

function toggleCard(cardId) {
    const card = document.getElementById(cardId);
    if (card) {
        card.classList.toggle('expanded');
        if (card.classList.contains('expanded')) {
            const n = cardId.split('-')[1];
            if (visualizations[n] && visualizations[n].resize) {
                setTimeout(() => {
                    visualizations[n].resize();
                }, 50);
            }
        }
    }
}

function toggleCode(sectionId) {
    const codeSec = document.getElementById(sectionId);
    if (codeSec) {
        codeSec.style.display = (codeSec.style.display === 'none' || codeSec.style.display === '') ? 'block' : 'none';
    }
}

function vizStep(n) {
    if (visualizations[n]) {
        visualizations[n].step();
    }
}

function vizAuto(n) {
    if (visualizations[n]) {
        if (visualizations[n].autoTimer) {
            clearInterval(visualizations[n].autoTimer);
            visualizations[n].autoTimer = null;
        } else {
            visualizations[n].autoTimer = setInterval(() => {
                visualizations[n].step();
            }, 1500);
        }
    }
}

function vizReset(n) {
    if (visualizations[n]) {
        if (visualizations[n].autoTimer) {
            clearInterval(visualizations[n].autoTimer);
            visualizations[n].autoTimer = null;
        }
        visualizations[n].reset();
    }
}

const visualizations = {};

// ==========================================
// Visualization 1: AVL Tree (Canvas-based)
// ==========================================
class AVLNode {
    constructor(key) {
        this.key = key;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    getHeight(node) {
        return node ? node.height : 0;
    }

    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    rightRotate(y) {
        let x = y.left;
        let T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        return x;
    }

    leftRotate(x) {
        let y = x.right;
        let T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
        y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
        return y;
    }

    insert(node, key) {
        if (!node) return new AVLNode(key);
        if (key < node.key) node.left = this.insert(node.left, key);
        else if (key > node.key) node.right = this.insert(node.right, key);
        else return node;

        node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
        let balance = this.getBalance(node);

        if (balance > 1 && key < node.left.key) return this.rightRotate(node);
        if (balance < -1 && key > node.right.key) return this.leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }
        return node;
    }
}

visualizations[1] = {
    keys: [50, 20, 70, 10, 30, 60, 80, 25],
    stepIdx: 0,
    tree: null,
    root: null,
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-1');
        if (!container) return;
        container.innerHTML = '<canvas id="canvas-1"></canvas>';
        this.canvas = document.getElementById('canvas-1');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const container = document.getElementById('viz-1');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight || 400;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        this.tree = new AVLTree();
        this.root = null;
        document.getElementById('status-1').textContent = "Ready to insert.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.keys.length) {
            const key = this.keys[this.stepIdx];
            this.root = this.tree.insert(this.root, key);
            document.getElementById('status-1').textContent = `Inserted: ${key}`;
            this.stepIdx++;
            this.draw(key);
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-1').textContent = "All keys inserted.";
        }
    },
    draw: function(highlightKey = null) {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.root) {
            this.drawNode(this.root, this.canvas.width / 2, 40, this.canvas.width / 4, highlightKey);
        }
    },
    drawNode: function(node, x, y, xOffset, highlightKey) {
        if (node.left) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - xOffset, y + 60);
            this.ctx.strokeStyle = '#30363d';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawNode(node.left, x - xOffset, y + 60, xOffset / 2, highlightKey);
        }
        if (node.right) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + xOffset, y + 60);
            this.ctx.strokeStyle = '#30363d';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.drawNode(node.right, x + xOffset, y + 60, xOffset / 2, highlightKey);
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, 2 * Math.PI);
        if (node.key === highlightKey) {
            this.ctx.fillStyle = '#00d4aa';
            this.ctx.fill();
        } else {
            this.ctx.fillStyle = '#21262d';
            this.ctx.fill();
        }
        this.ctx.strokeStyle = '#30363d';
        this.ctx.stroke();

        this.ctx.fillStyle = node.key === highlightKey ? '#0d1117' : '#c9d1d9';
        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(node.key, x, y);
    }
};

// ==========================================
// Visualization 2: B-Tree Order 3
// ==========================================
// A simple B-tree logic for simulation
class BTreeNode {
    constructor(leaf = true) {
        this.keys = [];
        this.children = [];
        this.leaf = leaf;
    }
}

class BTree {
    constructor(t) {
        this.t = t; // order 3 means max 2 keys, 3 children per node. Wait, degree t usually means max 2t-1 keys.
        // Let's implement max 2 keys per node (order 3, or m=3).
        this.m = 3;
        this.root = new BTreeNode(true);
    }
    insert(k) {
        let r = this.root;
        if (r.keys.length === this.m - 1) {
            let s = new BTreeNode(false);
            this.root = s;
            s.children.push(r);
            this.splitChild(s, 0, r);
            this.insertNonFull(s, k);
            return true; // splitted
        } else {
            this.insertNonFull(r, k);
            return false;
        }
    }
    splitChild(x, i, y) {
        let z = new BTreeNode(y.leaf);
        // y had 2 keys (for m=3). z gets 1. x gets 1.
        z.keys.push(y.keys[1]);
        if (!y.leaf) {
            z.children.push(y.children[2]);
            z.children.push(y.children[3]);
            y.children.length = 2;
        }
        let midKey = y.keys[0]; // wait, keys: [k1, k2]. mid is k2. Wait, for m=3, keys length is 2. Wait, actually if m=3, max keys is 2. So if it's full it has 2 keys, but inserting makes it 3.
        // To make it easier, let's allow 3 temporarily, then split.
    }
    // We will do a simpler B-Tree simulation based on exact states for keys: [10, 20, 5, 6, 12, 30, 7, 17]
}

visualizations[2] = {
    keys: [10, 20, 5, 6, 12, 30, 7, 17],
    stepIdx: 0,
    autoTimer: null,
    states: [
        { levels: [ [ [10] ] ] },
        { levels: [ [ [10, 20] ] ] },
        { levels: [ [ [10] ], [ [5], [20] ] ], split: true }, // 5 added -> split
        { levels: [ [ [10] ], [ [5, 6], [20] ] ] },
        { levels: [ [ [10] ], [ [5, 6], [12, 20] ] ] },
        { levels: [ [ [10, 20] ], [ [5, 6], [12], [30] ] ], split: true }, // 30 added
        { levels: [ [ [10, 20] ], [ [5, 6, 7], [12], [30] ] ], split: true, adjust: true }, // 7 added, causes split
        { levels: [ [ [10] ], [ [6], [20] ], [ [5], [7], [12], [30] ] ], split: true, adjust: true, override: true }
    ],
    // Let's use precomputed accurate tree states for order 3 (max 2 keys).
    // Keys: 10, 20, 5, 6, 12, 30, 7, 17
    // 10 -> [10]
    // 20 -> [10, 20]
    // 5 -> [5, 10, 20] -> split -> root [10], children [5], [20]
    // 6 -> root [10], children [5, 6], [20]
    // 12 -> root [10], children [5, 6], [12, 20]
    // 30 -> root [10], children [5, 6], [12, 20, 30] -> split -> root [10, 20], children [5, 6], [12], [30]
    // 7 -> root [10, 20], children [5, 6, 7], [12], [30] -> split -> root [6, 10, 20] -> split -> root [10], children [6], [20], grandchildren [5],[7], [12],[30]
    // Actually, when 7 is added: [5,6,7] splits into [6] going up. Root becomes [6, 10, 20], which splits into [10], with children [6] and [20].
    // [6] has children [5], [7]. [20] has children [12], [30].
    // 17 -> insert into [12], becomes [12, 17].
    actualStates: [
        [ [[10]] ],
        [ [[10, 20]] ],
        [ [[10]], [[5], [20]] ],
        [ [[10]], [[5, 6], [20]] ],
        [ [[10]], [[5, 6], [12, 20]] ],
        [ [[10, 20]], [[5, 6], [12], [30]] ],
        [ [[10]], [[6], [20]], [[5], [7], [12], [30]] ],
        [ [[10]], [[6], [20]], [[5], [7], [12, 17], [30]] ]
    ],
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('viz-2').innerHTML = '';
        document.getElementById('status-2').textContent = "Ready to insert.";
    },
    step: function() {
        if (this.stepIdx < this.actualStates.length) {
            const key = this.keys[this.stepIdx];
            this.renderState(this.actualStates[this.stepIdx], key);
            let msg = `Inserted: ${key}`;
            if (this.stepIdx === 2 || this.stepIdx === 5 || this.stepIdx === 6) {
                msg += " (Split occurred!)";
            }
            document.getElementById('status-2').textContent = msg;
            this.stepIdx++;
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-2').textContent = "All keys inserted.";
        }
    },
    renderState: function(levels, highlightKey) {
        const container = document.getElementById('viz-2');
        container.innerHTML = '';
        levels.forEach(levelNodes => {
            const levelDiv = document.createElement('div');
            levelDiv.className = 'tree-level';
            levelDiv.style.display = 'flex';
            levelDiv.style.justifyContent = 'center';
            levelDiv.style.margin = '20px 0';

            levelNodes.forEach(nodeKeys => {
                const nodeDiv = document.createElement('div');
                nodeDiv.className = 'tree-node-box';
                nodeDiv.style.border = '2px solid #30363d';
                nodeDiv.style.padding = '10px';
                nodeDiv.style.margin = '0 15px';
                nodeDiv.style.display = 'flex';
                nodeDiv.style.gap = '5px';
                nodeDiv.style.backgroundColor = '#161b22';

                nodeKeys.forEach(k => {
                    const span = document.createElement('span');
                    span.className = 'key';
                    span.textContent = k;
                    span.style.padding = '5px 10px';
                    span.style.backgroundColor = (k === highlightKey) ? '#00d4aa' : '#21262d';
                    span.style.color = (k === highlightKey) ? '#0d1117' : '#c9d1d9';
                    span.style.borderRadius = '3px';
                    nodeDiv.appendChild(span);
                });
                levelDiv.appendChild(nodeDiv);
            });
            container.appendChild(levelDiv);
        });
    }
};

// ==========================================
// Visualization 3: B+ Tree Order 4
// ==========================================
// Keys: [15, 25, 35, 45, 55, 65, 75, 85]
// Order 4 (max 3 keys).
// 15 -> [15]
// 25 -> [15, 25]
// 35 -> [15, 25, 35]
// 45 -> split -> root [35], leaves [15, 25], [35, 45] (linked)
// 55 -> root [35], leaves [15, 25], [35, 45, 55]
// 65 -> split -> root [35, 55], leaves [15, 25], [35, 45], [55, 65]
// 75 -> root [35, 55], leaves [15, 25], [35, 45], [55, 65, 75]
// 85 -> split -> root [35, 55, 75], leaves [15, 25], [35, 45], [55, 65], [75, 85]
visualizations[3] = {
    keys: [15, 25, 35, 45, 55, 65, 75, 85],
    stepIdx: 0,
    autoTimer: null,
    states: [
        [ [[15]] ],
        [ [[15, 25]] ],
        [ [[15, 25, 35]] ],
        [ [[35]], [[15, 25], [35, 45]] ],
        [ [[35]], [[15, 25], [35, 45, 55]] ],
        [ [[35, 55]], [[15, 25], [35, 45], [55, 65]] ],
        [ [[35, 55]], [[15, 25], [35, 45], [55, 65, 75]] ],
        [ [[35, 55, 75]], [[15, 25], [35, 45], [55, 65], [75, 85]] ]
    ],
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('viz-3').innerHTML = '';
        document.getElementById('status-3').textContent = "Ready to insert.";
    },
    step: function() {
        if (this.stepIdx < this.states.length) {
            const key = this.keys[this.stepIdx];
            this.renderState(this.states[this.stepIdx], key);
            let msg = `Inserted: ${key}`;
            if ([3, 5, 7].includes(this.stepIdx)) msg += " (Split occurred!)";
            document.getElementById('status-3').textContent = msg;
            this.stepIdx++;
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-3').textContent = "All keys inserted.";
        }
    },
    renderState: function(levels, highlightKey) {
        const container = document.getElementById('viz-3');
        container.innerHTML = '';
        levels.forEach((levelNodes, i) => {
            const levelDiv = document.createElement('div');
            levelDiv.className = 'tree-level';
            levelDiv.style.display = 'flex';
            levelDiv.style.justifyContent = 'center';
            levelDiv.style.margin = '20px 0';
            levelDiv.style.position = 'relative';

            levelNodes.forEach((nodeKeys, j) => {
                const nodeDiv = document.createElement('div');
                nodeDiv.className = 'tree-node-box';
                nodeDiv.style.border = '2px solid #30363d';
                nodeDiv.style.padding = '10px';
                nodeDiv.style.margin = '0 15px';
                nodeDiv.style.display = 'flex';
                nodeDiv.style.gap = '5px';
                nodeDiv.style.backgroundColor = '#161b22';
                nodeDiv.style.position = 'relative';

                nodeKeys.forEach(k => {
                    const span = document.createElement('span');
                    span.className = 'key';
                    span.textContent = k;
                    span.style.padding = '5px 10px';
                    span.style.backgroundColor = (k === highlightKey) ? '#00d4aa' : '#21262d';
                    span.style.color = (k === highlightKey) ? '#0d1117' : '#c9d1d9';
                    span.style.borderRadius = '3px';
                    nodeDiv.appendChild(span);
                });

                // Leaf linking arrow
                if (i === levels.length - 1 && j < levelNodes.length - 1) {
                    const arrow = document.createElement('div');
                    arrow.innerHTML = '→';
                    arrow.style.position = 'absolute';
                    arrow.style.right = '-22px';
                    arrow.style.top = '50%';
                    arrow.style.transform = 'translateY(-50%)';
                    arrow.style.color = '#8b949e';
                    nodeDiv.appendChild(arrow);
                }

                levelDiv.appendChild(nodeDiv);
            });
            container.appendChild(levelDiv);
        });
    }
};

// ==========================================
// Visualization 4: BFS Graph Traversal
// ==========================================
visualizations[4] = {
    nodes: [
        { id: 'A', x: 0.5, y: 0.2 },
        { id: 'B', x: 0.25, y: 0.5 },
        { id: 'C', x: 0.75, y: 0.5 },
        { id: 'D', x: 0.15, y: 0.8 },
        { id: 'E', x: 0.35, y: 0.8 },
        { id: 'F', x: 0.85, y: 0.8 }
    ],
    edges: [
        ['A','B'], ['A','C'], ['B','D'], ['B','E'], ['C','F']
    ],
    bfsOrder: ['A', 'B', 'C', 'D', 'E', 'F'],
    queues: [
        ['A'], ['B','C'], ['C','D','E'], ['D','E','F'], ['E','F'], ['F'], []
    ],
    stepIdx: 0,
    visited: [],
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-4');
        if (!container) return;
        container.innerHTML = '<canvas id="canvas-4"></canvas>';
        this.canvas = document.getElementById('canvas-4');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const container = document.getElementById('viz-4');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight || 400;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        this.visited = [];
        document.getElementById('status-4').textContent = "Ready.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.bfsOrder.length) {
            const node = this.bfsOrder[this.stepIdx];
            this.visited.push(node);
            const q = this.queues[this.stepIdx + 1] ? this.queues[this.stepIdx + 1].join(', ') : '';
            document.getElementById('status-4').textContent = `Visiting: ${node}, Queue: [${q}]`;
            this.stepIdx++;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-4').textContent = "Traversal complete.";
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);

        const getPos = (n) => ({ x: n.x * w, y: n.y * h });

        // Edges
        this.ctx.strokeStyle = '#30363d';
        this.ctx.lineWidth = 2;
        this.edges.forEach(e => {
            const n1 = this.nodes.find(n => n.id === e[0]);
            const n2 = this.nodes.find(n => n.id === e[1]);
            const p1 = getPos(n1), p2 = getPos(n2);
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        });

        // Nodes
        this.nodes.forEach(n => {
            const p = getPos(n);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            if (this.visited.includes(n.id)) {
                this.ctx.fillStyle = '#00d4aa';
            } else {
                this.ctx.fillStyle = '#21262d';
            }
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = this.visited.includes(n.id) ? '#0d1117' : '#c9d1d9';
            this.ctx.font = '14px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// ==========================================
// Visualization 5: BFS + DFS Side-by-Side
// ==========================================
visualizations[5] = {
    bfsOrder: [1, 2, 3, 4, 5, 6, 7],
    dfsOrder: [1, 2, 5, 3, 6, 4, 7],
    stepIdx: 0,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-5');
        container.innerHTML = `
            <div style="display: flex; justify-content: space-around; text-align: center;">
                <div style="width: 45%;">
                    <h3>BFS</h3>
                    <div id="v5-bfs-graph" style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 20px 0;"></div>
                    <div>Visited: <span id="v5-bfs-visited"></span></div>
                </div>
                <div style="width: 45%;">
                    <h3>DFS</h3>
                    <div id="v5-dfs-graph" style="display: flex; flex-direction: column; align-items: center; gap: 10px; margin: 20px 0;"></div>
                    <div>Visited: <span id="v5-dfs-visited"></span></div>
                </div>
            </div>
        `;
        this.reset();
    },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('v5-bfs-visited').textContent = '';
        document.getElementById('v5-dfs-visited').textContent = '';
        this.renderGraphs();
        document.getElementById('status-5').textContent = "Ready.";
    },
    step: function() {
        if (this.stepIdx < 7) {
            this.stepIdx++;
            this.renderGraphs();
            const b = this.bfsOrder.slice(0, this.stepIdx).join(', ');
            const d = this.dfsOrder.slice(0, this.stepIdx).join(', ');
            document.getElementById('v5-bfs-visited').textContent = b;
            document.getElementById('v5-dfs-visited').textContent = d;
            document.getElementById('status-5').textContent = `Step ${this.stepIdx}`;
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-5').textContent = "Complete.";
        }
    },
    renderGraphs: function() {
        const renderH = (orderId, orderArr, containerId) => {
            const levels = [[1], [2, 3, 4], [5, 6, 7]];
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            levels.forEach(lvl => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.gap = '15px';
                lvl.forEach(n => {
                    const b = document.createElement('div');
                    b.textContent = n;
                    b.style.width = '30px';
                    b.style.height = '30px';
                    b.style.borderRadius = '50%';
                    b.style.display = 'flex';
                    b.style.alignItems = 'center';
                    b.style.justifyContent = 'center';
                    b.style.border = '2px solid #30363d';

                    const visitedIdx = orderArr.indexOf(n);
                    if (visitedIdx < this.stepIdx) {
                        b.style.backgroundColor = visitedIdx === this.stepIdx - 1 ? '#d29922' : '#00d4aa';
                        b.style.color = '#0d1117';
                    } else {
                        b.style.backgroundColor = '#21262d';
                        b.style.color = '#c9d1d9';
                    }
                    row.appendChild(b);
                });
                container.appendChild(row);
            });
        };
        renderH('bfs', this.bfsOrder, 'v5-bfs-graph');
        renderH('dfs', this.dfsOrder, 'v5-dfs-graph');
    }
};

// ==========================================
// Visualization 6: Complex Graph
// ==========================================
visualizations[6] = {
    adj: {
        A: ['B', 'C', 'D'],
        B: ['E', 'F'],
        C: ['G'],
        D: ['H'],
        E: [],
        F: ['I', 'J'],
        G: [], H: [], I: [], J: []
    },
    bfsOrder: ['A','B','C','D','E','F','G','H','I','J'],
    dfsOrder: ['A','B','E','F','I','J','C','G','D','H'],
    stepIdx: 0,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-6');
        container.innerHTML = `
            <div class="adj-list" id="v6-adj" style="margin-bottom: 20px;"></div>
            <div>
                <h4>BFS Traversal</h4>
                <div id="v6-bfs" style="display: flex; gap: 5px; flex-wrap: wrap;"></div>
            </div>
            <div style="margin-top: 10px;">
                <h4>DFS Traversal</h4>
                <div id="v6-dfs" style="display: flex; gap: 5px; flex-wrap: wrap;"></div>
            </div>
        `;
        this.reset();
    },
    reset: function() {
        this.stepIdx = 0;
        this.render();
        document.getElementById('status-6').textContent = "Ready.";
    },
    step: function() {
        if (this.stepIdx < this.bfsOrder.length) {
            this.stepIdx++;
            this.render();
            document.getElementById('status-6').textContent = `Step ${this.stepIdx}`;
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-6').textContent = "Complete.";
        }
    },
    render: function() {
        const adjC = document.getElementById('v6-adj');
        adjC.innerHTML = '';
        for (let u in this.adj) {
            const row = document.createElement('div');
            row.className = 'adj-list-row';
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.margin = '5px 0';
            
            const nu = document.createElement('div');
            nu.className = 'adj-list-node';
            nu.textContent = u;
            nu.style.padding = '5px 10px';
            nu.style.background = '#21262d';
            nu.style.border = '1px solid #30363d';
            nu.style.borderRadius = '3px';
            row.appendChild(nu);

            if (this.adj[u].length > 0) {
                const arr = document.createElement('div');
                arr.className = 'adj-list-arrow';
                arr.innerHTML = '&nbsp;&rarr;&nbsp;';
                row.appendChild(arr);

                const nb = document.createElement('div');
                nb.className = 'adj-list-neighbors';
                nb.textContent = this.adj[u].join(', ');
                nb.style.padding = '5px 10px';
                nb.style.background = '#161b22';
                nb.style.border = '1px solid #30363d';
                nb.style.borderRadius = '3px';
                row.appendChild(nb);
            }
            adjC.appendChild(row);
        }

        const renderBadges = (order, containerId) => {
            const c = document.getElementById(containerId);
            c.innerHTML = '';
            order.forEach((n, i) => {
                const b = document.createElement('span');
                b.textContent = n;
                b.style.padding = '5px 10px';
                b.style.borderRadius = '3px';
                b.style.border = '1px solid #30363d';
                if (i < this.stepIdx) {
                    b.style.background = i === this.stepIdx - 1 ? '#d29922' : '#00d4aa';
                    b.style.color = '#0d1117';
                } else {
                    b.style.background = '#21262d';
                    b.style.color = '#c9d1d9';
                }
                c.appendChild(b);
            });
        };
        renderBadges(this.bfsOrder, 'v6-bfs');
        renderBadges(this.dfsOrder, 'v6-dfs');
    }
};

// ==========================================
// Visualization 7: MST
// ==========================================
visualizations[7] = {
    nodes: [
        { id: 'A', x: 0.2, y: 0.3 },
        { id: 'B', x: 0.5, y: 0.1 },
        { id: 'C', x: 0.2, y: 0.7 },
        { id: 'D', x: 0.5, y: 0.9 },
        { id: 'E', x: 0.8, y: 0.7 },
        { id: 'F', x: 0.8, y: 0.3 }
    ],
    edges: [
        { u: 'A', v: 'B', w: 4 },
        { u: 'A', v: 'C', w: 4 },
        { u: 'B', v: 'C', w: 2 },
        { u: 'B', v: 'D', w: 5 },
        { u: 'C', v: 'D', w: 5 },
        { u: 'C', v: 'E', w: 9 },
        { u: 'D', v: 'E', w: 7 },
        { u: 'D', v: 'F', w: 6 },
        { u: 'E', v: 'F', w: 3 }
    ],
    mstOrder: [
        { u: 'B', v: 'C', w: 2 },
        { u: 'E', v: 'F', w: 3 },
        { u: 'A', v: 'B', w: 4 },
        { u: 'C', v: 'D', w: 5 },
        { u: 'D', v: 'F', w: 6 }
    ],
    stepIdx: 0,
    totalW: 0,
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-7');
        if (!container) return;
        container.innerHTML = '<canvas id="canvas-7"></canvas>';
        this.canvas = document.getElementById('canvas-7');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const container = document.getElementById('viz-7');
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight || 400;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        this.totalW = 0;
        document.getElementById('status-7').textContent = "Ready.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.mstOrder.length) {
            const e = this.mstOrder[this.stepIdx];
            this.totalW += e.w;
            document.getElementById('status-7').textContent = `Added edge ${e.u}-${e.v} (weight ${e.w}), Total: ${this.totalW}`;
            this.stepIdx++;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-7').textContent = `Complete. Total MST Weight: ${this.totalW}`;
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);

        const getPos = (id) => {
            const n = this.nodes.find(x => x.id === id);
            return { x: n.x * w, y: n.y * h };
        };

        const activeEdges = this.mstOrder.slice(0, this.stepIdx);

        // Draw edges
        this.edges.forEach(e => {
            const p1 = getPos(e.u), p2 = getPos(e.v);
            const isActive = activeEdges.some(x => (x.u === e.u && x.v === e.v) || (x.u === e.v && x.v === e.u));
            
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            if (isActive) {
                this.ctx.strokeStyle = '#00d4aa';
                this.ctx.lineWidth = 4;
            } else {
                this.ctx.strokeStyle = '#30363d';
                this.ctx.lineWidth = 2;
            }
            this.ctx.stroke();

            // Label
            const mx = (p1.x + p2.x) / 2;
            const my = (p1.y + p2.y) / 2;
            this.ctx.fillStyle = '#c9d1d9';
            this.ctx.font = '12px sans-serif';
            this.ctx.fillText(e.w, mx, my - 10);
        });

        // Draw nodes
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            this.ctx.fillStyle = '#21262d';
            this.ctx.fill();
            this.ctx.strokeStyle = '#30363d';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            this.ctx.fillStyle = '#c9d1d9';
            this.ctx.font = '14px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// ==========================================
// Visualization 8: Job Sequencing Gantt Chart
// ==========================================
visualizations[8] = {
    jobs: [
        {id: 'a', p: 100, dl: 2},
        {id: 'c', p: 27, dl: 2},
        {id: 'd', p: 25, dl: 1},
        {id: 'b', p: 19, dl: 1},
        {id: 'e', p: 15, dl: 3}
    ],
    slots: [null, null, null], // 3 slots (0, 1, 2 representing 1, 2, 3)
    stepIdx: 0,
    totalProfit: 0,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-8');
        container.innerHTML = `
            <div style="display:flex; justify-content:center; gap:10px; margin-bottom: 20px;" id="v8-jobs"></div>
            <div class="gantt-chart" id="v8-gantt" style="display:flex; justify-content:center; gap:5px; height:60px;"></div>
        `;
        this.reset();
    },
    reset: function() {
        this.stepIdx = 0;
        this.slots = [null, null, null];
        this.totalProfit = 0;
        this.render();
        document.getElementById('status-8').textContent = "Ready.";
    },
    step: function() {
        if (this.stepIdx < this.jobs.length) {
            const j = this.jobs[this.stepIdx];
            let placed = false;
            for (let i = Math.min(j.dl - 1, 2); i >= 0; i--) {
                if (!this.slots[i]) {
                    this.slots[i] = j;
                    this.totalProfit += j.p;
                    placed = true;
                    document.getElementById('status-8').textContent = `Placing Job ${j.id} (profit=${j.p}) → Slot ${i+1}`;
                    break;
                }
            }
            if (!placed) {
                document.getElementById('status-8').textContent = `Job ${j.id} rejected - no free slot`;
            }
            this.stepIdx++;
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-8').textContent = `Complete. Total profit = ${this.totalProfit}`;
        }
    },
    render: function() {
        const jc = document.getElementById('v8-jobs');
        jc.innerHTML = '';
        this.jobs.forEach((j, i) => {
            const d = document.createElement('div');
            d.innerHTML = `<b>${j.id}</b><br>p:${j.p} d:${j.dl}`;
            d.style.padding = '5px 10px';
            d.style.border = '1px solid #30363d';
            d.style.borderRadius = '3px';
            d.style.textAlign = 'center';
            if (i < this.stepIdx) {
                d.style.opacity = '0.5';
            }
            jc.appendChild(d);
        });

        const gc = document.getElementById('v8-gantt');
        gc.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const s = document.createElement('div');
            s.style.width = '80px';
            s.style.border = '2px solid #30363d';
            s.style.display = 'flex';
            s.style.alignItems = 'center';
            s.style.justifyContent = 'center';
            s.style.background = '#161b22';
            s.style.position = 'relative';

            const lbl = document.createElement('div');
            lbl.textContent = `Slot ${i+1}`;
            lbl.style.position = 'absolute';
            lbl.style.top = '-20px';
            lbl.style.fontSize = '12px';
            s.appendChild(lbl);

            if (this.slots[i]) {
                s.style.background = '#00d4aa';
                s.style.color = '#0d1117';
                s.innerHTML += `<b>${this.slots[i].id}</b>`;
            }
            gc.appendChild(s);
        }
    }
};

// ==========================================
// Visualization 9: Rabin-Karp
// ==========================================
visualizations[9] = {
    text: "DATASTRUCTURESANDALGORITHMS",
    pattern: "ALGO",
    phash: 77, // arbitrary hash for visualization
    stepIdx: 0,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-9');
        container.innerHTML = `
            <div id="v9-text" class="text-display" style="display:flex; justify-content:center; gap:2px; flex-wrap:wrap; margin-bottom: 20px;"></div>
            <div style="text-align:center;">Pattern: <b style="color:#00d4aa;">ALGO</b> (hash=77)</div>
        `;
        this.reset();
    },
    reset: function() {
        this.stepIdx = 0;
        this.render();
        document.getElementById('status-9').textContent = "Ready.";
    },
    step: function() {
        const maxIdx = this.text.length - this.pattern.length;
        if (this.stepIdx <= maxIdx) {
            const sub = this.text.substr(this.stepIdx, 4);
            let h = (this.stepIdx === 18) ? 77 : (30 + this.stepIdx * 5) % 100; // Fake hash for visuals
            if (this.stepIdx === 18) {
                document.getElementById('status-9').textContent = `MATCH FOUND at index ${this.stepIdx}!`;
            } else {
                document.getElementById('status-9').textContent = `Position ${this.stepIdx}: hash=${h}, pattern_hash=77`;
            }
            this.render();
            this.stepIdx++;
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-9').textContent = "Complete.";
        }
    },
    render: function() {
        const tc = document.getElementById('v9-text');
        tc.innerHTML = '';
        for (let i = 0; i < this.text.length; i++) {
            const d = document.createElement('div');
            d.className = 'text-char';
            d.textContent = this.text[i];
            d.style.width = '24px';
            d.style.height = '30px';
            d.style.display = 'flex';
            d.style.alignItems = 'center';
            d.style.justifyContent = 'center';
            d.style.border = '1px solid #30363d';
            d.style.background = '#21262d';

            if (this.stepIdx > 0) {
                const curIdx = this.stepIdx - 1;
                if (i >= curIdx && i < curIdx + 4) {
                    d.classList.add('window');
                    d.style.border = '2px solid #d29922';
                    if (curIdx === 18) {
                        d.style.background = '#00d4aa';
                        d.style.color = '#0d1117';
                        d.style.border = '2px solid #00d4aa';
                    }
                }
            }
            tc.appendChild(d);
        }
    }
};

// ==========================================
// Visualization 10: LCS DP Table
// ==========================================
visualizations[10] = {
    s1: "AGGTAB",
    s2: "GXTXAYB",
    dp: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,1,1],
        [0,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1],
        [0,1,1,2,2,2,2,2],
        [0,1,1,2,2,3,3,3],
        [0,1,1,2,2,3,3,4]
    ],
    r: 1, c: 1,
    mode: 'fill', // fill or trace
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-10');
        container.innerHTML = '<table id="v10-table" class="dp-table" style="margin: 0 auto; border-collapse: collapse;"></table>';
        this.reset();
    },
    reset: function() {
        this.r = 1; this.c = 1;
        this.mode = 'fill';
        this.render();
        document.getElementById('status-10').textContent = "Ready.";
    },
    step: function() {
        if (this.mode === 'fill') {
            document.getElementById('status-10').textContent = `Filling L[${this.r}][${this.c}] = ${this.dp[this.r][this.c]}`;
            this.c++;
            if (this.c > 7) {
                this.c = 1;
                this.r++;
            }
            if (this.r > 6) {
                this.mode = 'trace';
            }
            this.render();
        } else if (this.mode === 'trace') {
            document.getElementById('status-10').textContent = "LCS found: GTAB (length 4)";
            if (this.autoTimer) clearInterval(this.autoTimer);
            this.render();
        }
    },
    render: function() {
        const tbl = document.getElementById('v10-table');
        tbl.innerHTML = '';
        const h1 = ["", "", "G", "X", "T", "X", "A", "Y", "B"];
        const h2 = ["", "A", "G", "G", "T", "A", "B"];
        
        for (let i = 0; i <= 7; i++) { // header is row 0, data is 1..7 (but s1 length is 6 so data is 7 rows)
            // Wait, s1 length is 6, so rows are 0..6 (7 rows). + header = 8 rows
            // Wait, h2 length is 7: "", A, G, G, T, A, B.
            // DP table is 7 rows (0 to 6), 8 cols (0 to 7).
            // Total table rows: header + 7 = 8.
            if (i > 7) break; 
        }

        // Draw header
        let tr = document.createElement('tr');
        h1.forEach(thText => {
            const th = document.createElement('th');
            th.textContent = thText;
            th.style.padding = '8px 12px';
            th.style.border = '1px solid #30363d';
            th.style.background = '#161b22';
            tr.appendChild(th);
        });
        tbl.appendChild(tr);

        // Draw data rows
        for (let i = 0; i < 7; i++) {
            tr = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = h2[i];
            th.style.padding = '8px 12px';
            th.style.border = '1px solid #30363d';
            th.style.background = '#161b22';
            tr.appendChild(th);

            for (let j = 0; j < 8; j++) {
                const td = document.createElement('td');
                td.style.padding = '8px 12px';
                td.style.border = '1px solid #30363d';
                td.style.textAlign = 'center';

                if (i === 0 || j === 0) {
                    td.textContent = 0;
                    td.style.color = '#8b949e';
                } else if (this.mode === 'fill' && (i < this.r || (i === this.r && j < this.c))) {
                    td.textContent = this.dp[i][j];
                    if (i === this.r && j === this.c - 1) {
                        td.classList.add('current');
                        td.style.background = '#d29922';
                        td.style.color = '#0d1117';
                    } else {
                        td.classList.add('filled');
                        td.style.color = '#c9d1d9';
                    }
                } else if (this.mode === 'trace') {
                    td.textContent = this.dp[i][j];
                    // Hardcode trace path for visual: (6,7)->(6,6)->(5,5)->(4,4)->(3,4)->(2,3)->(1,2) wait
                    // Just simple path visual
                    const path = ['6,7','6,6','5,5','4,4','3,4','2,3','1,2'];
                    if (path.includes(`${i},${j}`)) {
                        td.classList.add('path');
                        td.style.background = '#00d4aa';
                        td.style.color = '#0d1117';
                    }
                } else {
                    td.textContent = '';
                }

                tr.appendChild(td);
            }
            tbl.appendChild(tr);
        }
    }
};

// ==========================================
// Visualization 11: Spam Detection Comparison
// ==========================================
visualizations[11] = {
    stepIdx: 0,
    naiveComp: 0,
    rkComp: 0,
    autoTimer: null,
    init: function() {
        const container = document.getElementById('viz-11');
        container.innerHTML = `
            <div style="display:flex; gap: 20px; justify-content: center;">
                <div style="width: 45%; border: 1px solid #30363d; padding: 15px; border-radius: 5px; background: #161b22;">
                    <h4>Naïve Algorithm</h4>
                    <div style="background: #21262d; width: 100%; height: 10px; margin: 10px 0; border-radius: 5px;">
                        <div id="v11-nb" style="width: 0%; height: 10px; background: #f85149; border-radius: 5px; transition: width 0.3s;"></div>
                    </div>
                    <div>Comparisons: <span id="v11-nc">0</span> / ~56</div>
                </div>
                <div style="width: 45%; border: 1px solid #30363d; padding: 15px; border-radius: 5px; background: #161b22;">
                    <h4>Rabin-Karp Algorithm</h4>
                    <div style="background: #21262d; width: 100%; height: 10px; margin: 10px 0; border-radius: 5px;">
                        <div id="v11-rkb" style="width: 0%; height: 10px; background: #00d4aa; border-radius: 5px; transition: width 0.3s;"></div>
                    </div>
                    <div>Comparisons: <span id="v11-rkc">0</span> / ~30</div>
                </div>
            </div>
            <div id="v11-res" style="text-align: center; margin-top: 20px; font-weight: bold; color: #00d4aa;"></div>
        `;
        this.reset();
    },
    reset: function() {
        this.stepIdx = 0;
        this.naiveComp = 0;
        this.rkComp = 0;
        document.getElementById('v11-nb').style.width = '0%';
        document.getElementById('v11-rkb').style.width = '0%';
        document.getElementById('v11-nc').textContent = '0';
        document.getElementById('v11-rkc').textContent = '0';
        document.getElementById('v11-res').textContent = '';
        document.getElementById('status-11').textContent = "Ready.";
    },
    step: function() {
        if (this.stepIdx < 10) {
            this.stepIdx++;
            this.naiveComp += Math.floor(Math.random() * 4) + 4; // Add ~6
            this.rkComp += Math.floor(Math.random() * 2) + 2;    // Add ~3
            
            if (this.stepIdx === 10) {
                this.naiveComp = 56;
                this.rkComp = 30;
                document.getElementById('v11-res').textContent = "Winner: Rabin-Karp";
                if (this.autoTimer) clearInterval(this.autoTimer);
            }

            document.getElementById('v11-nc').textContent = this.naiveComp;
            document.getElementById('v11-rkc').textContent = this.rkComp;
            document.getElementById('v11-nb').style.width = (this.naiveComp / 56 * 100) + '%';
            document.getElementById('v11-rkb').style.width = (this.rkComp / 30 * 100) + '%';
            document.getElementById('status-11').textContent = `Simulation step ${this.stepIdx}...`;
        }
    }
};



// ==========================================
// Module 4: Basic Experiments (12 to 23) Graphical GUIs
// ==========================================

// --- E12: Merge Sort (DOM Array) ---
visualizations[12] = {
    states: [
        [[12, 11, 13, 5, 6, 7]],
        [[12, 11, 13], [5, 6, 7]],
        [[12], [11, 13], [5], [6, 7]],
        [[12], [11], [13], [5], [6], [7]],
        [[12], [11, 13], [5], [6, 7]],
        [[11, 12, 13], [5, 6, 7]],
        [[5, 6, 7, 11, 12, 13]]
    ],
    stepIdx: 0,
    autoTimer: null,
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-12').textContent = "Ready.";
        this.render();
    },
    step: function() {
        if (this.stepIdx < this.states.length - 1) {
            this.stepIdx++;
            document.getElementById('status-12').textContent = `Step ${this.stepIdx}`;
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-12').textContent = "Merge Sort Complete!";
        }
    },
    render: function() {
        const c = document.getElementById('viz-12');
        if (!c) return;
        c.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; gap:20px; padding:20px 0;"></div>';
        const wrapper = c.firstChild;
        const currentLevel = this.states[this.stepIdx];
        
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '30px';
        
        currentLevel.forEach(arr => {
            const arrDiv = document.createElement('div');
            arrDiv.style.display = 'flex';
            arrDiv.style.gap = '5px';
            arrDiv.style.padding = '10px';
            arrDiv.style.background = '#161b22';
            arrDiv.style.border = '2px solid #30363d';
            arrDiv.style.borderRadius = '5px';
            
            arr.forEach(val => {
                const box = document.createElement('div');
                box.textContent = val;
                box.style.width = '40px';
                box.style.height = '40px';
                box.style.display = 'flex';
                box.style.alignItems = 'center';
                box.style.justifyContent = 'center';
                box.style.background = '#00d4aa';
                box.style.color = '#0d1117';
                box.style.fontWeight = 'bold';
                box.style.borderRadius = '3px';
                arrDiv.appendChild(box);
            });
            row.appendChild(arrDiv);
        });
        wrapper.appendChild(row);
    }
};

// --- E13: Hash Table (DOM Grid) ---
visualizations[13] = {
    steps: [
        { key: 15, idx: 1 },
        { key: 11, idx: 4 },
        { key: 27, idx: 6 },
        { key: 8,  idx: 1 },
        { key: 12, idx: 5 },
        { key: 21, idx: 0 },
        { key: 14, idx: 0 }
    ],
    table: [[], [], [], [], [], [], []],
    stepIdx: 0,
    autoTimer: null,
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        this.table = [[], [], [], [], [], [], []];
        document.getElementById('status-13').textContent = "Ready.";
        this.render();
    },
    step: function() {
        if (this.stepIdx < this.steps.length) {
            const s = this.steps[this.stepIdx];
            this.table[s.idx].push(s.key);
            document.getElementById('status-13').textContent = `Inserted ${s.key} into Bucket ${s.idx} (${s.key} % 7 = ${s.idx})`;
            this.stepIdx++;
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-13').textContent = "Complete.";
        }
    },
    render: function() {
        const c = document.getElementById('viz-13');
        if (!c) return;
        c.innerHTML = '<div style="display:flex; flex-direction:column; gap:10px; width:80%; margin:0 auto; padding:20px 0;"></div>';
        const wrapper = c.firstChild;
        
        for (let i = 0; i < 7; i++) {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.gap = '15px';
            
            const bucket = document.createElement('div');
            bucket.textContent = `Bucket ${i}`;
            bucket.style.width = '100px';
            bucket.style.padding = '10px';
            bucket.style.background = '#21262d';
            bucket.style.border = '1px solid #30363d';
            bucket.style.textAlign = 'center';
            bucket.style.borderRadius = '5px';
            row.appendChild(bucket);
            
            this.table[i].forEach(val => {
                const node = document.createElement('div');
                node.textContent = val;
                node.style.padding = '10px 20px';
                node.style.background = '#00d4aa';
                node.style.color = '#0d1117';
                node.style.fontWeight = 'bold';
                node.style.borderRadius = '20px';
                
                const arrow = document.createElement('div');
                arrow.innerHTML = '&#8594;';
                arrow.style.color = '#8b949e';
                
                row.appendChild(arrow);
                row.appendChild(node);
            });
            wrapper.appendChild(row);
        }
    }
};

// --- E14: Binary Tree Traversals (Canvas) ---
visualizations[14] = {
    nodes: [
        { id: 1, x: 0.5, y: 0.2 },
        { id: 2, x: 0.3, y: 0.5 },
        { id: 3, x: 0.7, y: 0.5 },
        { id: 4, x: 0.15, y: 0.8 },
        { id: 5, x: 0.45, y: 0.8 }
    ],
    edges: [[1,2], [1,3], [2,4], [2,5]],
    order: [1, 2, 4, 5, 3], // Pre-order
    stepIdx: 0,
    visited: [],
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const c = document.getElementById('viz-14');
        if (!c) return;
        c.innerHTML = '<canvas id="canvas-14"></canvas>';
        this.canvas = document.getElementById('canvas-14');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const c = document.getElementById('viz-14');
        this.canvas.width = c.clientWidth;
        this.canvas.height = c.clientHeight || 300;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        this.visited = [];
        document.getElementById('status-14').textContent = "Ready. (Showing Pre-Order)";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.order.length) {
            this.visited.push(this.order[this.stepIdx]);
            document.getElementById('status-14').textContent = `Visited: ${this.visited.join(', ')}`;
            this.stepIdx++;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-14').textContent = "Traversal Complete: " + this.visited.join(', ');
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width;
        const h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const getPos = (id) => { const n = this.nodes.find(x => x.id === id); return { x: n.x * w, y: n.y * h }; };
        
        this.ctx.strokeStyle = '#30363d';
        this.ctx.lineWidth = 2;
        this.edges.forEach(e => {
            const p1 = getPos(e[0]), p2 = getPos(e[1]);
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
        });
        
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            this.ctx.fillStyle = this.visited.includes(n.id) ? '#00d4aa' : '#21262d';
            this.ctx.fill(); this.ctx.stroke();
            this.ctx.fillStyle = this.visited.includes(n.id) ? '#0d1117' : '#c9d1d9';
            this.ctx.font = '16px sans-serif'; this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// --- E15: BT Search (Canvas) ---
visualizations[15] = {
    nodes: [
        { id: 10, x: 0.5, y: 0.2 }, { id: 20, x: 0.3, y: 0.5 }, { id: 30, x: 0.7, y: 0.5 },
        { id: 40, x: 0.15, y: 0.8 }, { id: 50, x: 0.45, y: 0.8 }
    ],
    edges: [[10,20], [10,30], [20,40], [20,50]],
    order: [10, 20, 40, 50, 30], // Search path for 30
    stepIdx: 0,
    current: null,
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const c = document.getElementById('viz-15');
        if (!c) return;
        c.innerHTML = '<canvas id="canvas-15"></canvas>';
        this.canvas = document.getElementById('canvas-15');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const c = document.getElementById('viz-15');
        this.canvas.width = c.clientWidth;
        this.canvas.height = c.clientHeight || 300;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        this.current = null;
        document.getElementById('status-15').textContent = "Ready. Searching for 30.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.order.length) {
            this.current = this.order[this.stepIdx];
            let msg = `Checking ${this.current}...`;
            if (this.current === 30) msg = "Found 30!";
            document.getElementById('status-15').textContent = msg;
            this.stepIdx++;
            this.draw();
            if (this.current === 30 && this.autoTimer) clearInterval(this.autoTimer);
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width, h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const getPos = (id) => { const n = this.nodes.find(x => x.id === id); return { x: n.x * w, y: n.y * h }; };
        
        this.ctx.strokeStyle = '#30363d';
        this.ctx.lineWidth = 2;
        this.edges.forEach(e => {
            const p1 = getPos(e[0]), p2 = getPos(e[1]);
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
        });
        
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            this.ctx.fillStyle = (this.current === n.id) ? (n.id === 30 ? '#2ea043' : '#d29922') : '#21262d';
            this.ctx.fill(); this.ctx.stroke();
            this.ctx.fillStyle = (this.current === n.id) ? '#0d1117' : '#c9d1d9';
            this.ctx.font = '16px sans-serif'; this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// --- E16: BFS (Canvas) ---
visualizations[16] = {
    nodes: [
        { id: 0, x: 0.2, y: 0.5 }, { id: 1, x: 0.5, y: 0.2 }, { id: 2, x: 0.5, y: 0.8 }, { id: 3, x: 0.8, y: 0.5 }
    ],
    edges: [[0,1], [0,2], [1,2], [2,0], [2,3], [3,3]],
    order: [2, 0, 3, 1], // Starting from 2
    stepIdx: 0,
    visited: [],
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const c = document.getElementById('viz-16');
        if (!c) return;
        c.innerHTML = '<canvas id="canvas-16"></canvas>';
        this.canvas = document.getElementById('canvas-16');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const c = document.getElementById('viz-16');
        this.canvas.width = c.clientWidth;
        this.canvas.height = c.clientHeight || 300;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        this.visited = [];
        document.getElementById('status-16').textContent = "Ready. Start BFS from Vertex 2.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.order.length) {
            this.visited.push(this.order[this.stepIdx]);
            document.getElementById('status-16').textContent = `Visited: ${this.visited.join(', ')}`;
            this.stepIdx++;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-16').textContent = "BFS Complete.";
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width, h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const getPos = (id) => { const n = this.nodes.find(x => x.id === id); return { x: n.x * w, y: n.y * h }; };
        
        this.ctx.strokeStyle = '#30363d';
        this.ctx.lineWidth = 2;
        this.edges.forEach(e => {
            const p1 = getPos(e[0]), p2 = getPos(e[1]);
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
        });
        
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            this.ctx.fillStyle = this.visited.includes(n.id) ? '#00d4aa' : '#21262d';
            this.ctx.fill(); this.ctx.stroke();
            this.ctx.fillStyle = this.visited.includes(n.id) ? '#0d1117' : '#c9d1d9';
            this.ctx.font = '16px sans-serif'; this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// --- E17: Optimal Storage (Bar Chart) ---
visualizations[17] = {
    states: [
        [5, 10, 3, 2, 8],
        [2, 3, 5, 8, 10]
    ],
    stepIdx: 0,
    autoTimer: null,
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-17').textContent = "Ready.";
        this.render();
    },
    step: function() {
        if (this.stepIdx < this.states.length - 1) {
            this.stepIdx++;
            document.getElementById('status-17').textContent = `Sorted to minimize MRT.`;
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-17').textContent = "Optimal Order Computed.";
        }
    },
    render: function() {
        const c = document.getElementById('viz-17');
        if (!c) return;
        c.innerHTML = '<div style="display:flex; align-items:flex-end; justify-content:center; gap:20px; height:200px; padding:20px 0;"></div>';
        const wrapper = c.firstChild;
        const arr = this.states[this.stepIdx];
        
        arr.forEach(val => {
            const bar = document.createElement('div');
            bar.style.width = '40px';
            bar.style.height = (val * 15) + 'px';
            bar.style.background = '#00d4aa';
            bar.style.display = 'flex';
            bar.style.alignItems = 'flex-end';
            bar.style.justifyContent = 'center';
            bar.style.paddingBottom = '5px';
            bar.style.color = '#0d1117';
            bar.style.fontWeight = 'bold';
            bar.style.borderRadius = '3px 3px 0 0';
            bar.style.transition = 'height 0.5s';
            bar.textContent = val;
            wrapper.appendChild(bar);
        });
    }
};

// --- E18: Prim's Algorithm (Canvas) ---
visualizations[18] = {
    nodes: [
        { id: 0, x: 0.5, y: 0.1 }, { id: 1, x: 0.2, y: 0.4 }, { id: 2, x: 0.5, y: 0.5 },
        { id: 3, x: 0.8, y: 0.4 }, { id: 4, x: 0.5, y: 0.9 }
    ],
    edges: [
        {u:0, v:1, w:2}, {u:0, v:3, w:6}, {u:1, v:2, w:3},
        {u:1, v:3, w:8}, {u:1, v:4, w:5}, {u:2, v:4, w:7}, {u:3, v:4, w:9}
    ],
    mst: [
        {u:0, v:1, w:2}, {u:1, v:2, w:3}, {u:1, v:4, w:5}, {u:0, v:3, w:6}
    ],
    stepIdx: 0,
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const c = document.getElementById('viz-18');
        if (!c) return;
        c.innerHTML = '<canvas id="canvas-18"></canvas>';
        this.canvas = document.getElementById('canvas-18');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const c = document.getElementById('viz-18');
        this.canvas.width = c.clientWidth;
        this.canvas.height = c.clientHeight || 300;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-18').textContent = "Ready.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.mst.length) {
            const e = this.mst[this.stepIdx];
            document.getElementById('status-18').textContent = `Added Edge ${e.u}-${e.v} (Weight: ${e.w})`;
            this.stepIdx++;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-18').textContent = "MST Complete (Cost: 16)";
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width, h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const getPos = (id) => { const n = this.nodes.find(x => x.id === id); return { x: n.x * w, y: n.y * h }; };
        
        const active = this.mst.slice(0, this.stepIdx);
        
        this.edges.forEach(e => {
            const p1 = getPos(e.u), p2 = getPos(e.v);
            const isActive = active.some(a => (a.u===e.u && a.v===e.v) || (a.u===e.v && a.v===e.u));
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = isActive ? '#00d4aa' : '#30363d';
            this.ctx.lineWidth = isActive ? 4 : 2;
            this.ctx.stroke();
            
            this.ctx.fillStyle = '#c9d1d9';
            this.ctx.font = '12px sans-serif';
            this.ctx.fillText(e.w, (p1.x+p2.x)/2, (p1.y+p2.y)/2 - 10);
        });
        
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            this.ctx.fillStyle = '#21262d';
            this.ctx.fill(); this.ctx.stroke();
            this.ctx.fillStyle = '#c9d1d9';
            this.ctx.font = '16px sans-serif'; this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// --- E19: LCS (DOM Table) ---
visualizations[19] = {
    s1: "ACADB",
    s2: "CBDA",
    dp: [
        [0,0,0,0,0],
        [0,0,0,0,1],
        [0,1,1,1,1],
        [0,1,1,1,2],
        [0,1,1,2,2],
        [0,1,2,2,2]
    ],
    r: 1, c: 1,
    autoTimer: null,
    init: function() { this.reset(); },
    reset: function() {
        this.r = 1; this.c = 1;
        document.getElementById('status-19').textContent = "Ready.";
        this.render();
    },
    step: function() {
        if (this.r <= 5) {
            document.getElementById('status-19').textContent = `Filling L[${this.r}][${this.c}] = ${this.dp[this.r][this.c]}`;
            this.c++;
            if (this.c > 4) { this.c = 1; this.r++; }
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-19').textContent = "LCS Found: 'CB' (Length 2)";
        }
    },
    render: function() {
        const c = document.getElementById('viz-19');
        if (!c) return;
        c.innerHTML = '<table style="margin: 0 auto; border-collapse: collapse; text-align:center;"></table>';
        const tbl = c.firstChild;
        const h1 = ["", "", "C", "B", "D", "A"];
        const h2 = ["", "A", "C", "A", "D", "B"];
        
        let tr = document.createElement('tr');
        h1.forEach(thText => {
            const th = document.createElement('th');
            th.textContent = thText;
            th.style.padding = '10px'; th.style.border = '1px solid #30363d'; th.style.background = '#161b22';
            tr.appendChild(th);
        });
        tbl.appendChild(tr);
        
        for (let i = 0; i < 6; i++) {
            tr = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = h2[i];
            th.style.padding = '10px'; th.style.border = '1px solid #30363d'; th.style.background = '#161b22';
            tr.appendChild(th);
            
            for (let j = 0; j < 5; j++) {
                const td = document.createElement('td');
                td.style.padding = '10px'; td.style.border = '1px solid #30363d';
                if (i === 0 || j === 0) {
                    td.textContent = 0; td.style.color = '#8b949e';
                } else if (i < this.r || (i === this.r && j < this.c)) {
                    td.textContent = this.dp[i][j];
                    if (i === this.r && j === this.c - 1) {
                        td.style.background = '#00d4aa'; td.style.color = '#0d1117';
                    } else {
                        td.style.color = '#c9d1d9';
                    }
                }
                tr.appendChild(td);
            }
            tbl.appendChild(tr);
        }
    }
};

// --- E20: Dijkstra (Canvas) ---
visualizations[20] = {
    nodes: [
        {id:0,x:0.1,y:0.5},{id:1,x:0.3,y:0.2},{id:2,x:0.5,y:0.2},{id:3,x:0.7,y:0.2},{id:4,x:0.9,y:0.5},
        {id:5,x:0.7,y:0.8},{id:6,x:0.5,y:0.8},{id:7,x:0.3,y:0.8},{id:8,x:0.5,y:0.5}
    ],
    edges: [
        {u:0,v:1,w:4},{u:0,v:7,w:8},{u:1,v:2,w:8},{u:1,v:7,w:11},{u:2,v:3,w:7},
        {u:2,v:8,w:2},{u:2,v:5,w:4},{u:3,v:4,w:9},{u:3,v:5,w:14},{u:4,v:5,w:10},
        {u:5,v:6,w:2},{u:6,v:7,w:1},{u:6,v:8,w:6},{u:7,v:8,w:7}
    ],
    steps: [
        {u:0, dists:[0,'∞','∞','∞','∞','∞','∞','∞','∞']},
        {u:1, dists:[0,4,'∞','∞','∞','∞','∞',8,'∞']},
        {u:7, dists:[0,4,12,'∞','∞','∞','∞',8,'∞']},
        {u:6, dists:[0,4,12,'∞','∞','∞',9,8,15]},
        {u:5, dists:[0,4,12,'∞','∞',11,9,8,15]}
    ],
    stepIdx: 0,
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const c = document.getElementById('viz-20');
        if (!c) return;
        c.innerHTML = '<canvas id="canvas-20"></canvas>';
        this.canvas = document.getElementById('canvas-20');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const c = document.getElementById('viz-20');
        this.canvas.width = c.clientWidth;
        this.canvas.height = c.clientHeight || 300;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-20').textContent = "Ready. (Source: 0)";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.steps.length - 1) {
            this.stepIdx++;
            document.getElementById('status-20').textContent = `Picked vertex ${this.steps[this.stepIdx].u} & relaxed edges.`;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-20').textContent = "Dijkstra Complete.";
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width, h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const getPos = (id) => { const n = this.nodes.find(x => x.id === id); return { x: n.x * w, y: n.y * h }; };
        
        this.ctx.strokeStyle = '#30363d';
        this.ctx.lineWidth = 2;
        this.edges.forEach(e => {
            const p1 = getPos(e.u), p2 = getPos(e.v);
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
            this.ctx.fillStyle = '#8b949e'; this.ctx.font = '10px sans-serif';
            this.ctx.fillText(e.w, (p1.x+p2.x)/2, (p1.y+p2.y)/2 - 5);
        });
        
        const currentData = this.steps[this.stepIdx];
        
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, 16, 0, 2*Math.PI);
            this.ctx.fillStyle = (n.id === currentData.u) ? '#00d4aa' : '#21262d';
            this.ctx.fill(); this.ctx.stroke();
            
            this.ctx.fillStyle = (n.id === currentData.u) ? '#0d1117' : '#c9d1d9';
            this.ctx.font = '12px sans-serif'; this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
            
            // Draw Distance
            this.ctx.fillStyle = '#d29922';
            this.ctx.font = '12px monospace';
            this.ctx.fillText(`[${currentData.dists[n.id]}]`, p.x, p.y - 25);
        });
    }
};

// --- E21: Floyd-Warshall (DOM Matrix) ---
visualizations[21] = {
    matrices: [
        [[0, 5, '∞', 10], ['∞', 0, 3, '∞'], ['∞', '∞', 0, 1], ['∞', '∞', '∞', 0]],
        [[0, 5, '∞', 10], ['∞', 0, 3, '∞'], ['∞', '∞', 0, 1], ['∞', '∞', '∞', 0]],
        [[0, 5, 8, 10], ['∞', 0, 3, '∞'], ['∞', '∞', 0, 1], ['∞', '∞', '∞', 0]],
        [[0, 5, 8, 9], ['∞', 0, 3, 4], ['∞', '∞', 0, 1], ['∞', '∞', '∞', 0]],
        [[0, 5, 8, 9], ['∞', 0, 3, 4], ['∞', '∞', 0, 1], ['∞', '∞', '∞', 0]]
    ],
    stepIdx: 0,
    autoTimer: null,
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-21').textContent = "Ready. (Initial Matrix)";
        this.render();
    },
    step: function() {
        if (this.stepIdx < this.matrices.length - 1) {
            this.stepIdx++;
            document.getElementById('status-21').textContent = `k = ${this.stepIdx} (Intermediate Vertices: 0 to ${this.stepIdx-1})`;
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-21').textContent = "All-Pairs Shortest Path Computed.";
        }
    },
    render: function() {
        const c = document.getElementById('viz-21');
        if (!c) return;
        c.innerHTML = '<table style="margin: 0 auto; border-collapse: collapse; text-align:center;"></table>';
        const tbl = c.firstChild;
        const mat = this.matrices[this.stepIdx];
        
        for (let i = 0; i < 4; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 4; j++) {
                const td = document.createElement('td');
                td.textContent = mat[i][j];
                td.style.padding = '15px 25px';
                td.style.border = '2px solid #30363d';
                td.style.background = '#161b22';
                td.style.color = (mat[i][j] !== '∞') ? '#00d4aa' : '#8b949e';
                td.style.fontWeight = 'bold';
                tr.appendChild(td);
            }
            tbl.appendChild(tr);
        }
    }
};

// --- E22: N-Queens (CSS Grid) ---
visualizations[22] = {
    steps: [
        { msg: "Start", qs: [] },
        { msg: "Place Q(0,0)", qs: [[0,0]] },
        { msg: "Place Q(1,2)", qs: [[0,0], [1,2]] },
        { msg: "Row 2: Backtrack!", qs: [[0,0], [1,2]], fail: true },
        { msg: "Place Q(0,1)", qs: [[0,1]] },
        { msg: "Place Q(1,3)", qs: [[0,1], [1,3]] },
        { msg: "Place Q(2,0)", qs: [[0,1], [1,3], [2,0]] },
        { msg: "Place Q(3,2)", qs: [[0,1], [1,3], [2,0], [3,2]] }
    ],
    stepIdx: 0,
    autoTimer: null,
    init: function() { this.reset(); },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-22').textContent = "Ready.";
        this.render();
    },
    step: function() {
        if (this.stepIdx < this.steps.length - 1) {
            this.stepIdx++;
            const s = this.steps[this.stepIdx];
            document.getElementById('status-22').textContent = s.msg;
            this.render();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-22').textContent = "Valid Configuration Found!";
        }
    },
    render: function() {
        const c = document.getElementById('viz-22');
        if (!c) return;
        c.innerHTML = '<div style="display:grid; grid-template-columns:repeat(4, 50px); grid-template-rows:repeat(4, 50px); gap:2px; justify-content:center; padding:20px 0;"></div>';
        const grid = c.firstChild;
        const s = this.steps[this.stepIdx];
        
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.style.background = (i+j)%2 === 0 ? '#30363d' : '#21262d';
                cell.style.display = 'flex';
                cell.style.alignItems = 'center';
                cell.style.justifyContent = 'center';
                cell.style.fontSize = '30px';
                
                const hasQ = s.qs.find(q => q[0]===i && q[1]===j);
                if (hasQ) {
                    cell.innerHTML = '&#9819;'; // Queen symbol
                    cell.style.color = s.fail && i === s.qs[s.qs.length-1][0] ? '#f85149' : '#00d4aa';
                }
                grid.appendChild(cell);
            }
        }
    }
};

// --- E23: Hamiltonian Cycle (Canvas) ---
visualizations[23] = {
    nodes: [
        {id:0, x:0.5, y:0.2}, {id:1, x:0.2, y:0.5}, {id:2, x:0.3, y:0.8}, 
        {id:3, x:0.8, y:0.5}, {id:4, x:0.7, y:0.8}
    ],
    edges: [
        [0,1], [0,3], [1,2], [1,3], [1,4], [2,4], [3,4]
    ],
    pathSteps: [
        [0], [0,1], [0,1,2], [0,1,2,4], [0,1,2,4,3], [0,1,2,4,3,0]
    ],
    stepIdx: 0,
    canvas: null,
    ctx: null,
    autoTimer: null,
    init: function() {
        const c = document.getElementById('viz-23');
        if (!c) return;
        c.innerHTML = '<canvas id="canvas-23"></canvas>';
        this.canvas = document.getElementById('canvas-23');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.reset();
    },
    resize: function() {
        const c = document.getElementById('viz-23');
        this.canvas.width = c.clientWidth;
        this.canvas.height = c.clientHeight || 300;
        this.draw();
    },
    reset: function() {
        this.stepIdx = 0;
        document.getElementById('status-23').textContent = "Ready.";
        this.draw();
    },
    step: function() {
        if (this.stepIdx < this.pathSteps.length - 1) {
            this.stepIdx++;
            document.getElementById('status-23').textContent = `Path: ${this.pathSteps[this.stepIdx].join(' -> ')}`;
            this.draw();
        } else {
            if (this.autoTimer) clearInterval(this.autoTimer);
            document.getElementById('status-23').textContent = "Hamiltonian Cycle Found!";
        }
    },
    draw: function() {
        if (!this.ctx) return;
        const w = this.canvas.width, h = this.canvas.height;
        this.ctx.clearRect(0, 0, w, h);
        const getPos = (id) => { const n = this.nodes.find(x => x.id === id); return { x: n.x * w, y: n.y * h }; };
        
        const path = this.pathSteps[this.stepIdx];
        
        // Draw all edges faded
        this.ctx.strokeStyle = '#30363d';
        this.ctx.lineWidth = 2;
        this.edges.forEach(e => {
            const p1 = getPos(e[0]), p2 = getPos(e[1]);
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
        });
        
        // Draw active path edges
        this.ctx.strokeStyle = '#00d4aa';
        this.ctx.lineWidth = 4;
        for (let i = 0; i < path.length - 1; i++) {
            const p1 = getPos(path[i]), p2 = getPos(path[i+1]);
            this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.stroke();
        }
        
        // Draw nodes
        this.nodes.forEach(n => {
            const p = getPos(n.id);
            this.ctx.beginPath(); this.ctx.arc(p.x, p.y, 20, 0, 2*Math.PI);
            this.ctx.fillStyle = path.includes(n.id) ? '#00d4aa' : '#21262d';
            this.ctx.fill();
            this.ctx.strokeStyle = '#30363d'; this.ctx.lineWidth = 2; this.ctx.stroke();
            this.ctx.fillStyle = path.includes(n.id) ? '#0d1117' : '#c9d1d9';
            this.ctx.font = '16px sans-serif'; this.ctx.textAlign = 'center'; this.ctx.textBaseline = 'middle';
            this.ctx.fillText(n.id, p.x, p.y);
        });
    }
};

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize all visualizations
    for (let i = 1; i <= 23; i++) {
        if (visualizations[i] && visualizations[i].init) {
            visualizations[i].init();
        }
    }

    // 2. IntersectionObserver for scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navTabs = document.getElementById('nav-tabs');
    if (mobileToggle && navTabs) {
        mobileToggle.addEventListener('click', () => {
            navTabs.classList.toggle('open');
        });
    }
});
