import React from "react";
import FeatureCard from "./FeatureCard";

import todo from "../assets/check-list.svg";
import pomodoro from "../assets/pomodoro-technique.svg";
import reward from "../assets/reward.svg";
import meditation from "../assets/meditation.svg";
import journal from "../assets/information.svg";
import paarth from "../assets/paarth.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/Carousel.css";

const Carousel = () => {
  return (
    <div className="carouselWrapper">

     <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  centeredSlides={true}
  loop={true}
  navigation={true}
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },

    480: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },

    1024: {
      slidesPerView: 3,
      spaceBetween: 30,
    },

    1400: {
      slidesPerView: 4,
      spaceBetween: 35,
    },
  }}
>

        <SwiperSlide>
          <FeatureCard
            title="Todo List"
            route="/todo"
            src={todo}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FeatureCard
            title="Pomodoro Timer"
            route="/pomodoro"
            src={pomodoro}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FeatureCard
            title="Meditation Session"
            route="/planner"
            src={meditation}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FeatureCard
            title="Daily Journal"
            route="/journal"
            src={journal}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FeatureCard
            title="Motivational Quotes"
            route="/quotes"
            src={reward}
          />
        </SwiperSlide>

        <SwiperSlide>
          <FeatureCard
            title="MindMate AI"
            route="/mindmate"
            src={paarth}
          />
        </SwiperSlide>

      </Swiper>

    </div>
  );
};

export default Carousel;