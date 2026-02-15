import { mockEventList } from "./mock";

const IS_MOCK = true;

export const getEventList = async() => {
    if(IS_MOCK){
        return Promise.resolve(mockEventList);
        // 使用Promise.resolve返回一个成功的Promise对象,模拟真实请求场景
    }
    // TODO:请求真实数据
    // api示例
    const response = await fetch('/api/event/list');
    const data = await response.json();
    return data;
}