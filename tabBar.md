##  wxpy--tabBar组件的抽取使用（父子组件的传值）
#### tabBar.wpy（子组件）
    ①在项目里新建一个文件夹components，然后导入这个tabBar.wpy文件
    <template>
        <!-- 顶部区域 -->
        <view class="tab-bar">
        <block wx:for="{{tabList}}" wx:key="">
            <view @tap="selectItem({{index}})" class="item {{selectIndex==index?'active':''}}">{{item}}</view>
        </block>
        </view>
    </template>
    <script>
        import wepy from 'wepy'
        export default class Example extends wepy.component {
            props = {       
                // 动态传值 类型可以是很多 但是需要自己设置
                tabList: {
                type: Array,
                default: []
                },
                // 双向传值
                selectIndex: {
                type: Number,
                default: 0,
                // 双向 这里必须制定 true
                twoWay: true
                }
            }
            methods = {
                selectItem(index) {
                console.log(index)
                this.selectIndex = index
                }
            }
    }
    </script>
    <style lang='less'>
        .tab-bar {
            height: 100rpx;
            background-color: white;
            display: flex;
            .item {
                flex: 1; 
                text-align: center;
                line-height: 100rpx;
                font-size: 32rpx;
                &.active {
                    color: #eb4450;
                    position: relative;
                    &::after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 12rpx;
                        background-color: #eb4450;
                        bottom: 0;
                        left: 0;
                    }
                }
            }
        }
    </style>
#### index.wpy（父组件）
    ②在父组件中引入import tabBar from '../components/tabBar'
    ③声明组件  components = { tabBar: tabBar };
    ④声明变量 data={
        tabList:['全部','没付钱','已付钱','没钱付'],
        selectIndex:3
    }
    ⑤引用组件 ，以`<script>`脚本部分中所声明的组件ID为名命名自定义标签，从而在`<template>`模板部分中插入组件 
     <view class="tab-box">
        <!-- 顶部区域 -->
        <tabBar :tabList:sync={{tabList}} :selectIndex={{selectIndex}}></tabBar>
        <view class="tab-content">
            <view hidden="{{selectIndex!=0}}" class="item">1</view>
            <view hidden="{{selectIndex!=1}}" class="item">2</view>
            <view hidden="{{selectIndex!=2}}" class="item">3</view>
            <view hidden="{{selectIndex!=3}}" class="item">4</view>
        </view>
    </view>
        
    

