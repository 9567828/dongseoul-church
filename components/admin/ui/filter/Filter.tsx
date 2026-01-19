import { filterDateType } from "@/utils/propType";
import FilterDate from "./FilterDate";
import FilterWrapper from "./FilterWrapper";
import { tabStatusType } from "../board/BoardTab";

interface IFilterProps {
  onClose: () => void;
  onConfirm: () => void;
  onReset: () => void;
  onDraftRange: (range: filterDateType) => void;
  applyRange: filterDateType;
}

export default function Filter({ onClose, onConfirm, onDraftRange, onReset, applyRange }: IFilterProps) {
  return (
    <FilterWrapper onClose={onClose}>
      <FilterDate onDraftRange={onDraftRange} applyRange={applyRange} onConfirm={onConfirm} onReset={onReset} />
    </FilterWrapper>
  );
}
