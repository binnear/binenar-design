import * as React from 'react';
const s = require('./foot.pcss');
const icon = require('public/images/备案图标.png')
interface Props {

}
class Foot extends React.Component {
  constructor(props: Props) {
    super(props)
  }


  render() {
    return <div className={s.foot}>
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502002698">
        <span className={s.beian}>粤ICP备18092259号-1 </span>
        <img src={icon} />
        <span>粤公网安备 44030502002698号</span>
      </a>
    </div>

  }
}

export default Foot