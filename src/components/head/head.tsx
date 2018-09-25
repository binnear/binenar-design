import * as React from 'react';
import Tabs from 'components/tabs/tabs';
import Modal from 'components/modal/modal';
const s = require('./head.pcss');
interface Props {

}
interface State {
  activeKey: string,
  visible: boolean,
}
const TabPane = Tabs.TabPane
class Head extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.clickme = this.clickme.bind(this)
    this.changeTabs = this.changeTabs.bind(this)
    this.state = {
      activeKey: '1',
      visible: false,
    }
  }

  componentDidMount() {
    // document.querySelector('.button').addEventListener('click',(e:any)=>{
    //   // e.stopPropagation()
    //   // e.preventDefault()
    //   console.log(1)
    //   // return false
    // })

    // document.querySelector(`.${s.head}`).addEventListener('click', (e:any)=>{
    //   console.log(4)
    // }, true)
  }

  changeTabs(preKey: string, activeKey: string) {
    this.setState({ activeKey })
  }

  clickme(e:any) {
    e.preventDefault()
    console.log(2)
    const { visible } = this.state
    this.setState({ visible: !visible })
  }

  clicke(e:any) {
    console.log(3)
  }


  render() {
    const { activeKey, visible } = this.state
    return <div className={s.head}>
      <Tabs activeKey={activeKey} onChange={this.changeTabs}>
        <TabPane tab="BLOG" key="1">BLOG</TabPane>
        <TabPane tab="LIFE" key="2">LIFE</TabPane>
        <TabPane tab="WORK" key="3">WORK</TabPane>
      </Tabs>
      {/* <button className="button" onClick={this.clickme}>click me</button> */}
      {/* <Modal visible={visible}>
        这是一个基于portal的Modal
      </Modal> */}
    </div>
  }
}


export default Head