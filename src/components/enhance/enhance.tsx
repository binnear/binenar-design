import * as React from 'react';

interface Props {
  name: string,
  age: number,
}
interface State {

}
export default function Enhance(WrappedComponent: any) {
  return class Enhanc extends WrappedComponent {
    constructor(props: Props) {
      super(props)
    }

    componentDidMount() {
      console.log('enhance', super.componentDidMount)
    }

    render() {
      return super.render()
    }
  }
}