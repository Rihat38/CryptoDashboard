import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../utils/api";
import {INamedObject, ISubscribeResponse, IUnsubscribeResponse} from "../../utils/types";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getUserPredictions = createAsyncThunk(
    'userPredictions/getUserPredictionsStatus',
    async () => {
        return await axios.get<any[]>(BASE_URL + 'user/predictions').then(r=>r.data)
    }
)
