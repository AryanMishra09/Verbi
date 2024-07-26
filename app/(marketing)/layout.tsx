import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children : React.ReactNode;
};

const MarketingLayout = ({children} : Props) => {
  return(
    <div className="min-h-screen flex flex-col">
      <div className="flex">
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