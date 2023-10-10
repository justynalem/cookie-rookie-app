import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import "./MultipleSelectIconList.scss";

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
    <div className='multipleSelect__container'>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        style={{
          width: "100%",
        }}
        breakpoints={{
          320: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          375: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 3.5,
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
            <SwiperSlide
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <button
                key={type}
                className='multipleSelect__options'
                onClick={() => (isSelected ? onRemove(type) : onAdd(type))}>
                {isSelected ? (
                  <div className='singleSelect__checked'>
                    <img
                      className='singleSelect__checkedImg'
                      src='./checked.svg'
                    />
                  </div>
                ) : null}
                <img className='multipleSelect__optionImg' src={icon} />
                <p className='multipleSelect__optionType'>{type}</p>
              </button>
            </SwiperSlide>
          );
        })}
        {custom ? (
          <SwiperSlide
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <button
              key='type'
              className='multipleSelect__options'
              onClick={handleAddCustom}>
              <img className='multipleSelect__optionImg' src='/add.svg' />
              <input
                placeholder='Add Custom'
                ref={ref}
                className='multipleSelect__optionInput'
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
