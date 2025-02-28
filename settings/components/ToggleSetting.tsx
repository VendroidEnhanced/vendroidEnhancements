/* eslint-disable simple-header/header */

import { Switch, useState } from "@webpack/common";

import { Setting } from "../types";

export function ToggleSetting({ id, setting }: {
    id: string;
    setting: Setting;
}) {
    if(setting.type !== "toggle") throw new Error("Invalid setting type");

    const [value, setValue] = useState(window.VencordMobileNative.getBool(id, setting.defaultValue));

    return (
        <Switch
            note={setting.description || null}
            value={value}
            onChange={v => {
                setValue(v);
                window.VencordMobileNative.setBool(id, v);
            }}
        >
            {setting.label}
        </Switch>
    );
}
