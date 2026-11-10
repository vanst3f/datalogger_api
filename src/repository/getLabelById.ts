import { labelsDb } from "../db.js";

import type { Label } from "../domain/types.js";

export async function getLabelById(id: number): Promise<Label | undefined> {
  return labelsDb.getById(id);
}
