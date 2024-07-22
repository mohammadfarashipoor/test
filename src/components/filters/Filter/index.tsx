import FilterRow from "./FilterRow";
import CloseIcon from "@assets/icons/close.svg";
import { IFilterData, useFilterContext } from "@/context/FilterContext";

interface IFilterModalProps {
  closeModal: () => void;
}
const FilterModal: React.FC<IFilterModalProps> = ({ closeModal }) => {
  const { filters, setFilters } = useFilterContext();

  const addRow = () => {
    const newRow: IFilterData = {
      id: filters.length + 1,
      isOrNot: "",
      tag: "",
      where: "",
    };
    setFilters([...filters, newRow]);
  };

  const handleDelete = (id: number) => {
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    setFilters(updatedFilters);
  };

  const handleUpdate = (item: IFilterData) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === item.id ? item : filter
    );

    setFilters(updatedFilters);
  };

  return (
    <div className="bg-white py-4 px-5 border border-red-50 rounded-lg min-h-[206px] shadow-newTask w-fit min-w-[720px] absolute top-36 right-[550px] z-50">
      <div className="flex justify-between items-center mb-3.5">
        <h3 className="text-2xl font-black">فیلتر‌ها</h3>
        <button onClick={closeModal}>
          <img src={CloseIcon} alt="close" />
        </button>
      </div>
      {filters.map((filter) => (
        <div key={filter.id} className="flex flex-col justify-center mb-4">
          <FilterRow
            filterData={filter}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      ))}
      <button onClick={addRow} className="font-black text-xs text-[#208D8E]">
        افزودن فیلتر جدید
      </button>
    </div>
  );
};

export default FilterModal;
