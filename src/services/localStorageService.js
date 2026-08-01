const STORAGE_PREFIX = 'seo_settings_';

export const getFromStorage = (pageId) => {
    const data = localStorage.getItem(`${STORAGE_PREFIX}${pageId}`);
    return data ? JSON.parse(data) : null;
};

export const saveToStorage = (pageId, data) => {
    const record = { ...data, id: pageId, _local: true, _updatedAt: Date.now() };
    localStorage.setItem(`${STORAGE_PREFIX}${pageId}`, JSON.stringify(record));
    return record;
};

export const updateInStorage = (pageId, data) => {
    const existing = getFromStorage(pageId) || {};
    const record = { ...existing, ...data, id: pageId, _local: true, _updatedAt: Date.now() };
    localStorage.setItem(`${STORAGE_PREFIX}${pageId}`, JSON.stringify(record));
    return record;
};

export const deleteFromStorage = (pageId) => {
    localStorage.removeItem(`${STORAGE_PREFIX}${pageId}`);
};

export const getAllPages = () => {
    const pages = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(STORAGE_PREFIX)) {
            const pageId = key.slice(STORAGE_PREFIX.length);
            try {
                const data = JSON.parse(localStorage.getItem(key));
                pages.push({
                    id: pageId,
                    metaTitle: data.metaTitle || 'Untitled',
                    updatedAt: data._updatedAt || 0,
                });
            } catch {
                pages.push({ id: pageId, metaTitle: 'Untitled', updatedAt: 0 });
            }
        }
    }
    return pages.sort((a, b) => b.updatedAt - a.updatedAt);
};
