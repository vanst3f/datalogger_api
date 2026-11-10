import { InMemoryDatabase } from "./repository/inMemoryDatabase.js";
import { readingsDatabase } from "./repository/readingsDatabase.js";
import type { Label } from "./domain/types.js";

export const labelsDb = new InMemoryDatabase<Label>();
export const readingsDb = new readingsDatabase();
