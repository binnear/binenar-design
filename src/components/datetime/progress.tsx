import * as React from 'react';
interface Props {
  type: number,
  time: number,
  changeTimeNum: Function
}
interface State {
  left: number
}
class Progress extends React.Component {
  props: Props;
  state: State;
  oldX: number;
  newX: number;
  time: number;
  type: number;
  offsetLeft: number
  constructor(props: Props) {
    super(props);
    this.oldX = 0;
    this.newX = 0;
    this.time = 0;
    this.type = props.type
    this.offsetLeft = 0
    this.state = {
      left: 0,
    }
  }

  componentWillMount() {
    const { type, time } = this.props;
    let left = time / type * 150
    if (time === undefined) return
    this.setState({ left })
  }

  handleMouseDown = (e: any) => {
    this.oldX = e.clientX;
    this.offsetLeft = e.currentTarget.offsetLeft;
    const tar = e.currentTarget;
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', e => {
      document.removeEventListener('mousemove', this.handleMouseMove)
      const { type, time } = this.props;
      let left = time / type * 150
      this.setState({ left })
    })
  }

  handleMouseMove = (e: any) => {
    const { changeTimeNum } = this.props
    this.newX = e.clientX
    let left = this.offsetLeft + (this.newX - this.oldX)
    if (left < 0) left = 0;
    if (left > 150) left = 150;
    this.time = Math.floor(left / 150 * this.type)
    this.setState({ left })
    changeTimeNum(this.time)
  }


  render() {
    const { left } = this.state;
    return <div className="datetime-progress">
      <span
        style={{ left: `${left}px` }}
        className="datetime-progress-out"
      // onMouseDown={this.handleOutMouseDown}
      ></span>
      <span
        style={{ left: `${left}px` }}
        className="datetime-progress-dot"
        onMouseDown={this.handleMouseDown}
      ></span>
    </div>
  }
}


export default Progress