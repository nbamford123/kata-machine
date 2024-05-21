export default class MinHeap {
    private heap: number[];
    public length: number;

    constructor() {
        this.heap = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.length++;
        this.heap[this.length] = value;
        this.heapifyup(this.heap.length - 1);
    }

    leftChild = (pos: number): number => 2 * pos + 1;
    rightChild = (pos: number): number => 2 * pos + 2;
    parent = (pos: number): number => Math.floor((pos + 1) / 2);

    heapifyup(idx: number) {
        if (idx === 0) return;
        const val = this.heap[idx];
        const parent = this.parent(idx);
        if (this.heap[parent] > val) {
            // Swap
            this.heap[idx] = this.heap[parent];
            this.heap[parent] = val;
            this.heapifyup(parent);
        }
    }
    heapifydown(pos: number) {
        if (pos >= this.length) return;
        const left = this.leftChild(pos);
        const right = this.rightChild(pos);

        if (left >= this.length - 1) return;
        
        let smallest = this.heap[left];
        if (right < this.length)
            smallest = this.heap[right] < this.heap[left] ? right : left;

        const val = this.heap[pos];
        if (val > this.heap[smallest]) {
            //swap
            this.heap[pos] = this.heap[smallest];
            this.heap[smallest] = val;
            this.heapifydown(smallest);
        }
    }

    delete(): number {
        const val = this.heap[0];
        this.length--;
        this.heap[0] = this.heap[this.length];
        this.heap[this.heap.length - 1] = this.heap[0];
        this.heap[0] = newRoot;
        this.heapifydown(0);
        return val || -1;
    }
}
