import React, { ChangeEventHandler, FC, FocusEventHandler, Fragment, KeyboardEventHandler, useRef, useState } from 'react';
import { localStore } from '../../utils/store';

type Props = {
    name?: string
}

const Search: FC<Props> = (props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    // input 的内容
    const [inputValue, setInputValue] = useState<string>();
    // 下拉框的数据
    const [ relatedList, setRelatedList ] = useState<Array<string>>([]);
    // 当前箭头的位置
    const [ selectedIdx, setSelectedIdx ] = useState<number>(-1)


    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        setRelatedList([]);
        setSelectedIdx(-1)
    };
    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
        handleFocus(e);
    };
    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
        // 鼠标放上去的时候，我要去取一下历史数据。
        // [616, 618, 617, 616]
        setRelatedList((localStore.get('historyList') || [])
        .reduce((total: Array<string>, item: string) => total.find((i : string) => i === item) ? total : [...total, item], [])
        .filter((item: string) => Boolean(item))
        .filter((item: string) => (!e.target.value) || (e.target.value && item.includes(e.target.value)))
        .slice(0, 5)
        )
        // setRelatedList();
    };
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        switch(e.key) {
            case 'Enter':
                {
                    const currentValue = (selectedIdx !== -1) ?  relatedList[selectedIdx] : inputValue;
                    localStore.unshift('historyList', currentValue);
                    setInputValue(relatedList[selectedIdx]);
                    setRelatedList([])
                    break;
                }
            case 'ArrowUp':
                {
                    if(relatedList.length) {
                        // 说明历史记录有东西了
                        if(selectedIdx === 0) {
                            setSelectedIdx(relatedList.length - 1)
                        } else {
                            setSelectedIdx((n) => n-1);
                        }
                    }
                    break;
                }
            case 'ArrowDown':
                {
                    if(relatedList.length) {
                        // 说明历史记录有东西了
                        if(selectedIdx < relatedList.length - 1) {
                            setSelectedIdx((n) => n+1);
                        } else {
                            setSelectedIdx(0)
                        }
                    }
                    break;
                }
            default:
                break;
        } 
        
    };

  return (
    <Fragment>
        <div className='flex items-center relative'>
            <input
                className='w-96 h-10 border border-gray-100 px-4 rounded-full bg-gray-50 '
                placeholder='怎么提高你的气场'
                onBlur={handleBlur}
                onChange={handleChange}
                onFocus={handleFocus}
                value={inputValue}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <button
                onClick={() => {
                    localStore.push('demo', 'aaaaa');
                }}
                className='w-24 h-10 mx-4 py-2 px-4 bg-blue-500 text-white font-medium hover:bg-blue-600 rounded-full'
            >提问</button>
        </div>
        {/* 依赖于数组要不要放东西 */}
        { Boolean(relatedList.length) && <div 
        style={{ left: inputRef.current?.getBoundingClientRect()?.x }}
        className='fixed top-16 z-10 w-96 bg-white border border-gray-200 rounded-md p-2 shadow-sm '>
            {
                relatedList.map((item, idx) => 
                    <div key={item}
                    className={` ${idx === selectedIdx? "text-blue-600 bg-gray-100":"text-black"}  h-8 rounded-md px-2 flex items-center`}
                    >
                        {item}
                    </div>)
            }
        </div>}
    </Fragment>
  )
}

export default Search;