export type DbRecord = Record<string, unknown>;

export interface CreateDbOptions {
  file?: string;
  idKey?: string;
  pretty?: number;
  createIfMissing?: boolean;
}

export interface JsonDb<T extends DbRecord = DbRecord> {
  filePath: string;
  all(): T[];
  find(query: Partial<T>): T[];
  find(query: (entry: T) => boolean): T[];
  getById(id: unknown): T | null;
  insert(entry: T): T;
  upsert(entry: T): T;
  updateById(id: unknown, patch: Partial<T>): T | null;
  replaceById(id: unknown, entry: T): T | null;
  removeById(id: unknown): boolean;
  clear(): [];
}

export function createDb<T extends DbRecord = DbRecord>(
  options?: CreateDbOptions
): JsonDb<T>;