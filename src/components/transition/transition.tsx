import * as React from 'react';
import classnames from 'classnames';

interface Props {
  show: boolean,
  children: any,
  animate?: boolean,
  transitionName: string,
  appearTimeout?: number,
  appearActiveTimeout?: number,
  appearEndTimeout?: number,
  enterTimeout?: number,
  enterActiveTimeout?: number,
  enterEndTimeout?: number,
  leaveTimeout?: number,
  leaveEndTimeout?: number,
  leaveActiveTimeout?: number,
}

interface State {
  show: boolean,
  classes: string,
}

class Transition extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.getClasses = this.getClasses.bind(this)
    this.enterAnimate = this.enterAnimate.bind(this)
    this.leaveAnimate = this.leaveAnimate.bind(this)
    this.appearAnimate = this.appearAnimate.bind(this)
    this.cloneChildren = this.cloneChildren.bind(this)
    this.state = {
      show: false,
      classes: null,
    }
  }

  static defaultProps = {
    animate: true,
    appearTimeout: 0,
    appearActiveTimeout: 0,
    appearEndTimeout: 0,
    enterTimeout: 0,
    enterActiveTimeout: 0,
    enterEndTimeout: 0,
    leaveTimeout: 0,
    leaveEndTimeout: 0,
    leaveActiveTimeout: 0,
  }

  componentWillMount() {
    const { transitionName, animate, show } = this.props;
    if (!animate) {
      this.setState({ show })
      return
    }
    this.appearAnimate(this.props, transitionName)
  }

  componentWillReceiveProps(props: Props) {
    const { transitionName, animate, show } = props
    if (!animate) {
      this.setState({ show })
      return
    }
    if (!props.show) {
      this.leaveAnimate(props, transitionName)
    } else {
      this.enterAnimate(props, transitionName)
    }
  }

  appearAnimate(props: Props, transitionName: string) {
    const { show, appearTimeout, appearActiveTimeout, appearEndTimeout } = props
    const { initClasses, activeClasses, endClasses } = this.getClasses('appear', transitionName)
    this.setState({ show, classes: initClasses })
    setTimeout(_ => {
      this.setState({ classes: activeClasses })
    }, appearTimeout)
    setTimeout(_ => {
      this.setState({ classes: endClasses })
    }, appearActiveTimeout + appearTimeout)
    setTimeout(_ => {
      this.setState({ classes: '' })
    }, appearEndTimeout + appearActiveTimeout + appearTimeout)
  }

  enterAnimate(props: Props, transitionName: string) {
    const { show, enterTimeout, enterActiveTimeout, enterEndTimeout } = props
    const { initClasses, activeClasses, endClasses } = this.getClasses('enter', transitionName)
    this.setState({ show, classes: initClasses })
    setTimeout(_ => {
      this.setState({ classes: activeClasses })
    }, enterTimeout)
    setTimeout(_ => {
      this.setState({ classes: endClasses })
    }, enterActiveTimeout + enterTimeout)
    setTimeout(_ => {
      this.setState({ classes: '' })
    }, enterEndTimeout + enterActiveTimeout + enterTimeout)
  }

  leaveAnimate(props: Props, transitionName: string) {
    const { show, leaveTimeout, leaveActiveTimeout, leaveEndTimeout } = props
    const { initClasses, activeClasses, endClasses } = this.getClasses('leave', transitionName)
    this.setState({ classes: initClasses })
    setTimeout(_ => {
      this.setState({ classes: activeClasses })
    }, leaveTimeout)
    setTimeout(_ => {
      this.setState({ classes: endClasses })
    }, leaveActiveTimeout + leaveTimeout)
    setTimeout(_ => {
      this.setState({ show, classes: '' })
    }, leaveEndTimeout + leaveActiveTimeout + leaveTimeout)
  }

  getClasses(type: string, transitionName: string) {
    const initClasses = classnames({
      [`${transitionName}-appear`]: type === 'appear',
      [`${transitionName}-enter`]: type === 'enter',
      [`${transitionName}-leave`]: type === 'leave',
    })
    const activeClasses = classnames({
      [`${transitionName}-appear-active`]: type === 'appear',
      [`${transitionName}-enter-active`]: type === 'enter',
      [`${transitionName}-leave-active`]: type === 'leave',
    })
    const endClasses = classnames({
      [`${transitionName}-appear-end`]: type === 'appear',
      [`${transitionName}-enter-end`]: type === 'enter',
      [`${transitionName}-leave-end`]: type === 'leave',
    })
    return { initClasses, activeClasses, endClasses }
  }


  cloneChildren() {
    const { classes } = this.state
    const children = this.props.children
    const className = children.props.className
    return React.cloneElement(
      children,
      { className: `${className} ${classes}` }
    )
  }


  render() {
    const { show } = this.state
    return show && this.cloneChildren()
  }
}

export default Transition