import * as React from 'react';
import Contenteditable from 'react-contenteditable-b';
import { connect } from 'react-redux';
import { updatecss } from 'actions';
const s = require('./editorpanel.pcss');
interface Props {
  cssProper: {
    transform: any
  },
  updatecss: Function
}
class Editorpanel extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e: any, value: any) {
    const { updatecss } = this.props;
    updatecss({ transform: value })
  }

  render() {
    const { transform } = this.props.cssProper
    return <div className={s.editorpanel}>
      <pre>
        <span>transform: </span>
        <Contenteditable
          initHtml={transform}
          onChange={this.onChange}
        />
      </pre>
    </div>
  }
}

const mapStateToProps = (state: any) => ({
  cssProper: state.cssProper
})

const mapDispatchToProps = {
  updatecss
}

export default connect(mapStateToProps, mapDispatchToProps)(Editorpanel)

