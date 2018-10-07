import * as React from 'react';
const s = require('./head.pcss');
interface Props {

}
interface State {
}
class Head extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return <div className={s.head}>
      <i className="iconfont icon-github"></i>
    </div>
  }
}

export default Head