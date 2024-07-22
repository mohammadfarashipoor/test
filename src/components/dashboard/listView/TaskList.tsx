import { ITaskData } from "@/context/types/context.type";
import * as Icon from "../../../assets/icons/icons";
import { AppContext } from "@/context/store";
import { useContext } from "react";
import FlagIcon from "@/components/newTask/Flags/FlagIcon";

const TaskList = ({
  tasks,
  color,
}: {
  tasks: ITaskData[];
  color: string;
}): any => {
  const { state } = useContext(AppContext);
  const thumbnail = state.user.thumbnail || "";
  return tasks ? (
    tasks.map((item: ITaskData) => (
      <div
        key={item.id}
        className=" flex flex-row-reverse py-[7px] mx-8 h-20 items-center justify-between font-[200]"
      >
        <div className="W-[200PX] flex flex-row-reverse items-first align-middle">
          <span
            className="w-4 h-4 rounded-[3px] my-2 mr-6"
            style={{ backgroundColor: color }}
          ></span>
          <p className="text-body-xs m-2">{item.name}</p>
        </div>
        <div className="w-[473px] flex flex-row-reverse justify-between align-middle items-center">
          <span className="w-[70px] text-center text-body-xs">
            {thumbnail ? (
              <img
                src={thumbnail}
                className=" w-[36px] h-[36px] rounded-full noFilter"
              />
            ) : (
              <span className="bg-red-primary w-[36px] h-[36px] rounded-full"></span>
            )}
          </span>
          <span className="w-[70px] text-center text-body-xs align-middle">
            {new Intl.DateTimeFormat("fa-IR").format(new Date(item.deadline))}
          </span>
          <span className="w-[70px] text-center text-body-xs align-middle">
            <FlagIcon priority={item.priority} />
          </span>
          <span className="w-[70px]  text-center text-body-xs align-middle ">
            <img
              src={Icon.Description}
              className="h-10"
              alt="description icon"
            />
          </span>
        </div>
      </div>
    ))
  ) : (
    <p> no task</p>
  );
};

export default TaskList;
