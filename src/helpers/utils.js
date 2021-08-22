import { Platform, Share } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { BACKGROUND_FETCH_TASK, FETCH_TASK_INTERVAL } from '../constants/others';

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

export async function registerFetchTask(
    taskname = BACKGROUND_FETCH_TASK,
    interval = FETCH_TASK_INTERVAL
) {
    const status = await BackgroundFetch.getStatusAsync();
    switch (status) {
        case BackgroundFetch.Status.Restricted:
        case BackgroundFetch.Status.Denied:
            console.log('Background execution is disabled');
            return;

        default: {
            console.debug('Background execution allowed');

            let tasks = await TaskManager.getRegisteredTasksAsync();
            if (tasks.find(f => f.taskName === taskname) == null) {
                console.log('Registering task');
                await BackgroundFetch.registerTaskAsync(taskname);

                tasks = await TaskManager.getRegisteredTasksAsync();
                console.debug('Registered tasks', tasks);
            } else {
                console.log(`Task ${taskname} already registered, skipping`);
            }

            console.log('Setting interval to', interval);
            await BackgroundFetch.setMinimumIntervalAsync(interval);
        }
    }
}
