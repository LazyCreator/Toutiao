<template>
  <div class="home-container">
    <!-- 头部区域 -->
    <van-nav-bar title="黑马前端" fixed placeholder />

    <!-- 导入、注册，并使用ArticleInfo 组件 -->
    <!-- 在使用组件的时候，如果某个属性名是“小驼峰”形式，则绑定属性的时候，建议改写成“连字符”格式。例如 -->
    <!-- cmtCount 建议写成 cmt-count -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
      <van-list v-model="loading" :finished="finished" finished-text="--我是有底线的--" @load="onLoad">
        <ArticleInfo v-for="item in  artlist " :key='item.id' :title="item.title" :author="item.aut_name" :cmt-count="item.comm_count" :time="item.pubdate" :cover="item.cover"></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 按需导入API接口
import { getArticleListAPI } from '@/api/articleAPI.js'
import ArticleInfo from '@/components/Article/ArticleInfo.vue'

export default {
  name: 'MyHome',
  data() {
    return {
      // 页码值
      page: 1,
      // 每页显示多少条数据
      limit: 10,
      // 文章的数组
      artlist: [],
      // 是否正在加载下一页数据，如果 loading 为 true ，则不会反复触发 load 事件
      // 每当下一页数据请求回来之后，千万要记得，把loading 从 true 改为 false
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，一定要把finished 改成true
      finished: false,
      // 是否正在下拉刷新
      isLoading: false
    }
  },
  created() {
    this.initArticleList()
  },
  methods: {
    // 封装获取文章列表数据的方法
    async initArticleList(isRefresh) {
      // 发起GET请求，获取文章的列表数据
      const { data: res } = await getArticleListAPI(this.page, this.limit)

      // 如果是上拉加载更多，那么应该是：
      // this.artlist = [旧数据在前，新数据在后]
      if (isRefresh) {
        // 证明是下拉刷新 新数据在前，旧数据在后
        this.artlist = [...res, ...this.artlist]
        this.isLoading = false
      } else {
        // 证明是上拉加载更多
        this.artlist = [...this.artlist, ...res]
        this.loading = false
      }

      if (res.length === 0) {
        // 证明没有下一页数据了，直接把finished 改成true，表示数据加载完了
        this.finished = true
      }
    },
    // 只要onLoad被调用，就应该请求下一页数据
    onLoad() {
      console.log('粗发了load事件')

      // 1.让页码值加一
      this.page++
      // 2.重新请求接口获取数据
      this.initArticleList()
    },
    // 下拉刷新的处理函数
    onRefresh() {
      console.log('下拉刷新了')
      // 1.让页码值加一
      this.page++
      // 2.重新请求接口获取数据
      this.initArticleList(true)
    }
  },
  components: { ArticleInfo }
}
</script>

<style lang="less" scoped >
</style>
