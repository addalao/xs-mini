import CustomPage from "@/component/CustomPage";
import { View } from '@tarojs/components'
import s from './index.module.scss'

/**
 * 首页
 */
export default function Index() {

  return (
      <CustomPage
          optin={{
              fixed:true
          }}
      >
          <View className={s.indexPage}>

          </View>
      </CustomPage>
  )
}
