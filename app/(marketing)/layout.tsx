import { Spotlight } from "@/components/ui/spotlight";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children : React.ReactNode;
};

const MarketingLayout = ({children} : Props) => {
  return(
    <div className="min-h-screen flex flex-col font-creato">
      <Spotlight
        className="-top-40 left-0 md:left-100 md:-top-20"
        fill="white"
      />
      <div className="flex ">
        <Header />
      </div>
      <main className="flex-1 flex felx-col items-center justify-center">
        {children}
      </main>
      <div className="flex">
        <Footer />
      </div>
    </div>
  )
} 

export default MarketingLayout;