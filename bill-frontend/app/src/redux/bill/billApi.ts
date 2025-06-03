import http from "@/services/http";
import { Bill } from "@/types/statType";

export const getAllBillsApi = async () => {
    const response = await http.get('/bills/getallbills');
    return response.data;
}

export const getAddBillApi = async (data: Bill) => {
    const response = await http.post('/bills/addbill', data);
    return response.data;
}

export const getDeleteBillApi = async (id: string) => {
    const response = await http.delete(`/bills/deletebill/${id}`);
    return response.data;
}

export const getBillApiById = async (id: string) => {
    const response = await http.get(`/bills/getbill/${id}`);
    return response.data;
}

export const getUpdateBillApi = async (id: string, data: Bill) => {
    const response = await http.put(`/bills/updatebill/${id}`, data);
    return response.data;
}