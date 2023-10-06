import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./SingleSelectIconList.scss";
import { Pagination } from "swiper/modules";
type SingleSelectIconListProps = {
  options: { type: string; icon: string }[];
  onClick: (value: string) => void;
  value?: string;
};

export const SingleSelectIconList = ({
  onClick,
  value,
  options = [],
}: SingleSelectIconListProps) => {
  return (
    <div className='btn__list'>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 8,
          },
          1680: {
            slidesPerView: 6,
            spaceBetween: 8,
          },
        }}>
        {options.map(({ icon, type }) => (
          <SwiperSlide>
            <button
              key={type}
              className='btn__meals'
              onClick={() => onClick(type)}
              style={{
                border: value === type ? "1px solid red" : "unset",
              }}>
              <img className='btn__mealImg' src={icon} />
              <p className='btn__mealType'>{type}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
