import * as React from 'react';
import ContentEditable from 'components/contentEditable/contentEditable';
import { connect } from 'react-redux';
import { updatecss } from 'actions';
const s = require('./mountPanel.pcss');
const row = require('public/images/row.jpg')
interface Props {
  [key: string]: object
  cssProper: {
    [key: string]: string | number;
  }
}
interface State {
  value: any
}
class MountPanel extends React.Component {
  props: Props
  state: State
  img: React.RefObject<any>
  constructor(props: Props) {
    super(props)
    this.img = React.createRef();
  }

  componentDidUpdate() {
    const el = this.img.current;
    const { cssProper } = this.props;
    el.style.transform = cssProper['transform']
  }

  render() {
    return <div className={s.mountPanel}>
      <img ref={this.img} src={row} alt="" />
    </div>
  }
}

const mapStateToProps = (state: any) => ({
  cssProper: state.cssProper
})

export default connect(mapStateToProps)(MountPanel)

