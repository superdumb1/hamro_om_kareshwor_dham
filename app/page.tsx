
import Footer from "@/components/organisms/main/footer/Footer";
import Header from "@/components/organisms/main/header/Header";
import Blogs from "@/app/(public)/blogs/Blogs";
import Events from "@/app/(public)/events/Events";
import Donors from "@/app/(public)/hallofdoners/HOD";
import Homes from "@/components/organisms/page/home/Home";
import Membership from "@/app/(public)/membership/Membership";

export default function Home() {
  return (
  
  <div>
    <Header/>
    <Homes/>
    <Footer/>
  </div>
  );
}
