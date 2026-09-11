import { FC } from 'react';
import Hero from '../components/home/Hero';
import QuickHotlines from '../components/home/QuickHotlines';
import ServicesSection from '../components/home/ServicesSection';
import InfoWidgets from '../components/home/InfoWidgets';
import PromotionBanner from '../components/home/PromotionBanner';
import JoinUsBanner from '../components/home/JoinUsBanner';
import GovernmentSection from '../components/home/GovernmentSection';
import WorkInProgressPopup from '../components/home/WorkInProgressPopup';

const Home: FC = () => {
  return (
    <main className='grow'>
      <WorkInProgressPopup />
      <Hero />
      <QuickHotlines />
      <ServicesSection />
      {/* <NewsSection /> */}
      <InfoWidgets />
      <JoinUsBanner />
      <PromotionBanner />
      <GovernmentSection />
    </main>
  );
};

export default Home;
