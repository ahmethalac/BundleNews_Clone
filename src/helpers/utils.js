import { Platform, Share } from 'react-native';

export const onShare = async ({ message, type }) => {
    const customPayload = Platform.OS === 'ios' && type === 'url' ? { url: message } : { message };
    const result = await Share.share(customPayload);
    return result;
};

export const safeJSONParse = (str, defVal) => {
    if (str) {
        try {
            return JSON.parse(str);
        } catch {
            return defVal ?? str;
        }
    } else {
        return defVal ?? str;
    }
};
