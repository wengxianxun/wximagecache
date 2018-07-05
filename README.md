# wximagecache
微信小程序具有缓存功能的 image 标签插件


使用方法：

1. 把component目录下的wxximage自定义组件引入到您的项目component下。
2. 把utils目录下的file.js文件引入到你的项目utils下。
3. 在你需要使用的pages下的.json文件中引入wxximage组件

```
  "usingComponents": {
    	"wxximage": "../../component/wxximage/wxximage"
  }
```

4. 在.wxml文件中使用wxximage插件展示图片
	
```

 <wxximage wxximageclass="自定义样式"  imageid="图片key唯一标记" imageurl="图片url"> </wxximage>
 
```
 
5.具体效果请运行demo查看
