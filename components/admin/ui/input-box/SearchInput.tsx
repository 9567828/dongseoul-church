import { InputHTMLAttributes } from 'react';
import style from './input.module.scss';

interface Iinput extends InputHTMLAttributes<HTMLInputElement> {
  variants: 'header' | 'content';
}

export default function SearchInput({ variants, ...props }: Iinput) {
  return (
    <div className={`${style['search-default']} ${style[variants]}`}>
      <label htmlFor={variants === 'header' ? 'headerSearch' : 'innerSearch'} className={style['search-label']}></label>
      <input
        {...props}
        type="search"
        id={variants === 'header' ? 'headerSearch' : 'innerSearch'}
        placeholder={variants === 'header' ? '빠른검색' : variants === 'content' ? '검색하실 내용을 입력하세요' : ''}
      />
    </div>
  );
}
