import * as React from 'react';
import Portal from 'components/portal/portal'

const s = require('./modal.pcss');
interface Props {
  children: any
}

interface State {
  visible: boolean
}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false
    }
  }


  render() {
    const { visible } = this.state
    return <Portal visible={visible}>
      <div className="modal-mask"></div>
        <div className="modal-wrapper">
          {this.props.children}
        </div>
    </Portal>
  }
}

export default Modal