export {}
declare global {
    export interface Array<T> {
        chunked(chunkSize: number): Array<Array<T>>;
    }
}
// eslint-disable-next-line
Array.prototype.chunked = function (chunkSize: number) {
    const subArrayCount = this.length / chunkSize;
    const res = [];
    for (let i = 0; i < subArrayCount; i++) {
        const from = chunkSize * i;
        const to = (chunkSize * (1 + i));
        const sliced = this.slice(from, to);
        res.push(sliced);
    }
    return res;
}

