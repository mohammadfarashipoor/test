import { AXIOS } from "@/config/axios";
import { ThemeActionTypes } from "../theme/theme.actiontype";

export const UpdateTheme = (payload: PaletteColorType) => (dispatch: any) => {
    dispatch({
        type: ThemeActionTypes.CHANGE_PALLETE,
        payload: payload,
    });

    localStorage.setItem("PALETTE", payload);
};

export const LoadTheme = () => async (dispatch: any) => {
    const themeLocal = localStorage.getItem("PALETTE");

    if (themeLocal === null)
        try {
            const theme = await AXIOS.get("/settings/").then((res) => res.data);
            if (theme && theme[0]?.theme) {
                dispatch({
                    type: ThemeActionTypes.CHANGE_PALLETE,
                    payload: theme[0]?.theme,
                });
                localStorage.setItem(
                    "PALETTE",
                    JSON.stringify(theme[0]?.theme)
                );
            } else {
                console.error("failed loading theme");
            }
        } catch (error) {
            console.error(error);
        }
    else {
        dispatch({
            type: ThemeActionTypes.CHANGE_PALLETE,
            payload: themeLocal,
        });
    }
};
