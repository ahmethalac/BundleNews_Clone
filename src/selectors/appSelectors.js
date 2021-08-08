export const appSelector = state => state.app;
export const colorSchemeSelector = state => state?.app?.colorScheme || 'light';
export const languageSelector = state => state?.app?.language || 'en';
export const layoutSelector = state => state?.app?.layout || 'grid';
