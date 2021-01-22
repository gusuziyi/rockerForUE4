<template>
  <div class="page">
    <van-field v-model="frame" label="帧率:" />
    <van-field :value="msg" readonly label="已发送消息:" />
    <div class="btn-div">
      <span class="btn" @click="clickBtn('A')" @touch="clickBtn('A')">A</span>
      <span class="btn" @click="clickBtn('B')" @touch="clickBtn('B')">B</span>
    </div>
    <div ref="leftRocker"></div>
    <div ref="rightRocker"></div>
  </div>
</template>

<script>
import nipplejs from 'nipplejs';
import { noticeServer } from '@/utils/communication';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      frame: 5,
      timer: null,

      //持续按住时间
      onPressTimer: null,
      oldTime: 0,

      //双指在按压屏幕
      istouch: false,
      operaterCMD: '',
      msg: '',
      rockList: [
        {
          name: 'leftRocker',
          mode: 'static',
          position: { left: '20%', bottom: '20%' },
          color: 'grey',
        },
        {
          name: 'rightRocker',
          mode: 'static',
          position: { right: '20%', bottom: '20%' },
          color: 'green',
        },
      ],
    };
  },
  computed: {
    intervalTime() {
      return Math.round(1000 / this.frame);
    },
  },
  beforeDestroy() {
    this.rockList.forEach(i => {
      this[i.name].destroy();
    });
  },
  mounted() {
    this.initRocker(this.rockList);
    this.setGesture();
  },
  methods: {
    // 按钮点击事件
    clickBtn(whichBtn) {
      this.operaterCMD = whichBtn;
      this.timerControl();
    },

    //摇杆类
    initRocker(rockList) {
      rockList.forEach(i => {
        this[i.name] = nipplejs.create({
          zone: this.$refs[i.name],
          ...i,
        });
        this[i.name]
          .on('start', () => {
            this.operaterCMD = i.name;
            this[i.name].active = true;
          })
          .on('move', this.onMove)
          .on('end', () => {
            this[i.name].active = false;
          });
      });
    },
    //摇杆移动
    onMove(e, data, m) {
      this.rockerKeepPress();
      const X = +data.vector.x.toFixed(2);
      const Y = +data.vector.y.toFixed(2);
      this.cachePosition = [X, Y];
      this.timerControl({ X, Y });
    },

    //摇杆持续按住
    rockerKeepPress() {
      if (this.onPressTimer) {
        clearInterval(this.onPressTimer);
      }
      this.onPressTimer = setInterval(() => {
        if (this[this.operaterCMD].active) {
          this.timerControl({
            X: this.cachePosition[0],
            Y: this.cachePosition[1],
          });
        } else {
          clearInterval(this.onPressTimer);
          this.onPressTimer = null;
        }
      }, this.intervalTime);
    },

    //时间校准, 通信函数入口
    timerControl(data) {
      if (this.timer) {
        return;
      }
      if (!this.oldTime) {
        this.oldTime = +new Date();
        return this.beforeSend(0, data);
      }
      const now = +new Date();
      if (now - this.oldTime < this.intervalTime) {
        return this.beforeSend(this.intervalTime + this.oldTime - now, data);
      }
      return this.beforeSend(0, data);
    },

    //private 帧率控制
    beforeSend(time, data) {
      if (!time) {
        this.msg = noticeServer(this.operaterCMD, data);
        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.timer = null;
        }, this.intervalTime);
      } else {
        this.timer = setTimeout(() => {
          this.msg = noticeServer(this.operaterCMD, { X, Y });
          clearTimeout(this.timer);
          this.timer = null;
        }, time);
      }
    },

    //双指缩放类
    setGesture() {
      const that = this;
      function getDistance(p1, p2) {
        const x = p2.pageX - p1.pageX;
        const y = p2.pageY - p1.pageY;
        return Math.sqrt(x * x + y * y);
      }
      let start = [];
      ['touchstart', 'gesturestart'].forEach(i => {
        document.addEventListener(
          i,
          function(e) {
            if (e.touches.length >= 2) {
              that.istouch = true;
              start = e.touches; // 得到第一组两个点
            }
          },
          { passive: false }
        );
      });
      ['touchmove', 'gesturemove'].forEach(i => {
        document.addEventListener(
          i,
          function(e) {
            e.preventDefault();
            if (e.touches.length >= 2 && that.istouch) {
              const now = e.touches; // 得到第二组两个点
              const scale =
                getDistance(now[0], now[1]) / getDistance(start[0], start[1]);
              that.operaterCMD = 'scale';
              that.timerControl({ scale: scale.toFixed(2) });
            }
          },
          { passive: false }
        );
      });
      ['touchend', 'gestureend'].forEach(i => {
        document.addEventListener(
          i,
          function() {
            if (that.istouch) {
              that.istouch = false;
            }
          },
          { passive: false }
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  height: 100%;
}
.btn-div {
  position: absolute;
  bottom: 18%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 25%;
  display: flex;
  justify-content: space-between;
  .btn {
    cursor: pointer;
    padding: 8px 30px;
    background-color: #ccc;
    color: #777;
    border-radius: 5px;
  }
}
</style>
