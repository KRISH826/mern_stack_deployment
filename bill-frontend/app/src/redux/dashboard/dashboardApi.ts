import http from "@/services/http"

export const getBillStatsApi = async() => {
    const response = await http.get('/stats/totalbills');
    return response.data;
}

export const getChallanStatsApi = async() => {
    const response = await http.get('/stats/totalchallans');
    return response.data;
}

export const getNewBillsStatsApi = async() => {
    const response = await http.get('/stats/newbills');
    return response.data;
}
export const getGrowthRateStatsApi = async() => {
    const response = await http.get('/stats/growthrate');
    return response.data;
}

export const perfomanceChartDataApi = async (timeRange: string) => {
    const response = await http.get(`/stats/billChartData?range=${timeRange}`);
    return response.data;
}

export const counterChartApi = async() => {
    const response = await http.get('/stats/pieChartData');
    return response.data;
}

export const getRecentBillsApi = async () => {
    const response = await http.get('/stats/recentbills');
    return response.data;
}