import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer
            // className="hidden lg:block h-20 w-full backdrop-blur-lg z-[100] border-t-[1px] border-neutral-500" 
            className="hidden lg:block py-2 px-4 backdrop-blur-lg z-[100] items-center justify-between lg:h-[100px] h-[80px] border-t-2 absolute bottom-0 w-full mx-auto"
        >
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size={'lg'} variant={'ghost'} className="w-full">
                    <Image 
                    src={'/hr.svg'} 
                    alt="Croation" 
                    height={32} 
                    width={40}
                    className="mr-4 rounded-md"
                />
                    Croatian
                </Button>
                <Button size={'lg'} variant={'ghost'} className="w-full">
                    <Image 
                    src={'/es.svg'} 
                    alt="Spanish" 
                    height={32} 
                    width={40}
                    className="mr-4 rounded-md"
                />
                    Spanish
                </Button>
                <Button size={'lg'} variant={'ghost'} className="w-full">
                    <Image 
                    src={'/fr.svg'} 
                    alt="French" 
                    height={32} 
                    width={40}
                    className="mr-4 rounded-md"
                />
                    French
                </Button>
                <Button size={'lg'} variant={'ghost'} className="w-full">
                    <Image 
                    src={'/it.svg'} 
                    alt="italian" 
                    height={32} 
                    width={40}
                    className="mr-4 rounded-md"
                />
                    Italian
                </Button>
                <Button size={'lg'} variant={'ghost'} className="w-full">
                    <Image 
                    src={'/it.svg'} 
                    alt="Japanese" 
                    height={32} 
                    width={40}
                    className="mr-4 rounded-md"
                />
                    Japanese
                </Button>
            </div>
        </footer>
    )
}