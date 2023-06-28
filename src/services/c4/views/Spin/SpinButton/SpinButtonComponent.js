import { useState, useImperativeHandle, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { getNotificationSelector } from '../../../../../selectors/c4/spinSelector';

const SpinButtonComponent = forwardRef((props, ref) => {
  const notification = useSelector(getNotificationSelector)
  const { title, icon, btnClassName, type, disabled, id, onClickButton, defaultLoadingClick, isSpin, ...other } = props
  const [isLoading, setIsLoading] = useState(false)

  const click = () => {
    setIsLoading(defaultLoadingClick)
    _.isFunction(onClickButton) && onClickButton()
  }

  useImperativeHandle(ref, () => ({
    toggleSpin: (flag = false) => {
      setIsLoading(flag)
    },
    isLoading: isLoading
  }), [isLoading])

  useEffect(() => {
    !_.isEmpty(notification.type) && setIsLoading(false)
  }, [notification])

  useEffect(() => {
    isSpin !== null && setIsLoading(isSpin)
  }, [isSpin])

  const renderIcon = () => {
    if (isLoading) {
      return <i className={classnames("fad fa-spinner fa-pulse fa-sm", {"me-1": !_.isEmpty(title)})} />
    }
    return icon
  }

  return (
    <>
      {
        _.isFunction(onClickButton) ?
          <button
            id={id}
            ref={ref}
            type={type}
            className={btnClassName}
            disabled={isLoading || disabled}
            onClick={(e) => click(e)}
            {...other}
          >
            {renderIcon()}
            {
               !_.isEmpty(title) && <>{title}</>
            }
          </button>
          :
          <button
            id={id}
            ref={ref}
            type={type}
            className={btnClassName}
            disabled={isLoading || disabled}
            {...other}
          >
              {renderIcon()}
              {
                  !_.isEmpty(title) && <>{title}</>
              }
          </button>
      }
    </>
  )
})