// 数据类型定义
export interface SingleFunc {
  Name: string;
  Path: string;
}

export interface FuncGroup {
  Name: string;
  Data: SingleFunc[];
}

export interface Link {
  Title: string;
  URL: string;
}

export interface LinkSubGroup {
  Name: string;
  Links: Link[];
}

export interface LinkGroup {
  Name: string;
  Data: LinkSubGroup[];
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message?: string;
}
