import * as React from 'react';
const s = require('./content.pcss');
const paint1 = require('public/images/paint1.svg');
const paint2 = require('public/images/paint2.svg');
interface Props {

}
class Content extends React.Component {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return <div className={s.content}>
      <span className={s.paint} style={{ background: `no-repeat 0% 44%/94% url(${paint1})` }}>
        <i className="iconfont icon-blog"></i>
        <a href="/blog/" >Blog</a>

      </span>
      <span className={s.paint} style={{ background: `no-repeat 0% 30%/94% url(${paint2})` }}>
        <i className="iconfont icon-github"></i>
        <a href="https://github.com/binnear/">Github</a>

      </span>
    </div>
  }
}

export default Content