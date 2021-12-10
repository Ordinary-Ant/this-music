# thie-music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### vue3注意点
* ref和reactive：基本类型使用ref，对象类型使用reactive。主要用于将其转换为响应式数据

* 传送门Teleport标签：主要用于将<Teleport>标签下的所有子标签使用to="标签名"的方式添加到指定标签下

* 部分全局API改为实例API：例如：Vue.component=>app.component / Vue.directive=>app.directive / Vue.mixin=>app.mixin / Vue.use=> app.use; 注意：Vue.filter在vue3中已经被移除了

* 全局API重构为可做摇树优化：在vue2中不少的global-api是作为静态函数挂在构造上的，例如Vue.nextTick().即不管你是否在代码中使用过这些global-api,最终的打包都会将他们带上.vue3使用import {nextTick} from 'vue'按需加载来将这些dead code排除掉

* v-model变化：在vue3中如果直接在组件上使用v-model,那么相当于:modelValue=modelValue + @update:modelValue="事件"; 注意modelValue是默认的属性名，可以自定义其他的属性名。组件内需要使用props + $emit('update:modelValue',属性变化)来进行回应

* 渲染函数变化：vue2的写法：render(h){return h(标签名,{属性},[子标签])} ： vue3的写法：render(){return h(标签名,{属性},[子标签])}; 注意：在vue3渲染函数中的事件不再需要使用"on:事件名:fn"，而是直接使用"on事件:fn"; 在vue2的渲染函数中想要得到具名插槽的内容需要使用this.$scopedSlots.插槽名，默认插槽使用this.$slots.default。但在vue3中直接废除了作用域插槽，并且所有插槽都使用this.$slots.插槽名()的方式获取内容

* 函数式组件：不推荐使用，因为性能提示不大。 

* 异步组件变化：与vue2不同，vue必须使用一个defineAsyncComponent() 将 () => import('路径')包裹起来，以达到区分普通组件和异步组件的作用

* data必须是一个函数，不再可以是对象

* 动态组件变化：vue3动态组件上的 is="属性名" 必须写在component标签上，如果想写在其他标签上，需要使用v-is="属性名"

* 自定义指令钩子函数的变化：bind -> beforeMount; inserted -> mounted; beforeUpdate; componentUpdated -> updated; beforeUnmount; unbind -> unmounted

* transition类名变化：v-enter => v-enter-from; v-leave => v-leave-from

* 根容器变化：vue2的根容器会被根组件的模板替换掉，而vue3则不会，vue3会使用innerHTML方式将根组件的模板插入根容器内

* 其他变化：$on/$once/$off被移除，过滤器被移除

* 子组件收集父组件写在组件标签的所有属性可以使用v-bind="$attrs", 收集所有绑定事件则可以使用v-on="$listeners"


### vue-router4注意点

* 动态路由(由于某些功能后续再添加的路由信息可以通过此方式实现)：router.addRoute({path:"/xxx",name:'xxx',component:()=>import("./xxx")})

* isReady()替换onReady(),且isReady()返回的是promise类型。此函数主要用于底层服务端渲染的就绪部署，vue-router4路由导航都是异步的即都返回promise，所以如果要等待就绪的信息就需要使用isReady().then((onSuccess,OnError)=>{})

* vue-router中的*号通配符被移除（以前通常用于跳转到错误页）

* keep-alive和transition不能再用在router-view外部，而必须用在内部，keep-alive语法修改为<router-view v-slot="{Component}"><keep-alive><component :is="Component"/></keep-alive>

* router-link标签移除了append(追加路径)、tag(修改渲染标签)、event(为修改后的渲染标签添加触发事件)、exact(完全匹配逻辑)属性
** append实现方式为手动实现:<router-link :to="append($route.path, '要跳转的路由url')"></router-link> 注意append需自行编写
** tag/event实现方式为<router-link to="/xx" custom v-slot="{navigate}"><修改后的渲染标签 @事件></></router-link>即使用自定义方式将路由跳转到一个插槽上，注意vue-router4中插槽的参数可以通过v-slot="{navigate}"作用域插槽的方式全部解构出来

* mixins(混入)中的路由守卫将被忽略，官方仍在处理

* match方法被移除，被resolve替代

* router.getMatchedComponents()被移除，可以通过访问计算属性router.currentRoute.value.matched来获取匹配的组件来进行操作

* 所有路由导航均为异步操作，所以有些操作可能会需要先就绪处理后(isReady())才进行挂载，例如首屏导航时的动画效果

* router的parent被移除，但可以通过this.$route.matched[this.$route.matched.length - 2]取得

* pathToRegexpOptions选项被strict取代(严格模式)，caseSensitive选项被sensitive取代(大小写敏感)

* routes选择为必填项，哪怕是一个空数组

* 当路由跳转到不存在命名路由时不再跳回根路径，而是直接报错

* 当命名子路由的path为空时不再追加/，也就是说以前子路由如果为空时是默认有个/的，现在没有了。目前最大的问题就是回导致重定向redirect找不到位置，必须写完整的路径才行，即父路由路径/子路由组件

* $route参数编码行为：path/fullpath不再做解码、hash仍会解码、push/resolve/replace/字符串参数/对象参数path必须编码、params仍会被解码、query中的+号不做处理，仍旧是个+

### vuex4注意点

* 基本无大变化，新增了createStore({})这个初始化方法可替代new vuex({})

### vite
#### 特点：开发阶段用native ES Module特性导入组织代码，所有请求实时就能得到，按需编译，之后直接进行热模块替换，基本无需打包，所以具有光速启动、热模块替换、按需编译三大特点