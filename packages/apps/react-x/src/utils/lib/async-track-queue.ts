import { debounce } from 'lodash'

interface RequiredData {
    timestamp: number | string;
}

/**
 * 若 用户在 10ms-490ms的时候关闭了 关闭了浏览器
 * 则 有一些 task 是没有上报的
 */
// 所以 为防止这个结果的出现 要在localStorage去存储，未上报的内容  当 用户再次访问这个特定页面的时候  我再去追加上报

class TaskQueueStorableHelper<T extends RequiredData= any>{
    // 单例模式
    public static getInstance<T extends RequiredData = any>(){
        if(!this.instance){
            this.instance = new TaskQueueStorableHelper<T>();
        }
        return this.instance
        
    }
    private static instance:TaskQueueStorableHelper | null = null;
    private STORAGE_KEY = "luyi_loacl_key"
    protected store:any=null;
    constructor(){
        // 构造的时候，就是页面打开的时候
        // 若此时 localStorage 还有 STORAGE_KEY 的数据 则说明没有上报完
        const loacalStorageVal = localStorage.getItem(this.STORAGE_KEY);
        if(loacalStorageVal){
            // 此处 应该try catch一下
            this.store = JSON.parse(loacalStorageVal)
        }
    }

    get queueData(){
        return this.store?.queueData ||[]
    }
    set queueData(queueData:Array<T>){
        // 若一旦设置了
        this.store = {
            ...this.store,
            queueData:queueData.sort((a,b)=>Number(a.timestamp) - Number(b.timestamp)),
        };
        localStorage.setItem(this.STORAGE_KEY,JSON.stringify(this.store))

    }
}




export abstract class AsyncTrackQueue<T extends RequiredData = any> {
    // 本地存储服务
    private get storableService(){
        return TaskQueueStorableHelper.getInstance<T>();
    }
    // :T|Array<T> 表示 T类型或者 Array
    public addTask(data: T | Array<T>) {
        this.queueData = this.queueData.concat(data)
    }
    // private queue: Array<T> = []

    private get queueData(): Array<T> {
        return this.storableService.queueData;
    }
    private set queueData(value: Array<T>) {
        // set数据时,其实就是添加了一个埋点数据
        this.storableService.queueData = value;
        if (value.length) {
            this.debounceRun();
        }
    }

    protected debounceRun = debounce(this.run.bind(this), 500)

    protected abstract consumeTaskQueue(data: Array<T>): Promise<any>
    // 每500ms  不管addTask多少次 都 跑一下run()
    private run() {
        const currentDataList = this.queueData;
        if (currentDataList.length) {
            this.queueData = [];
            this.consumeTaskQueue(currentDataList)
        }
    }
}