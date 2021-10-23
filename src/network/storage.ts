import type { StorageKind, StorageSync, StorageLocal } from "../types/storage"

export const getStorage = <
  KS extends keyof StorageSync,
  KL extends keyof StorageLocal
>(
  // 分割代入すると callback がうまく推論されない
  params:
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
  if (params.kind === "sync") {
    chrome.storage.sync.get(params.keys, (storage: Partial<StorageSync>) => {
      params.callback(storage)
    })
  } else {
    chrome.storage.local.get(params.keys, (storage: Partial<StorageLocal>) => {
      params.callback(storage)
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

export const onStorageChanged = ({
  kind,
  callback,
}:
  | {
      kind: Extract<StorageKind, "sync">
      callback: (
        changed: Partial<{
          [key in keyof StorageSync]: {
            newValue?: boolean
            oldValue?: boolean
          }
        }>
      ) => void
    }
  | {
      kind: Extract<StorageKind, "local">
      callback: (
        changed: Partial<{
          [key in keyof StorageSync]: {
            newValue?: boolean
            oldValue?: boolean
          }
        }>
      ) => void
    }): void => {
  chrome.storage.onChanged.addListener((changed, changedKind) => {
    if (changedKind === kind) {
      callback(changed)
    }
  })
}
