import type { UserConfigExport } from "@tarojs/cli";
// import * as path from "path";

export default {
sass: { //全局scss变量
    // resource: ['src/styles/variable.scss'],
    // projectDirectory: path.resolve(__dirname, '..'),
    /**
     * @param maiColor 主要颜色
     *
     * @param mainBackgroundColor 主要背景颜色
     */
    data:'$maiColor:#7CB79C;$mainBackgroundColor: #F6F6F6;',
},
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {}
} satisfies UserConfigExport
