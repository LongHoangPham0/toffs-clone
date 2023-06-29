import i18n from "../i18n"


export const GetCurrentLanguage = () => {
  return i18n.language.split("-")[0] || "en"
}