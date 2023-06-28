import { useSelector } from "react-redux"
import { whiteLabelSelector } from "../../../../../selectors/c4/whiteLabelSelector"
import { DEFAULT_URL } from "../../../../../config/constants"
import i18next from 'i18next'

const HeaderComponent = () => {
  const whiteLabel = useSelector(whiteLabelSelector)

  return (
    <header className="app-header">
      <a href={DEFAULT_URL}>
        <img
          // src={i18next.language==="zh-CN" || i18next.language==="zh-cn"?logoCn:logo}
          src={whiteLabel.data?.logo}
          alt="toffstech-logo"
          className={i18next.language==="zh-CN" || i18next.language==="zh-cn"?"toffs-logo-cn":"toffs-logo"}
        />
      </a>
    </header>
  )
}

export default HeaderComponent