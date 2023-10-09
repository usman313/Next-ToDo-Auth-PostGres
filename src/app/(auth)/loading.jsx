import Loader from '@/components/Loader'

export default function Loading(){
    return (
        <div className=' h-screen w-full flex justify-center items-center'>
            <Loader width={'100'} strokeWidth='15'/>
        </div>
    )
}