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
    <div className='singleSelect__container'>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          375: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}>
        {options.map(({ icon, type }) => (
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <button
              key={type}
              className='singleSelect__options'
              onClick={() => onClick(type)}>
              {value === type ? (
                <div className='singleSelect__checked'>
                  <img
                    className='singleSelect__checkedImg'
                    src='./checked.svg'
                  />
                </div>
              ) : null}
              <img className='singleSelect__optionImg' src={icon} />
              <p className='singleSelect__optionType'>{type}</p>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
