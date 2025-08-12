/* eslint-disable simple-header/header */

import { Link } from "@components/Link";
import { Margins } from "@utils/margins";
import { Alerts, Button, Forms, Toasts } from "@webpack/common";

import { cl } from "../../utils";

const AppIconButton = ({ id, name, url, author }: { id: string; name: string; url: string; author?: { url: string; name: string; }; }) => <Button color={Button.Colors.TRANSPARENT} onClick={() => {
    Alerts.show({
        title: "Change app icon",
        body: <>
            <img src={url} className={cl("icon-preview")} />
            <Forms.FormText className={Margins.top8}>You are about to change the app icon to the <strong>{name}</strong> icon.</Forms.FormText>
            {author && <Forms.FormText className={Margins.top8}>This icon was made by <Link href={
                author.url
            }>{author.name}</Link>, huge thanks to them.</Forms.FormText>}
            <Forms.FormText className={Margins.top8}>Would you like to continue?</Forms.FormText>
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
}}>{name}</Button>;

const icons: {
    id: string; name: string; author?: {
        name: string; url: string;
    }; url: string;
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
