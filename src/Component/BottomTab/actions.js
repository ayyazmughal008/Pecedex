import { StackActions, NavigationActions } from "react-navigation";
export const HomeAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

export const profileAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'ProfileScreen' })],
});
export const settingAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'SettingScreen' })],
});
export const mapAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'MapScreen' })],
});
export const notificationAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'NotificationScreen' })],
});