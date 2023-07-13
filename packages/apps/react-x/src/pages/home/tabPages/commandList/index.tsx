import React, { FC, MouseEventHandler, useRef, useState, useEffect, RefObject } from 'react';
import commandListData from './mock';
import { sendLog } from '../../../../utils/lib/log';
interface DataProps {
    item: any
}
const CommandData: FC<DataProps> = ({ item }) => {
    const [selected, setSelected] = useState<boolean>(false);
    const handleClick: MouseEventHandler<Element> = (event) => {
        event.preventDefault();
        setSelected(!selected);
    }

    // 埋点
    useEffect(() => {
        sendLog({
            msg:item?.target?.question?.title || item?.target?.title
        })
    }, [])

    return <div className='flex flex-col items-start p-4 border-b'>
        <div className='h-auto flex justify-start'>
            <a className='font-bold text-lg ledning-10' href='/'>
                {
                    item?.target?.question?.title || item?.target?.title
                }
            </a>
        </div>
        <div className='leading-6'>
            {
                selected ?
                    <div dangerouslySetInnerHTML={{ __html: item?.target?.content }}></div>
                    : <a href='/' onClick={handleClick}
                        className="cursor-pointer hover:text-gray-600 text-gray-800 "
                    >
                        {item?.target?.excerpt.substring(0, 80) + '...'}
                        <span className='text-base leading-7 text-blue-500'>阅读全文 &gt;</span>
                    </a>
            }
        </div>
        <div className={'flex bg-white w-full ' + (selected ? 'bottom-0 shadow-sm border-t sticky' : '')}>
            <div className='h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                    赞同
                </span>
            </div>
            <div className='h-10 rounded-md bg-blue-100 text-blue-500 p-2 m-2 inline-flex'>
                <span className='inline-flex'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 16" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                </span>
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                &nbsp; {item?.target?.comment_count} 条评论
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                收藏
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                喜欢
            </div>
            <div className='font-base text-gray-400 p-2 m-2 inline-flex'>
                <svg width="1.2em" height="1.2em" viewBox="0 -2 24 24" data-new-api="ChatBubbleFill24" data-old-api="Comment" className="Zi Zi--Comment Button-zi" fill="currentColor"><path d="M12 2.75a9.25 9.25 0 104.737 17.197l2.643.817a1 1 0 001.25-1.25l-.8-2.588A9.25 9.25 0 0012 2.75z" fillRule="evenodd" clipRule="evenodd"></path></svg>
                分享
            </div>
            {
                selected && <div onClick={handleClick} className="font-base text-stone-500 p-2 m-2 inline-flex cursor-pointer">
                    <span className='inline-flex'> 收起</span>
                </div>
            }
        </div>
    </div>
}
// 方式1：类似于 副作用/effect 的一个 use API 
// useEffect (fn, [])
// useRefInsObsEffect(fn, ref)
function useRefInsObsEffect(fn: (b: boolean) => void, scrollRef: RefObject<HTMLDivElement>) {
    useEffect(() => {
        let intersectionObserver: IntersectionObserver | undefined
            = new IntersectionObserver(function (entries) {
                // 我知道我要变化的时候 , 闭包陷阱
                fn(entries[0].isIntersecting);
            });

        scrollRef.current && intersectionObserver.observe(scrollRef.current);

        return () => {
            scrollRef.current && intersectionObserver?.unobserve(scrollRef.current);
            intersectionObserver = void 0;
        }
    }, [])
}

// useState
function useRefInsObsState(scrollRef: RefObject<HTMLDivElement>): Array<any> {
    const [list, setList] = useState(commandListData.slice(0, 5));

    useEffect(() => {
        let intersectionObserver: IntersectionObserver | undefined
            = new IntersectionObserver(function (entries) {
                // 我知道我要变化的时候 , 闭包陷阱
                entries[0].isIntersecting && new Promise<Array<any>>((resolve, reject) => {
                    setTimeout(() => resolve(commandListData), 500)
                }).then((res: Array<any>) => setList(list => [...list, ...res]))
                // if(length>1000) alert('数据太多，请刷新提高体验性能')
            });

        scrollRef.current && intersectionObserver.observe(scrollRef.current);

        return () => {
            scrollRef.current && intersectionObserver?.unobserve(scrollRef.current);
            intersectionObserver = void 0;
        }
    }, []);
    return list
}


const CommandList: FC = () => {

    const scrollRef = useRef<HTMLDivElement>(null)

    // useRefInsObsEffect((bool: boolean) => {
    //     bool && new Promise<Array<any>>((resolve, reject) => {
    //         setTimeout(() => resolve(commandListData), 500)
    //     }).then((res: Array<any>) => setList(list => [...list, ...res]))
    // }, scrollRef)

    const list = useRefInsObsState(scrollRef);

    return (
        <div className='flex flex-col'>
            {/* <button onClick={() => setList([])}>clear</button> */}
            {
                list.map((item, idx) => <CommandData key={item.id + idx} item={item} />)
            }
            <div ref={scrollRef}>loading......</div>
        </div>
    )
}

export default CommandList