import * as React from 'react';
import classnames from 'classnames';
import Portal from 'components/portal/portal'

const s = require('./modal.pcss');
interface Props {
  children: any,
  visible: boolean,
}

interface State {
  visible: boolean,
  classes: string,
}

class Modal extends React.Component<Props, State> {
  modal: any
  constructor(props: Props) {
    super(props)
    this.close = this.close.bind(this)
    this.modal = React.createRef()
    this.state = {
      visible: false,
      classes: null,
    }
  }

  componentWillReceiveProps(props: Props) {
    const classes = classnames({
      'modal-wrapper': true,
      'modal-wrapper-in-active': props.visible,
      'modal-wrapper-out-active': !props.visible,
    })
    if (!props.visible) {
      this.setState({ classes })
      setTimeout(_ => {
        this.setState({ classes: 'modal-wrapper modal-wrapper-out-end' })
      }, 100)
      setTimeout(e => {
        this.setState({ visible: props.visible })
      }, 300)
    } else {
      this.setState({ visible: props.visible })
      setTimeout(e => {
        this.setState({ classes })
      }, 0)
      setTimeout(e => {
        this.setState({ classes: 'modal-wrapper modal-wrapper-in-end' })
      }, 300)
    }


  }

  close() {
      this.modal.current.classList.remove('show')
      this.modal.current.classList.add('hide')
      // setTimeout(_=>{
      //   this.setState({ visible: false })
      // }, 1000)
  }


  render() {
    const { visible, classes } = this.state
    return visible && <div ref={this.modal} onClick={this.close} className={classes ? classes : "modal-wrapper modal-wrapper-in-appear"}>
      {this.props.children}
    </div>
    // </Portal>
  }
}

export default Modal