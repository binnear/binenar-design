import * as React from 'react';

interface Props {
  name: string,
  age: number,
}

interface State {
  name: string,
  age: number,
}

export default class Student extends React.Component<Props, State> {
  inputElement: any
  static sayHello() {
    console.log('hello from Student'); // eslint-disable-line
  }
  constructor(props: Props) {
    super(props);
    console.log('Student constructor'); // eslint-disable-line
    this.focus = this.focus.bind(this);
    this.state = {
      name:  null,
      age: null,
    }
  }
  componentWillMount() {
    console.log('Student componentWillMount'); // eslint-disable-line
    const { name, age } = this.props
    this.setState({
      name, age,
    });
  }
  componentDidMount() {
    console.log('Student componentDidMount'); // eslint-disable-line
  }
  componentWillReceiveProps(nextProps: Props) {
    console.log('Student componentWillReceiveProps'); // eslint-disable-line
    console.log(nextProps); // eslint-disable-line
  }
  focus() {
    this.inputElement.focus();
  }
  render() {
    return (<div>
      <p>姓名：{this.state.name}</p>
      <p>
        年龄:
              <input
            readOnly
          value={this.state.age}
          ref={(input) => {
            this.inputElement = input;
          }}
        />
      </p>
      <p>
        <input
          type="button"
          value="focus input"
          onClick={this.focus}
        />
      </p>
    </div>);
  }
}
