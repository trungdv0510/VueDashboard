import axios from 'axios';
import { getCookie } from "@/utils/CookiesUtils.js";
import {constanst} from "@/utils/Contains.js"
axios.defaults.baseURL = `${constanst.pathServer}api/`;
axios.defaults.headers.common['Authorization'] = "Bearer " + getCookie(constanst.Authorization);
