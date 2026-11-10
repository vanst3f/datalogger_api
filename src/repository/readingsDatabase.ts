import type { Reading } from "../domain/types.js";
import { InMemoryDatabase } from "./inMemoryDatabase.js";

type ReadingWithLabelId = Reading & { id: number; labelId: number };
export class readingsDatabase extends InMemoryDatabase<Reading> {
  getAllById(labelId: number): ReadingWithLabelId[] {
    return Array.from(this.storage.values())
      .map((reading) => ({
        labelId,
        ...reading,
      }))
      .filter((reading) => reading.labelId === labelId);
  }
}
