import * as React from 'react';

interface Props {

}

interface State {

}

export default class SelectInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    return <div className="selectInput">
      <input type="text"/>
    </div>
  }
}