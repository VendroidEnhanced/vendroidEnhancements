/* eslint-disable simple-header/header */

import { BaseText } from "@components/BaseText";
import { Button } from "@components/Button";
import { Link } from "@components/Link";
import { Margins } from "@utils/margins";
import { Alerts, Toasts } from "@webpack/common";

import { cl } from "../../utils";
import { Author } from "../types";

const AppIconButton = ({ id, name, url, author }: { id: string; name: string; url: string; author?: { url: string; name: string; }; }) => (
    <Button variant="secondary" onClick={() => {
        Alerts.show({
            title: "Change app icon",
            body: <>
                <img alt="app-icon-image" src={url} className={cl("icon-preview")} />
                <BaseText tag="p" size="sm" className={Margins.top8}>
                    You are about to change the app icon to the <strong>{name}</strong> icon.
                </BaseText>
                {author && <BaseText tag="p" size="sm" className={Margins.top8}>
                    This icon was made by <Link href={author.url}>{author.name}</Link>, huge thanks to them.
                </BaseText>}
                <BaseText tag="p" size="sm" className={Margins.top8}>
                    Would you like to continue?
                </BaseText>
            </>,
            confirmText: "Yes",
            cancelText: "No",
            onConfirm: () => {
                window.VencordMobileNative.changeAppIcon(id);
                Toasts.show({
                    type: Toasts.Type.SUCCESS,
                    message: "App icon changed",
                    id: Toasts.genId(),
                    options: {
                        position: Toasts.Position.BOTTOM
                    }
                });
            }
        });
    }}>
        {name}
    </Button>
);

const icons: {
    id: string; name: string; author?: Author; url: string;
}[] = [
        {
            id: "Main",
            name: "Default",
            url: "https://raw.githubusercontent.com/VendroidEnhanced/random-files/refs/heads/main/ic_launcher-playstore.png"
        },
        {
            id: "Discord",
            name: "Discord colors",
            url: "https://raw.githubusercontent.com/VendroidEnhanced/random-files/refs/heads/main/ic_launcher_discordD-playstore.png"
        },
        {
            id: "Jolly",
            name: "Christmas",
            url: "https://raw.githubusercontent.com/VendroidEnhanced/random-files/refs/heads/main/ic_launcher_jolly-playstore.png"
        },
        {
            id: "Retro",
            name: "Retro",
            url: "https://raw.githubusercontent.com/VendroidEnhanced/random-files/refs/heads/main/ic_launcher_retro-playstore.png",
            author: {
                name: "CrimsonFork",
                url: "https://github.com/CrimsonFork"
            }
        },
        {
            id: "TS12",
            name: "The Life of a VDE",
            url: "https://raw.githubusercontent.com/VendroidEnhanced/random-files/refs/heads/main/swifties.png"
        }
    ];

export function AppIconPicker() {
    return <div className="vde-button-grid">
        {icons.map(icon => <AppIconButton {...icon} key={icon.id} />)}
    </div>;
}
