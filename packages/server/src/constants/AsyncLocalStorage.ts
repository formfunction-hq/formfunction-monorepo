import { AsyncLocalStorage } from "async_hooks";

const ASYNC_LOCAL_STORAGE = new AsyncLocalStorage<Map<string, any>>();
export default ASYNC_LOCAL_STORAGE;
