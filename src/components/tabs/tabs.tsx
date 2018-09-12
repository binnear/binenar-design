import * as React from 'react';
import classnames from 'classnames';
const s = require('./tabs.pcss');

interface TabsProps {
  activeKey?: string,
  onChange?: Function,
  defaultActiveKey?: string,
}
interface TabPanel {
  tab: string,
  key: string,
  children: any
}
interface State {
  activeKey: string,
  borderDes: number,
  panelSwitchDes: string,
}

class Tabs extends React.Component<TabsProps, State> {
  constructor(props: TabsProps) {
    super(props)
    this.getTabHeads = this.getTabHeads.bind(this)
    this.setNextState = this.setNextState.bind(this)
    this.state = {
      borderDes: 0,
      activeKey: '1',
      panelSwitchDes: '-0%',
    }
  }

  static TabPane = (props: TabPanel) => {
    return <div className={s.tabPanelItem}>
      {props.children}
    </div>
  }

  componentWillReceiveProps(props: TabsProps) {
    if ('activeKey' in props) {
      this.setNextState(props.activeKey)
    }
  }

  componentDidMount() {
    let { activeKey } = this.state;

    if ('defaultActiveKey' in this.props) {
      activeKey = this.props.defaultActiveKey
    } else if ('activeKey' in this.props) {
      activeKey = this.props.activeKey
    }

    this.setNextState(activeKey)
  }

  onChange(activeKey: string) {
    const { onChange } = this.props;
    const preKey = this.state.activeKey;

    if (!('activeKey' in this.props)) this.setNextState(activeKey)

    onChange(preKey, activeKey)
  }

  setNextState(activeKey: string) {
    const currentTar: any = document.getElementsByClassName(s.item)[Number(activeKey) - 1]
    const panelSwitchDes = `-${(Number(activeKey) - 1) * 100}%`
    const borderDes = currentTar.offsetLeft
    this.setState({ panelSwitchDes, borderDes })
  }

  getTabHeads() {
    const { children } = this.props;
    const { activeKey } = this.state;

    return React.Children.map(children, (child: any) => {
      const { key } = child
      const { tab } = child.props
      const classes = classnames({
        [s.item]: true,
        [s.active]: activeKey === key
      })
      return <div className={classes} onClick={e => this.onChange(key)}>{tab}</div>
    })
  }

  getTabPanels() {
    const { children } = this.props;

    return React.Children.map(children, (child: any) => {
      return child
    })
  }


  render() {
    const { panelSwitchDes, borderDes } = this.state;
    return <div className={s.tab}>
      <div className={s.tabHeadList}>
        {this.getTabHeads()}
        <div className={s.activeBar} style={{ transform: `translate(${borderDes}px, 0)` }}></div>
      </div>
      <div className={s.tabPanel} style={{ marginLeft: panelSwitchDes }}>
        {this.getTabPanels()}
      </div>
    </div>
  }
}


export default Tabs
