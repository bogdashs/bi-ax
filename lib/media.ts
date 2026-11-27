const DB_NAME = "biax-media";
const STORE = "files";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function putMedia(file: File): Promise<string> {
  const db = await openDb();
  const key = `m${Date.now()}${Math.random().toString(36).slice(2, 6)}`;

  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(file, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });

  db.close();
  return `idb:${key}`;
}

export async function getMediaBlob(ref: string): Promise<Blob | null> {
  if (!ref.startsWith("idb:")) return null;

  const db = await openDb();
  const blob = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(ref.slice(4));
    request.onsuccess = () => resolve((request.result as Blob) ?? null);
    request.onerror = () => reject(request.error);
  });

  db.close();
  return blob;
}

export async function deleteMedia(ref: string): Promise<void> {
  if (!ref.startsWith("idb:")) return;

  const db = await openDb();
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(ref.slice(4));
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
  db.close();
}

export function isUploaded(ref: string): boolean {
  return ref.startsWith("idb:");
}

export function guessMediaType(file: File): "video" | "image" {
  return file.type.startsWith("video/") ? "video" : "image";
}

export function checkFileSize(file: File, maxMb: number): string | null {
  const mb = file.size / (1024 * 1024);
  if (mb > maxMb) return `file is ${mb.toFixed(1)} MB, max is ${maxMb} MB`;
  return null;
}
