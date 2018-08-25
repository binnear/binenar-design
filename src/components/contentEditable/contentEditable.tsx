import * as React from 'react';
const s = require('./contentEditable.pcss');
const icon = require('public/images/备案图标.png')
interface Props {
  initHtml: any,
  onChange: Function,
}
interface State {
  html: any
}
class ContentEditable extends React.Component<Props> {
  editor: React.RefObject<any>
  state: State
  constructor(props: Props) {
    super(props)
    this.modify = this.modify.bind(this)
    this.editor = React.createRef()
    this.state = {
      html: null,
    }
  }

  componentDidMount() {
    const { initHtml } = this.props;
    this.setState({ html: initHtml })
  }

  modify(e: any) {
    const value = this.editor.current.innerHTML
    this.props.onChange(e, value)
  }

  render() {
    const { html } = this.state;
    return <code
      ref={this.editor}
      contentEditable
      onInput={this.modify}
      dangerouslySetInnerHTML={{ __html: html }}
    >
    </code>

  }
}

export default ContentEditable