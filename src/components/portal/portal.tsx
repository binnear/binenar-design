import * as React from 'react';
import { createPortal } from 'react-dom';

const s = require('./portal.pcss');
interface Props {
  children: any,
  visible: boolean,
}

class Portal extends React.Component<Props> {
  node: Element
  constructor(props: Props) {
    super(props)
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }


  render() {
    const { visible } = this.props;
    return visible && createPortal(
      <div>{this.props.children}</div>,
      this.node
    )
  }
}

export default Portal