import * as React from 'react';
import { createPortal } from 'react-dom';

const s = require('./portal.pcss');
interface Props {
  children: any,
  // visible: boolean,
}

class Portal extends React.Component<Props> {
  node: Element
  constructor(props: Props) {
    super(props)
    this.node = document.createElement('div');
    document.body.appendChild(this.node);
  }

  render() {
    return createPortal(
      this.props.children,
      this.node
    )
  }
}

export default Portal