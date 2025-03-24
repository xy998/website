/** The storage type */
type StorageType = 'local' | 'session';

function createStorage<T extends object>(type: StorageType, storagePrefix: string) {
  // 检查是否在浏览器环境中
  if (typeof window === 'undefined') {
    // 在服务器端返回一个空对象或提供默认实现
    return {
      set<K extends keyof T>(key: K, value: T[K]) {},
      get<K extends keyof T>(key: K): T[K] | null {
        return null;
      },
      remove(key: keyof T) {},
      clear() {}
    };
  }

  const stg = type === 'session' ? window.sessionStorage : window.localStorage;

  const storage = {
    /**
     * Set session
     *
     * @param key Session key
     * @param value Session value
     */
    set<K extends keyof T>(key: K, value: T[K]) {
      const json = JSON.stringify(value);

      stg.setItem(`${storagePrefix}${key as string}`, json);
    },
    /**
     * Get session
     *
     * @param key Session key
     */
    get<K extends keyof T>(key: K): T[K] | null {
      const json = stg.getItem(`${storagePrefix}${key as string}`);
      if (json) {
        let storageData: T[K] | null = null;

        try {
          storageData = JSON.parse(json);
        } catch {}

        if (storageData) {
          return storageData as T[K];
        }
      }

      stg.removeItem(`${storagePrefix}${key as string}`);

      return null;
    },
    remove(key: keyof T) {
      stg.removeItem(`${storagePrefix}${key as string}`);
    },
    clear() {
      stg.clear();
    }
  };
  return storage;
}

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || '';

// 使用字符串字面量代替 StorageType.Local 和 StorageType.Session
export const localStg = createStorage<StorageType.Local>('local', storagePrefix);
export const sessionStg = createStorage<StorageType.Session>('session', storagePrefix);