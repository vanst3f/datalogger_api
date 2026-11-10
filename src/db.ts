import { InMemoryDatabase } from "./repository/inMemoryDatabase.js";
import type { Label, Reading } from "./domain/types.js";

export const labelsDb = new InMemoryDatabase<Label>();
export const readingsDb = new InMemoryDatabase<Reading>();
