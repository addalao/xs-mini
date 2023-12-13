import { View, Text } from '@tarojs/components'
import s from './index.module.scss'

export default function Index() {

  return (
    <View className='index'>
      <Text className={s.demo}>Hello world!</Text>
    </View>
  )
}
