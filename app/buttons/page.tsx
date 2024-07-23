import { Button } from "@/components/ui/button";

type Props = {}

const ButtonsPage = () => {
    return(
        <div className="p-4 mx-auto space-y-4 flex flex-col max-w-[200px]">
            <Button variant='default'>Click Me</Button>

            <Button variant='destructive'>Destructive</Button>

            <Button variant='outline'>Outline</Button>
            
            <Button variant='secondary'>Secondary</Button>
            
            <Button variant='ghost'>Ghost</Button>
            
            <Button variant='link'>Link</Button>

            <Button variant='success'>Success</Button>

            <Button variant='super'>Super</Button>

            <Button variant='superOutline'>Super Outline</Button>
        </div>
    ) 
    
}

export default ButtonsPage;