/* eslint-disable simple-header/header */

import { ComponentSetting } from "./components/ComponentSetting";
import { SelectSetting } from "./components/SelectSetting";
import { StringSetting } from "./components/StringSetting";
import { ToggleSetting } from "./components/ToggleSetting";
import { Setting } from "./types";

export function generateOptions(settings: {
    [key: string]: Setting;
}) {
    return Object.entries(settings).map(([key, setting]) => {
        switch(setting.type) {
            case "toggle": {
                return <ToggleSetting id={key} setting={setting} />;
            }
            case "string": {
                return <StringSetting id={key} setting={setting} />;
            }
            case "select": {
                return <SelectSetting id={key} setting={setting} />;
            }
            case "component": {
                return <ComponentSetting setting={setting} />;
            }
        }
    });
}
