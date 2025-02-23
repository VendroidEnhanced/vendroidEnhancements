/* eslint-disable simple-header/header */

import { classNameFactory } from "@api/Styles";

export function isDev(id) {
    const devs: string[] = ["886685857560539176", "259558259491340288", "1230555039475568640"];
    return devs.includes(id);
}
export const VENCORD_SUPPORT_ID = "1026515880080842772";
export const EQUICORD_SUPPORT_ID = "1297590739911573585";

export const cl = classNameFactory("vde-");
