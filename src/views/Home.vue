<template>
  <div class="home">
    <!-- 导航栏 -->
    <!-- 正在热映 -->
    <div class="section">
      <div class="type-title">
        <span>正在热映</span>
        <div class="more">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in inTheaters" :key="item.doubanId">
          <router-link :to="'/detail/' + item.doubanId">
            <img :src="item.img" />
            <span class="title">
              {{
                item.originalName.length > 8
                  ? item.originalName.substr(0, 8) + '...'
                  : item.originalName
              }}
            </span>
            <span v-if="item.doubanRating == 0" class="no-score">暂无评分</span>
            <div v-else class="star-box">
              <!-- block 是微信提供给我们的一个占位标签,渲染之后页面上看不到 -->
              <span class="orange">★</span>
              <span class="orange">★</span>
              <span class="orange">★</span>
              <span class="gray">★</span>
              <span class="gray">★</span>
              {{ item.doubanRating }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 即将上映 -->
    <div class="section">
      <div class="type-title">
        <span>即将上映</span>
        <div class="more">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in comingSoon" :key="item.doubanId">
          <router-link :to="'/detail/' + item.doubanId">
            <img :src="item.img" />
            <span class="title">
              {{
                item.originalName.length > 8
                  ? item.originalName.substr(0, 8) + '...'
                  : item.originalName
              }}
            </span>
            <span v-if="item.doubanRating == 0" class="no-score">暂无评分</span>
            <div v-else class="star-box">
              <!-- block 是微信提供给我们的一个占位标签,渲染之后页面上看不到 -->
              <span class="orange">★</span>
              <span class="orange">★</span>
              <span class="orange">★</span>
              <span class="gray">★</span>
              <span class="gray">★</span>
              {{ item.doubanRating }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- Top250 -->
    <div class="section">
      <div class="type-title">
        <span>Top250</span>
        <div class="more">更多</div>
      </div>
      <div class="scroll-view">
        <div class="item" v-for="item in top250" :key="item.doubanId">
          <router-link :to="'/detail/' + item.doubanId">
            <img :src="item.img" />
            <span class="title">
              {{
                item.originalName.length > 8
                  ? item.originalName.substr(0, 8) + '...'
                  : item.originalName
              }}
            </span>
            <span v-if="item.doubanRating == 0" class="no-score">暂无评分</span>
            <div v-else class="star-box">
              <!-- block 是微信提供给我们的一个占位标签,渲染之后页面上看不到 -->
              <span class="orange">★</span>
              <span class="orange">★</span>
              <span class="orange">★</span>
              <span class="gray">★</span>
              <span class="gray">★</span>
              {{ item.doubanRating }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData, getImg } from '@/api/movie'
import { reactive, toRefs, onMounted } from 'vue'
export default {
  setup() {
    const state = reactive({
      inTheatersId: [1292052, 30170833, 1296141, 24877005, 1292720, 1292063, 1295124, 1461403],
      ComingSoonId: [1296936, 1306027, 1305539, 1292963, 1937380, 2216828, 1298487, 1295053],
      Top250Id: [27062638, 27062637, 10569151, 26994755, 26655962, 30221777, 26862240, 5403927, 26616166, 25772498],
      inTheaters: [],
      comingSoon: [],
      top250: []
    })
    // 获取数据
    const getInTheatersData = () => {
      state.inTheatersId.forEach(async item => {
        const result = await getData(item)
        const img = await getImg(item)
        result.data.img = img.data.image
        state.inTheaters.push(result.data)
      })
      console.log(state.inTheaters)
    }
    const getComingSoonData = () => {
      state.ComingSoonId.forEach(async item => {
        const result = await getData(item)
        const img = await getImg(item)
        result.data.img = img.data.image
        state.comingSoon.push(result.data)
      })
      console.log(state.comingSoon)
    }
    const getTop250Data = () => {
      state.Top250Id.forEach(async item => {
        const result = await getData(item)
        const img = await getImg(item)
        result.data.img = img.data.image
        state.top250.push(result.data)
      })
      console.log(state.top250)
    }
    onMounted(() => {
      getInTheatersData()
      getComingSoonData()
      getTop250Data()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 15px;
  padding-top: 10px;
  .section {
    padding-top: 44px;
    .type-title {
      height: 20px;
      padding: 0 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 18px;
      }
      .more {
        font-size: 13px;
        color: #43c74d;
      }
    }
    .scroll-view {
      margin-top: 10px;
      /* 要能够滚动 */
      width: 100%;
      display: flex;
      overflow: auto;
      white-space: nowrap;
      height: 100%;
      // margin-left: 5px;
      // margin-right: 5px;
      .item a {
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        padding-left: 5px;
        padding-right: 5px;
        img {
          width: 272px;
          height: 123px;
        }
        .title {
          margin-top: 2px;
          font-size: 12px;
        }
      }
    }
    .scroll-view::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
