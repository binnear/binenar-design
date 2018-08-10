import * as React from "react";
import * as moment from 'moment';
import { connect } from 'react-redux';
import { test } from 'actions';
import DateTime from 'components/datetime/datetime'

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
  changeTime = (e: any) => {

  }
  render() {
    const { data } = this.props
    const datetimeProps = {
      width: '380',
      className: '',
      formatter: '',
      onChange: this.changeTime,
      placeholder: '',
      value: moment(),
    }
    return <div onClick={this.changeValue}>
      <div>{data}</div>
      <DateTime {...datetimeProps} />
    </div>
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  data: state.test.data
})

const mapDispatchToProps = {
  test
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);