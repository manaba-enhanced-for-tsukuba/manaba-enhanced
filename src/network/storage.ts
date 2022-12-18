import type { StorageKind, StorageSync, StorageLocal } from "../types/storage"

export function getStorage<K extends keyof StorageSync>(params: {
  kind: "sync"
  keys: K
  callback: (storage: Partial<Pick<StorageSync, K>>) => void
}): void
export function getStorage<K extends Array<keyof StorageSync>>(params: {
  kind: "sync"
  keys: K
  callback: (storage: Partial<Pick<StorageSync, K[number]>>) => void
}): void
export function getStorage(params: {
  kind: "sync"
  keys: null
  callback: (storage: Partial<StorageSync>) => void
}): void
export function getStorage<K extends keyof StorageLocal>(params: {
  kind: "local"
  keys: K
  callback: (storage: Partial<Pick<StorageLocal, K>>) => void
}): void
export function getStorage<K extends Array<keyof StorageLocal>>(params: {
  kind: "local"
  keys: K
  callback: (storage: Partial<Pick<StorageLocal, K[number]>>) => void
}): void
export function getStorage(params: {
  kind: "local"
  keys: null
  callback: (storage: Partial<StorageLocal>) => void
}): void
export function getStorage<
  KS extends keyof StorageSync,
  KL extends keyof StorageLocal
>(
  params:
    | {
        kind: "sync"
        keys: KS | KS[] | null
        callback: (storage: Partial<StorageSync>) => void
      }
    | {
        kind: "local"
        keys: KL | KL[] | null
        callback: (storage: Partial<StorageLocal>) => void
      }
): void {
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

export function setStorage<T extends StorageSync>(params: {
  kind: "sync"
  items: T
  callback?: () => void
}): void
export function setStorage<T extends StorageLocal>(params: {
  kind: "local"
  items: T
  callback?: () => void
}): void
export function setStorage(
  params:
    | {
        kind: "sync"
        items: Partial<StorageSync>
        callback?: () => void
      }
    | {
        kind: "local"
        items: Partial<StorageLocal>
        callback?: () => void
      }
): void {
  chrome.storage[params.kind].set(params.items, params.callback)
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

export const getBytesInUse = ({
  kind,
}: {
  kind: StorageKind
}): Promise<number> =>
  new Promise((resolve) => {
    if (kind === "sync") {
      chrome.storage.sync.getBytesInUse(resolve)
    }
    chrome.storage.local.getBytesInUse(resolve)
  })
