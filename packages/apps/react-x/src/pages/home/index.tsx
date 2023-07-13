import React, { useEffect, useState } from 'react'
import Navigation from '../../components/navigation';
import Card from '../../components/card';
import Creation from './siderPages/Creation';
import AdvancedBtns from './siderPages/AdvancedBtns';
import SelfFunctions from './siderPages/SelfFunctions';
import CommandList from './tabPages/commandList';
import { Switch } from '@headlessui/react'
import TabPage from './tabPages';

const Home = () => {
    const [hide, setHide] = useState(true);
    const [enabled, setEnabled] = useState(false)
    useEffect(() => {
        if (enabled) {
            const html = document.getElementsByTagName('html')[0];
            html.setAttribute('data-theme', 'dark');
        } else {
            const html = document.getElementsByTagName('html')[0];
            html.setAttribute('data-theme', '');
        }
    }, [enabled])

    const handleChange = (isHide: boolean) => {
        setHide(isHide);
    }
    return (
        <div className=' bg-gray-100'>
            <Navigation className="sticky top-0" hide={hide} />
            <div className='mx-auto w-320 max-w-6xl flex my-2 px-20'>
                <Card className="w-2/3">
                    <TabPage onChange={handleChange} />
                </Card>
                <div className='w-1/3'>
                    <Card className='w-full'>
                        <Creation />
                    </Card>
                    <Card className='w-full'>
                        <AdvancedBtns />
                    </Card>
                    <Card className='w-full '>
                        <SelfFunctions />
                    </Card>
                </div>
            </div>
            <div className=' fixed right-32 top-16 z-50'>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span className="sr-only">Enable notifications</span>
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default Home;