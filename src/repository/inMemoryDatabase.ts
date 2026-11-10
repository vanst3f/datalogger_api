type WithId<T> = T & { id: number };

export class InMemoryDatabase<T> {
  protected storage: Map<number, WithId<T>> = new Map();
  private currentId = 1;

  save(item: T): T {
    const id = this.currentId++;
    const itemWithId: WithId<T> = { id, ...item };

    this.storage.set(id, itemWithId);
    return itemWithId;
  }

  saveMany(items: T[]): T[] {
    return items.map((item) => this.save(item));
  }

  getById(id: number): T | undefined {
    return this.storage.get(id);
  }

  delete(id: number): boolean {
    return this.storage.delete(id);
  }

  deleteAll(): void {
    return this.storage.clear();
  }
}
