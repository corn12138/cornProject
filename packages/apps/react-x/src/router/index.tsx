import { Outlet, RouteObject } from "react-router-dom";
import React from 'react';
import Home from "../pages/home";
import CommandList from "../pages/home/tabPages/commandList";

interface extraBizObject {
    biz_code?: string,
    biz_name?: string,
}

export const router: Array<RouteObject & extraBizObject> = [
    {
        path: '/', element: <Home /> , biz_code: 'root', biz_name: '首页',
        children: [
            { path: '/follow', element: <div>关注页面开发中，敬请期待。</div>, },
            { path: '', element: <CommandList /> },
            { path: '/hot', element: <div>热榜页面开发中，敬请期待。</div> },
            { path: '/zvideo', element: <div>视频页面开发中，敬请期待。。</div> },
        ],
    },
    {
        path: '/xen', element: <div>会员页面开发中，敬请期待。。</div>,
        biz_name: '会员',
    },
    {
        path: '/explore', element: <div>探索页面开发中，敬请期待。。</div>,
        biz_name: '发现',
    },
    {
        path: '/question', element: <div>问题页面开发中，敬请期待。。</div>,
        biz_name: '等你来答'
    },
]