import { init } from 'kuido-sdk'
import { Options } from 'kuido-sdk/lib/adapters/auth'
import { BasicCard } from "ui-widgets"
// @ts-ignore  

type Props = {}

const LandingPage = (props: Props) => {
  const options: Options = {
    token: '',//VITE.
    username: '',//VITE.
    password: '',//VITE.
    config: {}
  }
  // init({

  // })
  // const getData = (): Promise<number> => {
  //   return new Promise((resolve, reject) => resolve(4
  //   ));
  // }
  const basicCardConfigs = {
    title: 'Devices',
    fetch: () => Promise.resolve(1),
    minValue: 5,
    maxValue: 10,
  }
  return (
    <div>
      <BasicCard {...basicCardConfigs} />
    </div>
  )
}

export default LandingPage