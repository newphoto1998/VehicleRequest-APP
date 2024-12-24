export interface userLogin {
  username?: string;
  password?: string;
}

export interface userInfo {

  user_info:empDetail;

 
}

export interface responeApi {
  status: number;
  message: string;
  data: userInfo;
}

export interface empDetail {
  empCode?: string;

  fname?: string;

  lname?: string;
  fullName?: string;

  shortName?: string;

  email?: string;

  position?: string;

  dvcd?: string;

  cost_Center?: string;

  resign_Date?: string;

  depT_CD?: string;

  depT_Short?: string;

  depT_Long?: string;

  secT_CD?: string;

  secT_Short?: string;

  secT_Long?: string;

  empPic?: string;

  token?: string;
}
