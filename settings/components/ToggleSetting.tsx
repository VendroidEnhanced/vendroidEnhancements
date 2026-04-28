/* eslint-disable simple-header/header */

import { FormSwitch } from "@components/FormSwitch";
import { useState } from "@webpack/common";

import { Setting } from "../types";

export function ToggleSetting({ id, setting }: {
    id: string;
    setting: Setting;
}) {
    if (setting.type !== "toggle") throw new Error("Invalid setting type");

    const [value, setValue] = useState(window.VencordMobileNative.getBool(id, setting.defaultValue));

    return (
        <FormSwitch
            title={setting.label}
            description={setting.description || null}
            value={value}
            onChange={v => {
                setValue(v);
                window.VencordMobileNative.setBool(id, v);
            }}
        >
        </FormSwitch>
    );
}
