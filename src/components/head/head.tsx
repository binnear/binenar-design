import * as React from 'react';
import Tabs from 'components/tabs/tabs';
import Modal from 'components/modal/modal';
const s = require('./head.pcss');
interface Props {

}
interface State {
  activeKey: string
}
const TabPane = Tabs.TabPane
class Head extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.changeTabs = this.changeTabs.bind(this)
    this.state = {
      activeKey: '1'
    }
  }

  componentDidMount() {

  }

  changeTabs(preKey: string, activeKey: string) {
    this.setState({ activeKey })
  }


  render() {
    const { activeKey } = this.state
    return <div className={s.head}>
      <Tabs activeKey={activeKey} onChange={this.changeTabs}>
        <TabPane tab="BLOG" key="1">BLOG</TabPane>
        <TabPane tab="LIFE" key="2">LIFE</TabPane>
        <TabPane tab="WORK" key="3">WORK</TabPane>
      </Tabs>
      {/* <Modal>
        这是一个基于portal的Modal
      </Modal> */}
      <img src="https://binnear-1256688074.cos.ap-guangzhou.myqcloud.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20180915231151.jpg" alt=""/>
    </div>
  }
}

export default Head