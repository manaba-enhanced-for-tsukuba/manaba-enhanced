import type { StorageKind, StorageSync, StorageLocal } from "../types/storage"

export const getStorage = <
  KS extends keyof StorageSync,
  KL extends keyof StorageLocal
>(
  // 分割代入すると callback がうまく推論されない
  args:
    | {
        kind: Extract<StorageKind, "sync">
        keys: KS | KS[] | null
        callback: (storage: Partial<StorageSync>) => void
      }
    | {
        kind: Extract<StorageKind, "local">
        keys: KL | KL[] | null
        callback: (storage: Partial<StorageLocal>) => void
      }
): void => {
  if (args.kind === "sync") {
    chrome.storage.sync.get(args.keys, (storage: Partial<StorageSync>) => {
      args.callback(storage)
    })
  } else {
    chrome.storage.local.get(args.keys, (storage: Partial<StorageLocal>) => {
      args.callback(storage)
    })
  }
}

export const setStorage = ({
  kind,
  items,
  callback,
}:
  | {
      kind: Extract<StorageKind, "sync">
      items: Partial<StorageSync>
      callback?: () => void
    }
  | {
      kind: Extract<StorageKind, "local">
      items: Partial<StorageLocal>
      callback?: () => void
    }): void => {
  if (kind === "sync") {
    chrome.storage.sync.set(items, callback)
  } else {
    chrome.storage.local.set(items, callback)
  }
}
