
import Footer from "@/components/organisms/main/footer/Footer";
import Header from "@/components/organisms/main/header/Header";
import Blogs from "@/app/(public)/blogs/page";
import Events from "@/app/(public)/events/page";
import Donors from "@/app/(public)/hallofdoners/page";
import Homes from "@/components/organisms/page/home/Home";
import Membership from "@/app/(public)/membership/page";

export default function Home() {
  return (
  
  <div>
    <Header/>
    <Homes/>
    <Footer/>
  </div>
  );
}
