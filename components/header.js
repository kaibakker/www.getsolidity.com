// Packages
import PropTypes from 'prop-types'
import React from 'react'
import Link from 'next/link'
// import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

// Components
import Logo from './icons/logo'
import Arrow from './arrow'
import Avatar from './avatar'
import AvatarPopOverLink from './avatar-popover-link'

// Utilities
import logout from '../lib/logout'

// persists the chat count across different
// instances of Header on the client side
let chatCount = null
let chatData = null

class Header extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onLogout = this.onLogout.bind(this)
    const section = props.pathname
      .split('/')
      .slice(0, 2)
      .join('/')
    this.state = {
      section,
      logoutError: false,
      logoutErrorCode: null,
      chatCount:
        props.chatCount == null ? chatCount : (chatCount = props.chatCount)
    }
    this.chatCountTimer = null
    this.onVisibilityChange = this.onVisibilityChange.bind(this)
  }

  componentDidMount() {
    if (chatData && this.props.onChatCountUpdate) {
      this.props.onChatCountUpdate(chatData)
    }
    if (!this.props.lean) {
      this.scheduleChatCountUpdate(true)
      document.addEventListener('visibilitychange', this.onVisibilityChange)
    }
  }

  onVisibilityChange() {
    if (document.visibilityState === 'visible') {
      this.scheduleChatCountUpdate()
    } else {
      this.cancelChatCountUpdates()
    }
  }

  cancelChatCountUpdates() {
    clearTimeout(this.chatCountTimer)
    this.chatCountTimer = null
  }

  componentWillUnmount() {
    this.cancelChatCountUpdates()
  }

  scheduleChatCountUpdate(instant = false) {
    if (this.chatCountTimer !== null) return
    this.chatCountTimer = setTimeout(() => {
      fetch('https://zeit-slackin.now.sh/data')
        .then(res => {
          // canceled?
          if (this.chatCountTimer === null) return
          return res.json().then(data => {
            chatCount = data.active
            chatData = data
            // canceled?
            if (this.chatCountTimer === null) return
            this.setState({ chatCount: data.active })
            this.chatCountTimer = null
            if (this.props.onChatCountUpdate) {
              this.props.onChatCountUpdate(data)
            }
            if (document.visibilityState === 'visible') {
              this.scheduleChatCountUpdate()
            }
          })
        })
        .catch(() => {
          this.chatCountTimer = null
          if (document.visibilityState === 'visible') {
            this.scheduleChatCountUpdate()
          }
        })
    }, instant ? 0 : 10000)
  }

  onLogout() {
    if (this.state.loggingOut) return
    this.setState({
      loggingOut: true,
      logoutError: false,
      logoutErrorCode: null
    })
    logout()
      .then(() => {
        this.setState({ loggingOut: false })
        this.props.onLogout && this.props.onLogout()
      })
      .catch(err => {
        this.setState({
          loggingOut: false,
          logoutError: true,
          logoutErrorCode: err.code
        })
      })
  }

  onLogoRightClick = event => {
    if (this.props.onLogoRightClick) {
      event.preventDefault()
      this.props.onLogoRightClick()
    }
  }

  onLogoMouseEnter = () => {
    // Router.prefetch('/logos')
  }

  render() {
    const { lean, currentTeamSlug, clean, user, pathname } = this.props
    const { darkBg } = this.context
    const { section } = this.state

    let pricingLinkProps = {
      href: '/pricing'
    }

    if (user) {
      pricingLinkProps.href = '/account/plan'

      if (currentTeamSlug) {
        pricingLinkProps.href = `/teams/settings/plan?teamSlug=${currentTeamSlug}`
        pricingLinkProps.as = `/teams/${currentTeamSlug}/settings/plan`
      }
    }

    let pricingIsActive = false
    const currentPath = pathname.split('/').pop()

    if (section === '/pricing' || currentPath === 'plan') {
      pricingIsActive = true
    }

    return (
      <div
        className={`
        ${lean ? 'lean' : ''}
        ${darkBg ? 'dark' : ''}
      `}
      >
        {this.state.logoutError && (
          <div className="logout-error">
            An error occurred while logging out ({this.state.logoutErrorCode})
          </div>
        )}

        <header className={clean ? 'clean' : null}>

          <div
            className="menu-arrow purple"
            onClick={event => {
              event.currentTarget.classList.toggle('toggled')
              this.setState({ responsive: !this.state.responsive })
            }}
          >
            {!clean ? this.props.pathname : null}
            {!clean ? <Arrow /> : null}
          </div>
          <div
            className={
              'nav-container ' + (this.state.responsive ? 'responsive' : '')
            }
          >
            {clean ? (
              <div className="nav left">
                <Link href="/">
                  <a
                    className={'/' === this.state.section ? 'active purple' : ' purple'}
                  ><h2>
                    GETSOLIDITY.COM
                    </h2>
                  </a>
                </Link>

              </div>
            ) : null}

            <div className="nav right">

              {clean && this.props.address
                ? [
                    <Link href={"/contracts/abi?address=" + this.props.address} key="2">
                      <a className={this.props.type === 'contracts/abi' ? 'active' : ''}>
                        ABI
                      </a>
                    </Link>,
                    <Link href={"/contracts/seth?address=" + this.props.address} key="2">
                      <a className={this.props.type === 'contracts/seth' ? 'active' : ''}>
                        SETH
                      </a>
                    </Link>,
                    <Link href={"/contracts/web3?address=" + this.props.address} key="2">
                      <a className={this.props.type === 'contracts/web3' ? 'active' : ''}>
                        Web3
                      </a>
                    </Link>,
                    <Link href={"http://188.166.83.230/contracts/" + this.props.address} key="2">
                      <a className={this.props.type === 'contracts/abi' ? 'active' : ''}>
                        Download
                      </a>
                    </Link>,
                  ]
                : null}
            </div>
          </div>
        </header>
        <h4 className={'clean'} >{(this.props.title || " ").slice(0, 15) }</h4>
        <style jsx>
          {`
            header {
              max-width: 900px;
              margin: auto;
              padding: 30px 0;
              position: relative;
            }

            .clean {
              max-width: 100%;
              margin: 0 30px;
            }
            .purple {
              color: #de9aec;
            }

            .lean .nav.left,
            .lean .nav.right .day,
            .lean .nav.right .download,
            .lean .nav.right .chat,
            .lean .nav.right .tv {
              visibility: hidden;
            }

            .nav > a {
              color: #999;
              font-size: 11px;
              text-decoration: none;
              transition: color 0.2s ease;
            }

            .nav > a {
              color: #999;
            }

            .nav > a:hover {
              color: #000;
            }

            .dark .nav > a:hover {
              color: #c059d5;
            }

            .logout-error {
              height: 25px;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              font-size: 12px;
              text-transform: uppercase;
              line-height: 25px;
              vertical-align: middle;
              z-index: 100000;
              background: #ff001f;
              text-align: center;
              color: #fff;
              animation: hide 100ms ease-out;
            }

            @keyframes hide {
              from {
                transform: translateY(-25px);
              }
              to {
                transform: translateY(0);
              }
            }

            a.logo {
              display: block;
              width: 39px;
              height: 35px;
              position: relative;
            }

            .nav {
              margin-top: -2px;
              padding: 10px;
              padding-left: 0;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }

            .nav .chat {
              align-items: center;
              display: inline-flex;
            }

            .nav .chat span {
              background-color: #333;
              width: 26px;
              text-align: center;
              margin-left: 10px;
              padding: 2px 5px;
              line-height: 11px;
              display: inline-block;
              color: #eee;
              font-size: 8px;
              border-radius: 8px;
              font-weight: bold;
              vertical-align: middle;
              opacity: 0;
              transition: all 1s ease;
            }

            .nav .chat.chat-active span {
              opacity: 1;
            }

            .dark .nav .chat span {
              background-color: #eee;
              color: #444;
            }

            .nav .chat:hover span {
              color: #fff;
              background-color: #000;
            }

            .dark .nav .chat:hover span {
              background-color: #fff;
              color: #000;
            }

            .nav a {
              padding: 10px;
              padding-left: 0;

              font-size: 12px;
              text-transform: uppercase;
              font-weight: normal;
              vertical-align: middle;
              line-height: 30px;
            }

            .nav a:last-child {
              padding-right: 0;
            }

            .nav a.active {
              color: #000;
            }

            .nav a.purple {
              color: #de9aec;
            }

            .dark .nav a.active {
              color: #fff;
            }

            .menu-arrow {
              display: none;
              width: 40px;
              height: 40px;
              -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            .right {
              right: 0;
            }

            .left {
              left: 0;
            }

            .title {
              margin-bottom: 60px;
              font-size: 14px;
              font-weight: normal;
              text-align: center;
              color: #000;
            }

            .title b {
              font-weight: bold;
            }

            .dark .title {
              color: #fff;
            }

            @keyframes fadeOut {
              from {
                opacity: 1;
              }

              to {
                opacity: 0.7;
              }
            }

            @keyframes rotateInitial {
              from {
                transform: rotate(0);
              }

              to {
                transform: rotate(15deg);
              }
            }

            @keyframes rotate {
              from {
                transform: rotate(15deg);
              }

              30% {
                transform: rotate(0);
              }

              70% {
                transform: rotate(0);
              }

              to {
                transform: rotate(-15deg);
              }
            }

            .nav > a.download {
              color: #ff0080;
              transition: color 0.2s ease;
            }

            .nav > a.download:hover,
            .dark .nav > a.download:hover {
              color: #ff0080;
            }

            .avatar {
              margin-left: 10px;
            }

            .lean .avatar {
              filter: grayscale(100%);
            }

            .mobile-link {
              display: none;
            }

            @media screen and (max-width: 950px) {
              header {
                text-align: left;
              }

              header.clean {
                margin: 0;
              }

              .clean .menu-arrow {
                display: none;
              }

              .lean .nav.left,
              .lean .nav.right .download,
              .lean .nav.right .chat {
                visibility: visible;
              }

              .nav {
                padding-top: 40px;
                padding-bottom: 0;
                padding-left: 0;
                position: relative;
                transform: none;
                top: 20px;
              }

              .nav a {
                border-bottom: 1px solid #eaeaea;
                color: #000;
                display: block;
                font-size: 14px;
                line-height: 50px;
                height: 50px;
                padding: 0 20px;
              }

              .nav a:hover,
              .nav a.active {
                background: #f8f8f8;
              }

              .nav a.active {
                background: #f8f8f8;
                font-weight: bold;
              }

              .dark .nav a {
                border-bottom-color: #333333;
                color: #fff;
              }

              .dark .nav a:hover,
              .dark .nav a.active {
                background: #121212;
              }

              .dark .nav > a.download {
                color: #ff0080;
              }

              .nav-container {
                display: none;
                background: #fff;
                width: 100%;
                min-height: 90vh;
                z-index: 1;
              }

              .nav .chat,
              .nav .account {
                display: flex;
              }

              .nav .chat > span {
                border-radius: 12px;
                font-size: 12px;
                margin-left: auto;
                padding: 4px 7px;
                width: auto;
              }

              .nav .avatar-container {
                align-items: center;
                display: flex;
                margin-left: auto;
              }

              .dark .nav-container {
                background: #000;
              }

              .nav-container.responsive {
                display: block;
                margin-bottom: 20px;
              }

              .nav-container .left {
                left: 0;
                padding: 0;
              }

              // .logo {
              //   margin-left: 20px;
              // }

              .menu-arrow {
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 28px;
                right: 20px;
                transition: transform 0.2s ease;
              }

              .menu-arrow {
                fill: #000;
              }

              .dark .menu-arrow {
                fill: #fff;
              }

              .menu-arrow.toggled {
                transform: rotate(180deg);
              }

              .mobile-link {
                display: inline-block;
              }

              .mobile-logout {
                cursor: pointer;
              }

              .avatar {
                display: none;
              }
            }
          `}
        </style>
      </div>
    )
  }
}

Header.contextTypes = {
  darkBg: PropTypes.bool
}

export default Header
