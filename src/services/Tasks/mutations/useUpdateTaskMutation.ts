import { AXIOS } from "@/config/axios";
import { useMutation } from "react-query";
import { ReactQueryKeys } from "../keys";
import { ITasksRequest, ITasksResponse } from "@/types/api.types";

const fetcher = async (data: ITasksRequest): Promise<ITasksResponse> => {
    const { project, board, task_id, ...taskData } = { ...data };

    if (!project || !project.id || !project.idx || !task_id) {
        return Promise.reject("Project or task is undefined");
    }

    const space_id = project.idx;
    const project_id = project.id;
    const board_id = board;

    try {
        const API_PATH = `/workspaces/${space_id}/projects/${project_id}/boards/${board_id}/tasks/${task_id}/`;

        const taskResponse = await AXIOS.patch(API_PATH, taskData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return taskResponse.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const useUpdateTasksMutation = () => {
    return useMutation<ITasksResponse, any, ITasksRequest, any>(fetcher, {
        mutationKey: ReactQueryKeys.Tasks,
    });
};
