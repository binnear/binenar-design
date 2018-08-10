import * as React from 'react';
import './datetime.less';
import * as moment from 'moment'
import * as ReactDom from 'react-dom';
import ModalPanel from './modalpanal'

interface DateTimeProps {
  width: string,
  className: string,
  formatter: string,
  onChange: Function,
  placeholder: string,
  value: moment.Moment,
}

const defaultProps = {
  width: '200',
  className: '',
  value: moment(),
  placeholder: 'time',
  onChange: (_: Event) => _,
  formatter: 'YYYY-MM-DD HH:mm:ss',
}

class DateTime extends React.Component {
  div: HTMLDivElement;
  props: DateTimeProps;
  constructor(props: DateTimeProps) {
    super(props);
    this.div = null;
    this.state = {
      value: '',
    }
  }

  static readonly defaultProps: DateTimeProps = defaultProps

  componentDidMount() {
    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style.left = '0';
    this.div.style.top = '0';
    this.div.style.zIndex = '999999';
    document.body.appendChild(this.div)
  }

  componentWillUnmount() {
    this.unmountComponentAtNode(this.div)
    document.body.removeChild(this.div)
  }

  unmountComponentAtNode(div: HTMLDivElement) {
    ReactDom.unmountComponentAtNode(div)
  }

  componentWillReceiveProps(props: DateTimeProps) {
    const oldValue = this.props.value;
    const newValue = props.value;
    if (oldValue && newValue && oldValue.valueOf() != newValue.valueOf()) {
      const modalPanelProps = {
        div: this.div,
        formatter: '',
        value: newValue,
        onChange: props.onChange,
        getFinalTimeToInput: this.getFinalTimeToInput,
        unmountComponentAtNode: this.unmountComponentAtNode
      }
      ReactDom.render(<ModalPanel {...modalPanelProps} />, this.div)
    }
  }

  getFinalTimeToInput = (value: moment.Moment) => {
    const { formatter } = this.props
    if (!formatter) return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
    return value ? moment(value).format(formatter) : ''
  }

  getNumWithZero = (num: number) => {
    return num < 10 ? `0${num}` : num
  }


  render() {
    const { width, placeholder, className, onChange, value } = this.props;
    const modalPanelProps = {
      value,
      onChange,
      div: this.div,
      formatter: '',
      getFinalTimeToInput: this.getFinalTimeToInput,
      unmountComponentAtNode: this.unmountComponentAtNode
    }
    return <div className="datetime" id="datetime" style={{ width: width }}>
      <input
        readOnly
        value={this.getFinalTimeToInput(value)}
        placeholder={placeholder}
        className={`datetime-input ${className}`}
        onClick={_ => ReactDom.render(<ModalPanel {...modalPanelProps} />, this.div)}
      />
      <span className="datetime-input-icon"></span>

    </div>
  }
}

export default DateTime;
