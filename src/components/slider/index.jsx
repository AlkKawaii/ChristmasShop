import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'

import styles from './Slider.module.css';

export default function Slider({ images = [] }) {
  return <div>
    <Swiper slidesPerView={1} >
        <SwiperSlide><img src="https://picsum.photos/200/300?random=1" alt="imagem" /></SwiperSlide>
        <SwiperSlide><img src="https://picsum.photos/200/300?random=2" alt="imagem" /></SwiperSlide>
        <SwiperSlide><img src="https://picsum.photos/200/300?random=3" alt="imagem" /></SwiperSlide>
        <SwiperSlide><img src="https://picsum.photos/200/300?random=4" alt="imagem" /></SwiperSlide>
    </Swiper>
  </div>;
}
