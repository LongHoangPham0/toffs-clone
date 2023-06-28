import i18n from "../../i18n";

export const DataLanguages = () => {
    return [
        {
            key: "en-SG",
            value: i18n.t("language.english")
        },
        {
            key: "zh-CN",
            value: i18n.t("language.simplified_chinese")
        },
        {
            key: 'ms-MY',
            value: i18n.t("language.malay")
        },
        {
            key: "vi-VN",
            value: i18n.t("language.vietnamese")
        }
    ]
}