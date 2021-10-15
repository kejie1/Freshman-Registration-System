# 一、管理员设置

## 1.路由设置

在`src/router/index`中加入，登录后默认跳转管理员设置(后期会修改)

```js
  {
    path: '/',
    component: Layout,
    redirect: '/plumber',
    children: [
      {
        path: 'plumber',
        component: () => import('@/views/plumber/index'),
        name: 'plumber',
        meta: { title: 'Plumber', icon: 'plumber', affix: true }
      }
    ]
  },
```

2.页面显示

