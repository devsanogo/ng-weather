import { CONSTANTS } from "app/core/models/constant";

export const __getIcon = (id: number): string => {
    let iconName = '';
    const iconsWeatherMap = new Map([
        [[200, 232], CONSTANTS.ICON_URL + "art_storm.png"],
        [[501, 511], CONSTANTS.ICON_URL + "art_rain.png"],
        [[520, 531], CONSTANTS.ICON_URL + "art_light_rain.png"],
        [[500], CONSTANTS.ICON_URL + "art_light_rain.png"],
        [[600, 622], CONSTANTS.ICON_URL + "art_snow.png"],
        [[801, 804], CONSTANTS.ICON_URL + "art_clouds.png"],
        [[741, 761], CONSTANTS.ICON_URL + "art_fog.png"],
    ]);

    for (let [key, value] of iconsWeatherMap.entries()) {
        if (inRange(id, key[0], key[1]) || id === key[0]) {
            iconName = value;
            break;
        }
    }

    return iconName;
}

const inRange = (nb: number, min: number, max: number): boolean => {
    return nb >= min && nb <= max;
}