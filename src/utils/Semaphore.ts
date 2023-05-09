export class Semaphore {
  value: number;
  queue: (() => void)[];

  constructor(value: number) {
    this.value = value;
    this.queue = [];
  }

  async acquire() {
    if (this.value > 0) {
      this.value--;
    } else {
      await new Promise<void>(resolve => this.queue.push(resolve));
    }
  }

  release() {
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      if (resolve) {
        resolve();
      }
    } else {
      this.value++;
    }
  }
}
