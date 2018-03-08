import Router from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import { format, parse } from 'url'
import DocsNavbarDesktop from '../components/docs/navbar/desktop'
import DocsNavbarMobile from '../components/docs/navbar/mobile'
import DocsNavbarToggle from '../components/docs/navbar/toggle'
import Head from '../components/head'
import Header from '../components/header'
import Logo from '../components/icons/logo'
import Page from '../components/page'
// import sections from '../components/api/0x2ff9c09becd301bcf7d5fa057e01c39a370985cb'
import FreezePageScroll from '../components/freeze-page-scroll'
import authenticate from '../lib/authenticate'


import transformer from '../lib/data/api'
// const data = transformer(abi)
import withAPI from '../lib/with-api'

import ABISection from '../components/api/abi-section'

if (typeof window !== 'undefined') {
  require('intersection-observer')
}




class ABI extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = { hash: null }
    this.contentNode = null
    this.observer = null
    this.name = (props.name || "unnamed")
    this.url = "/" + props.type + "?address=" + props.address
    this.data = transformer(props.abi, this.url)
    this.onHashChange = this.onHashChange.bind(this)
  }

  static async getInitialProps({ req }) {
    // We don't need to do any auth logic for static export
    const isServer = typeof window === 'undefined'
    if (isServer && !req.headers) {
      return {}
    }

    const { user } = await authenticate({ req })
    return { user }
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange)

    const nodes = [...this.contentNode.querySelectorAll('[id]')]
    const intersectingTargets = new Set()

    this.observer = new IntersectionObserver(entries => {
      for (const { isIntersecting, target } of entries) {
        if (isIntersecting) {
          intersectingTargets.add(target)
        } else {
          intersectingTargets.delete(target)
        }
      }

      if (!intersectingTargets.size) return

      const sorted = [...intersectingTargets].sort(
        (a, b) => nodes.indexOf(a) - nodes.indexOf(b)
      )
      const hash = '#' + (sorted[0].id || '')
      if (location.hash !== hash) {
        changeHash(hash)
        this.onHashChange()
      }
    })

    for (const node of nodes) {
      this.observer.observe(node)
    }

    const { hash } = window.location
    this.setState({ hash })
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange)

    this.observer.disconnect()
    this.observer = null
  }

  onHashChange() {
    this.setState({ hash: window.location.hash })
  }

  render() {
    const { props } = this
    const { hash } = this.state

    return (
      <Page dayBanner={false}>
        <Head titlePrefix="" title={this.name} />
        <div className="header-wrapper">
          <div className="header">
            <BGContainer darkBg={true}>
              <Header
                clean={true}
                logo={
                  <BGContainer darkBg={false}>
                    <Logo />
                  </BGContainer>
                }
                user={props.user}
                pathname={this.url}
                type={props.type}
                address={props.address}
                title={this.name}
                onLogout={() => {
                  Router.push('/login')
                }}
                onLogoRightClick={() => this.url.push('/logos')}
              />
            </BGContainer>
          </div>
        </div>
        <FreezePageScroll>
          <div className="sidebar">
            <DocsNavbarDesktop
              data={this.data}
              url={this.url}
              hash={hash}
              scrollSelectedIntoView={true}
            />
          </div>
        </FreezePageScroll>
        <div>
          <div className="doc-layout">
            <div className="topbar">
              <DocsNavbarMobile
                data={this.data}
                url={this.url}
                hash={hash}
                sticky={true}
              />
            </div>

            <div className="content" ref={ref => (this.contentNode = ref)}>
              {this.data.map(({ id, posts }) => {
                console.log(props.address)
                return (
                  <div key={id} className="category">
                    {posts.map(post => {
                      if(post.type === 'ABIDescription') {
                        return (<SectionContainer
                          key={post.id || "sadfds"}
                          hash={post.hash || "sadfds"}
                          name={post.name || "sadfasd"}
                        >
                          <ABISection
                            abi={post.abi}
                            description={post.description || {} }
                            contract={props.contract}
                            address={props.address}
                            implementation={props.implementation}
                          />
                        </SectionContainer>)
                      } else {
                        const Section = (sections[id] || {})[post.id]
                        return Section ? (
                          <SectionContainer
                            key={post.id}
                            hash={post.hash}
                            name={post.name}
                          >
                            <Section
                              user={props.user}
                              testingToken={props.testingToken}
                            />
                          </SectionContainer>
                        ) : null
                      }
                    })}
                  </div>
                )
              })}
            </div>
            <div />
          </div>
        </div>
        <style jsx>{`
          :global(body) {
            padding-bottom: 0;
          }

          a {
            text-decoration: none;
            color: #999;
            transition: color 0.2s ease;
          }

          a:hover {
            color: #000;
          }

          .doc-layout {
            display: flex;
            margin: 0 0 0 240px;
            justify-content: left;
            -webkit-font-smoothing: antialiased;
          }

          .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 101;
          }

          .sidebar {
            position: fixed;
            width: 240px;
            margin-top: 0;
            bottom: 0;
            left: 0;
            top: 100px;
            overflow: auto;
            -webkit-font-smoothing: antialiased;
          }

          .topbar {
            display: none;
            padding: 0 20px;
          }

          .content {
            width: 100%;
          }

          @media screen and (min-width: 700px) {
            /* prettier-ignore */
            .category:first-child :global(.section:first-child .block:first-child .copy),
            .category:first-child :global(.section:first-child .block:first-child .example) {
              padding-top: 95px;
            }

            /* prettier-ignore */
            .category:last-child :global(.section:last-child .block:last-child .copy),
            .category:last-child :global(.section:last-child .block:last-child .example) {
              padding-bottom: 95px;
            }
          }

          @media screen and (max-width: 950px) {
            .header-wrapper {
              height: 95px;
            }

            .header {
              background: #fff;
            }

            .doc-layout {
              display: block;
              margin: 0;
            }

            .content {
              width: 100%;
              margin-left: 0;
            }

            .sidebar {
              display: none;
            }

            .topbar {
              display: block;
            }
          }
        `}</style>
      </Page>
    )
  }
}
export default withAPI(ABI)

class SectionContainer extends React.PureComponent {
  getChildContext() {
    return {
      hash: this.props.hash,
      name: this.props.name
    }
  }

  render() {
    return this.props.children
  }
}

SectionContainer.childContextTypes = {
  hash: PropTypes.string,
  name: PropTypes.string
}

class BGContainer extends React.PureComponent {
  getChildContext() {
    return { darkBg: this.props.darkBg }
  }

  render() {
    return this.props.children
  }
}

BGContainer.childContextTypes = {
  darkBg: PropTypes.bool
}

function changeHash(hash) {
  const { pathname, query } = Router

  const parsedUrl = parse(location.href)
  parsedUrl.hash = hash

  Router.router.changeState(
    'replaceState',
    format({ pathname, query }),
    format(parsedUrl)
  )
}
