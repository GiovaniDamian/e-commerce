
import Image from 'next/image';
export default function UserInfo() {
    return (
        <div className="text-gray-400 pl-1 text-xsm">
            <Image
                key={'3d-cub'}
                src={`/images/cubo-3d.png`}
                alt={`3D`}
                width={500}
                height={500}
                className="w-12 h-12 object-cover m-0.5 cursor-pointer"
                priority={true}
            />
            <div className='absolute top-30 text-xss hidden' title="3d ícones">3d ícones criados por Khoirul Huda - Flaticon acessível em https://www.flaticon.com/br/icones-gratis/3d</div>
            
            <div className="pl-2 m-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5" />
                </svg>
            </div>
        </div>
    )
}
