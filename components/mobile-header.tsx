import { MobileSidebar } from "./mobile-sidebar"

export const MobileHeader = () => {
    return (
        <nav
            className="lg:hidden bg-black/40 backdrop-blur-lg px-6 h-[50px] flex items-center border-b-[1px] border-neutral-900 fixed top-0 w-full z-50"
        >
            <MobileSidebar />
        </nav>
    )
}