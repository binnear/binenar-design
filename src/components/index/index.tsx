import * as React from 'react';
// import * as s from './index.pcss';
const s = require('./index.pcss');
const icon = require('public/images/备案图标.png')
interface Props {

}
class Index extends React.Component {
  constructor(props: Props) {
    super(props)
  }


  render() {
    return <div className={s.index}>
      <div className={s.head}>
        binnear
      </div>
      <div className={s.content}>
        <div className={s.item}>我的笔记</div>
        <div className={s.item}>我的文章</div>
        <div className={s.item}>我的日记</div>
        <div className={s.item}>我的组件</div>
      </div>
      <div className={s.footer}>
        <span>binenar`blog ©2018 </span>
        <span>粤ICP备18092259号-1 </span>
      </div>
      <div style={{ width: "300px", margin: "0 auto", padding: "20px 0", }}>
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502002698"
          style={{ display: "inline-block", textDecoration: "none", height: "20px", lineHeight: "20px", }}>
          <img src={icon} style={{ float: "left" }} />
          <p style={{ float: "left", height: "20px", lineHeight: "20px", margin: "0px 0px 0px 5px", color: "#939393", }}>粤公网安备 44030502002698号</p></a>
      </div>

    </div>
  }
}

export default Index