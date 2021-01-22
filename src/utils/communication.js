import axios from 'axios';
import qs from 'qs';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

const url = {
  A: '/api/character/left',
  B: '/api/character/right',
  scale: '/api/scale',
  leftRocker: {
    X: '/api/weather/x',
    Y: '/api/weather/y',
  },
  rightRocker: {
    X: '/api/weather/x',
    Y: '/api/weather/y',
  },
};
function sendCmd(httpMethod, url, data) {
  if (httpMethod === 'post')
    return axios({
      method: 'post',
      url: url,
      data: qs.stringify({
        value: data,
      }),
    });
  return axios({
    method: 'get',
    url: url,
    params: data,
  });
}

export function noticeServer(cmd, data = {}) {
  const X = data.X || '';
  const Y = data.Y || '';
  const scale = data.scale || 1;
  let operaterName = '';
  let operaterData = '';
  switch (cmd) {
    case 'leftRocker':
      operaterName = '左摇杆';
      operaterData = ` x:${X}  y:${Y}`;
      sendCmd('post', url[cmd].X, X);
      sendCmd('post', url[cmd].Y, Y);
      break;
    case 'rightRocker':
      operaterName = '右摇杆';
      operaterData = ` x:${X}  y:${Y}`;
      sendCmd('post', url[cmd].X, X);
      sendCmd('post', url[cmd].Y, Y);
      break;
    case 'A':
      operaterName = '按钮A';
      operaterData = '左移';
      sendCmd('get', url[cmd]);
      break;
    case 'B':
      operaterName = '按钮B';
      operaterData = '右移';
      sendCmd('get', url[cmd]);
      break;
    case 'scale':
      operaterName = '缩放';
      operaterData = scale;
      sendCmd('post', url[cmd], scale);
      break;
    default:
      break;
  }
  return `${operaterName}  ${operaterData}`;
}
