export interface ISearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface IParams {
  params: Promise<{ id: string }>;
}

export type pageQueryProps = string | string[] | undefined;

export interface ISearchParamsInfo {
  currPage: number;
  listNum: number;
}

export type UserFormType = "add" | "edit" | "readOnly" | "list";

export type roleType = "super" | "admin" | "nomal";

export const roleList = ["super", "admin", "nomal"];

export interface IUser {
  id: number;
  name: string;
  src: string;
  phone: string;
  email: string;
  position: string;
  duty: string;
  role: roleType;
  addr?: string;
  addrDetail?: string;
}

export const userListArr: IUser[] = [
  {
    id: 1,
    name: "홍길동",
    src: "",
    email: "123@naver.com",
    phone: "010-1234-1234",
    position: "부목사",
    duty: "청년부",
    role: "super",
    addr: "",
    addrDetail: "",
  },
  {
    id: 2,
    name: "홍길동",
    src: "",
    email: "123@naver.com",
    phone: "010-1234-1234",
    position: "부목사",
    duty: "청년부",
    role: "admin",
    addr: "",
    addrDetail: "",
  },
  {
    id: 3,
    name: "홍길동",
    src: "",
    email: "123@naver.com",
    phone: "010-1234-1234",
    position: "부목사",
    duty: "청년부",
    role: "nomal",
    addr: "",
    addrDetail: "",
  },
];
