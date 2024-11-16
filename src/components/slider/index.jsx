import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Slider.module.css';

export default function Slider({ content = [] }) {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Autoplay]}
        className={styles.slider}>
        {content.map((content, i) => (
          <SwiperSlide key={i}>{content}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
