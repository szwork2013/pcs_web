// 推荐在入口文件全局设置 locale
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
// moment().local();

import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
	// onError(e){
  //   console.log(e)
  // }
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/app'))
app.model(require('./models/common'))

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
