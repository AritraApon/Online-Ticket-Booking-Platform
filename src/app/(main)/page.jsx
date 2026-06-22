import AdvertiseCard from "@/Components/Main/Home/AdvertiseCard/AdvertiseCard";
import HeroSlider from "@/Components/Main/Home/Hero/HeroSlider";
import LatestTickets from "@/Components/Main/Home/LatestTickets/LatestTickets";
import { Newsletter } from "@/Components/Main/Home/Newsletter";
import { StatsCounter } from "@/Components/Main/Home/StatsCounter";
import { Testimonials } from "@/Components/Main/Home/Testimonials";
import { WhyChooseUs } from "@/Components/Main/Home/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <HeroSlider />
      <AdvertiseCard/>
      <LatestTickets/>
      <WhyChooseUs/>
      <StatsCounter/>
      <Testimonials/>
      <Newsletter/>

    </div>
  );
}
