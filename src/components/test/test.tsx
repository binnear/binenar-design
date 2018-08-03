import * as React from "react";
import { connect } from 'react-redux';
import { test } from '../../actions'

interface TestProps { data: string; test: Function; }

class Test extends React.Component<TestProps> {
  constructor(props: TestProps) {
    super(props)
    this.changeValue = this.changeValue.bind(this)
  }
  changeValue() {
    const { test } = this.props;
    test('ok')
  }
  render() {
    const { data } = this.props
    return <div onClick={this.changeValue}>{data}</div>
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  data: state.test.data
})

const mapDispatchToProps = {
  test
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);