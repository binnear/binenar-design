import * as React from 'react';
import Portal from 'components/portal/portal'
import Transition from 'components/transition/transition'

const s = require('./modal.pcss');
interface Props {
  children: any,
  visible: boolean,
}

interface State {
  visible: boolean
}

class Modal extends React.Component<Props, State> {
  modal: any
  constructor(props: Props) {
    super(props)
    this.close = this.close.bind(this)
    this.modal = React.createRef()
    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps(props: Props) {
    this.setState({ visible: props.visible })

  }

  close() {
    this.setState({ visible: false })
  }


  render() {
    const { visible } = this.state
    return <Portal>
      <Transition
        show={visible}
        transitionName="modal-wrapper"
        enterActiveTimeout={300}
        leaveActiveTimeout={300}
      >
        <div className="modal-wrapper" onClick={this.close}>
          {this.props.children}
        </div>
      </Transition>

    </Portal>
  }
}

export default Modal