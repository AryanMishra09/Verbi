import { Loader2 } from "lucide-react";

const loading = () => {
    return (
        <div className="h-full w-full mx-[50%] my-[25%]">
            <Loader2 className="h-6 w-6 text-white animate-spin"/>
        </div>
    )
}

export default loading;