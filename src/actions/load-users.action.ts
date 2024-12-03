import axios from "axios"
import { UserListResponse } from "../interfaces/reqres.response"

export const loadUsersAction = async(page: number) => {

    try {
        const {  data } = await axios.get<UserListResponse>(`https://reqres.in/api/users?page=${page}`);

        return data.data;
    } catch (error) {
      return []
      console.log(error);  
    }
}