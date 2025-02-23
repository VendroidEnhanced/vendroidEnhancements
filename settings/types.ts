/* eslint-disable simple-header/header */

interface BaseSetting {
    type: "string" | "select" | "toggle" | "component";
    label: string;
    description: string;
}

interface StringSetting extends BaseSetting {
    type: "string";
    defaultValue?: string;
    placeholder: string;
}

interface SelectSetting extends BaseSetting {
    type: "select";
    options: {
        key: string;
        label: string;
    }[];
    defaultValue?: string;
}

interface ToggleSetting extends BaseSetting {
    type: "toggle";
    defaultValue?: boolean;
}

interface ComponentSetting extends BaseSetting {
    type: "component";
    component: React.ComponentType;
}

export type Setting = StringSetting | SelectSetting | ToggleSetting | ComponentSetting;

export interface Settings {
    [key: string]: {
        [key: string]: Setting;
    }
}

