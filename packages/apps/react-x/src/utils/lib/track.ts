// 埋点
import { AsyncTrackQueue } from './async-track-queue'
import { v4 as uuid } from 'uuid'
export interface UserTrackData {
    msg?: string;
}

interface TrackData {
    id: string;
    seqId: number
    timestamp: number | string;
}

// 暴露给用户使用的这个  是不关注这个事情的 ，开发只需关注 如何上报
export class BaseTrack extends AsyncTrackQueue<TrackData>{
    private seq = 0
    // track 方法 去追踪一个埋点
    public track(data: UserTrackData) {
        this.addTask({
            id: uuid(),
            seqId: this.seq++,
            timestamp: Date.now(),
            ...data
        })
    }
    // AsyncTrackQueue只是用于批量处理 异步批量的逻辑
    // 但是对于批量要干的事情本身，是不是还是这个业务层要干的事情

    public consumeTaskQueue(data: Array<TrackData>) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data)
            })
        }).then(console.log)
    }
}

/*
BaseTrack --负责埋点的业务层
AsyncTrackQueue  --异步处理的逻辑层
TaskQueueStorableHelper --本地存储服务的兜底逻辑
我们需要把上报的埋点收集起来 然后再一定的时间内 进行上报。

如 500ms 走一波

*/