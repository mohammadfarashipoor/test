import React, {
    ReactElement,
    ReactNode,
    useContext,
    useRef,
    useState,
} from "react";
import SideBar from "@components/dashboard/SideBar";
import OptionBar from "@components/dashboard/OptionBar";
import { useTheme } from "@/context/ThemeContext";
import { NewTask } from "@/pages";
import Plus from "@assets/icons/Plus-white.svg";
import useClickOutside from "@/hooks/useClickOutside";
import { AppContext } from "@/context/store";
import { useNewTask } from "@/context/NewTaskContext";
import NewWorkSpace from "@/components/newWorkspace/NewWorkSpace";
import NewProject from "@/components/newProject/NewProject";

interface IDashboardLayoutProps {
    children?: ReactNode;
}

const DashBoardLayout: React.FC<IDashboardLayoutProps> = ({
    children,
}): ReactElement => {
    const { showTaskModal, setShowTaskModal } = useNewTask();
    const modal = useRef(null);
    const { theme }: any = useTheme();
    const { state } = useContext(AppContext);

    const [showSpaceModal, setShowSpaceModal] = useState(false);
    const [showProjectModal, setShowProjectModal] = useState(false);
    useClickOutside([modal], () => {
        setShowTaskModal(false);
    });

    return (
        <div className={`rtl h-[100vh] flex  ${theme} relative`}>
            <SideBar
                setShowSpaceModal={setShowSpaceModal}
                setShowProjectModal={setShowProjectModal}
            />
            <div className="w-[100%] h-[100vh]">
                <OptionBar />
                <div
                    className="flex overflow-auto pl-[300px] max-h-[83vh]"
                    style={{
                        width: "calc(100vw-350px)",
                    }}
                >
                    {children}
                </div>
            </div>
            {showSpaceModal && <NewWorkSpace handleClose={setShowSpaceModal} />}
            {showProjectModal && (
                <NewProject handleClose={setShowProjectModal} />
            )}
            {showTaskModal && (
                <div
                    className=" backdrop-blur-sm flex justify-center items-center  text-[#1E1E1E] modal  z-[999]"
                    dir="ltr"
                    ref={modal}
                >
                    <NewTask handleClose={setShowTaskModal} />
                </div>
            )}
            <button
                className="text-white text-[14px] px-[12px] py-[8px] rounded-[6px] absolute bottom-10 left-12 flex items-center"
                onClick={() => {
                    setShowTaskModal((pervState) => !pervState);
                }}
                ref={modal}
                style={{ backgroundColor: state.theme }}
            >
                <img src={Plus} alt="add" className="noFilter" />
                ساختن تسک
            </button>
        </div>
    );
};

export default DashBoardLayout;
