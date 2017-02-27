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
