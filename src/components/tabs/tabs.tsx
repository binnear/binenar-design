import * as React from 'react';
import classnames from 'classnames';
const s = require('./tabs.pcss');
interface Props {
  defaultActiveKey: string,
  onChange: Function
}
interface State {
  currentKey: string,
  marginLeft: string,
  offsetLeft: number,
}
class Tabs extends React.Component<Props, State> {
  tabItem: any
  constructor(props: Props) {
    super(props)
    this.getTabs = this.getTabs.bind(this)
    this.tabItem = React.createRef();
    this.state = {
      currentKey: '1',
      marginLeft: '-0%',
      offsetLeft: 0
    }
  }

  static TabPane = (props: any) => {
    return <div className={s.tabPanelItem}>
      {props.children}
    </div>
  }

  componentDidMount() {
    const { defaultActiveKey } = this.props;
    const marginLeft = `-${(Number(defaultActiveKey) - 1) * 100}%`
    const offsetLeft = this.tabItem.current.offsetLeft
    this.setState({
      marginLeft,
      offsetLeft,
      currentKey: defaultActiveKey,
    })
  }

  onChange(e: any, key: string) {
    const offsetLeft = e.target.offsetLeft
    const { onChange } = this.props;
    const marginLeft = `-${(Number(key) - 1) * 100}%`
    this.setState({ currentKey: key, marginLeft, offsetLeft });
    onChange(key)
  }

  getTabs() {
    const { children, defaultActiveKey } = this.props;
    const { currentKey } = this.state;
    return React.Children.map(children, (child: any) => {
      const { key } = child
      const { tab } = child.props
      const classes = classnames({
        [s.item]: true,
        [s.active]: currentKey === key
      })
      return <div className={classes} ref={defaultActiveKey === key ? this.tabItem : null} onClick={e => { this.onChange(e, key) }}>{tab}</div>
    })
  }

  getTabPanel() {
    const { children } = this.props;
    return React.Children.map(children, (child: any) => {
      return child
    })
  }


  render() {
    const { marginLeft, offsetLeft } = this.state;
    const { children } = this.props
    return <div className={s.tab}>
      <div className={s.tabHeadList}>
        {this.getTabs()}
        <div className={s.activeBar} style={{ transform: `translate(${offsetLeft}px, 0)` }}></div>
      </div>
      <div className={s.tabPanel} style={{ marginLeft: marginLeft }}>
        {this.getTabPanel()}
      </div>
    </div>
  }
}


export default Tabs
