import axios from 'axios';
import { getCookie } from "@/utils/cookiesUtils.js";
import {constanst} from "@/utils/contains.js"
axios.defaults.baseURL = 'http://192.168.0.103:8085/api/';
axios.defaults.headers.common['Authorization'] = "Bearer " + getCookie(constanst.Authorization);
