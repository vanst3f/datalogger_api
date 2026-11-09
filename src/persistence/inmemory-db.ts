import type { Label } from "../domain/types.js";
import { randomUUID } from "node:crypto";

type WithId<T> = T & { id: string };

export class InMemoryDatabase<T> {
  private storage: Map<string, WithId<T>> = new Map();

  save(item: T): T {
    const id = randomUUID();
    const itemWithId: WithId<T> = { ...item, id };

    this.storage.set(id, itemWithId);
    return item;
  }

  saveMany(items: T[]): T[] {
    return items.map((item) => this.save(item));
  }

  getById(id: string): T | undefined {
    return this.storage.get(id);
  }

  delete(id: string): boolean {
    return this.storage.delete(id);
  }

  deleteAll(): void {
    return this.storage.clear();
  }
}
