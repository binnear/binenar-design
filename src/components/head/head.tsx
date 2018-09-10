import * as React from 'react';
import Tabs from 'components/tabs/tabs';
const s = require('./head.pcss');
interface Props {

}
const TabPane = Tabs.TabPane
class Head extends React.Component {
  constructor(props: Props) {
    super(props)
  }

  componentDidMount() {
    
  }

  changeTabs() {

  }


  render() {
    return <div className={s.head}>
      <Tabs defaultActiveKey="2" onChange={this.changeTabs}>
        <TabPane tab="BLOG" key="1">BLOG</TabPane>
        <TabPane tab="LIFE" key="2">LIFE</TabPane>
        <TabPane tab="WORK" key="3">WORK</TabPane>
      </Tabs>
      
    </div>
  }
}

export default Head