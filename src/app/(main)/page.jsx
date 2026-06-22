import AdvertiseCard from "@/Components/Main/Home/AdvertiseCard/AdvertiseCard";
import HeroSlider from "@/Components/Main/Home/Hero/HeroSlider";
import LatestTickets from "@/Components/Main/Home/LatestTickets/LatestTickets";


export default function Home() {
  return (
    <div>
      <HeroSlider />
      <LatestTickets/>
      <AdvertiseCard/>
    </div>
  );
}
