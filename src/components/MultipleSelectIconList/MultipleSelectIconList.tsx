import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./MultipleSelectIconList.scss";
import { Pagination } from "swiper/modules";

type MultipleSelectIconListProps = {
  options: { type: string; icon: string }[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  values: string[];
  custom?: boolean;
};

export const MultipleSelectIconList = ({
  onAdd,
  onRemove,
  values,
  options = [],
  custom,
}: MultipleSelectIconListProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleAddCustom = () => {
    const value = ref.current?.value;
    if (!value || !value.trim()) {
      return;
    }
    onAdd(value);
    ref.current.value = "";
  };
  return (
    <div className='btn__list'>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 2.5,
            spaceBetween: 10,
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
        {options.map(({ icon, type }) => {
          const isSelected = values.includes(type);
          return (
            <SwiperSlide>
              <button
                key={type}
                className='btn__meals'
                onClick={() => (isSelected ? onRemove(type) : onAdd(type))}
                style={{
                  border: isSelected ? "1px solid red" : "unset",
                }}>
                <img className='btn__mealImg' src={icon} />
                <p className='btn__mealType'>{type}</p>
              </button>
            </SwiperSlide>
          );
        })}
        {custom ? (
          <SwiperSlide>
            <button key='type' className='btn__meals' onClick={handleAddCustom}>
              <img className='btn__mealImg' src='/add.svg' />
              <input
                placeholder='Add Custom'
                ref={ref}
                className='btn__mealType'
                onClick={e => {
                  e.stopPropagation();
                }}
              />
            </button>
          </SwiperSlide>
        ) : null}
      </Swiper>
    </div>
  );
};
