import * as React from 'react';
import ContentEditable from 'components/contentEditable/contentEditable';
import { connect } from 'react-redux';
import { updatecss } from 'actions';
const s = require('./editorpanel.pcss');
interface Props {
  cssProper: {
    transform: any
  },
  updatecss: Function
}
interface State {
}
class Editorpanel extends React.Component<Props> {
  state: State
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
        <ContentEditable
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

