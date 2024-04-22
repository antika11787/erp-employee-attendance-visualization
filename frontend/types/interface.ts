interface FileUpload {
  file?: File | null;
}

interface FileResponse {
  employee: string;
  employee_id: string;
  employee_dates?: string[];
  check_in: string;
  check_out: string;
  worked_hours: number;
  late_hours: number;
  early_leave_hours: number;
  over_time: number;
}
[];

interface FileResponseRaw {
  Employee: String;
  "Employee ID": String;
  "Check In": Date;
  "Check Out": Date;
  "Worked Hours (H.M)": Number;
  "Late Hours (H.M)": Number;
  "Early Leave Hours (H.M)": Number;
  "Over Time (H.M)": Number;
}

interface FileState {
  file: {
    _id: string;
  };
}

interface totalEmployeeResponse {
  total?: number;
}

interface InputFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
}

interface FileHistoryData {
  _id: string;
  file_name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface FormDataLogin {
  email: string;
  password: string;
}

interface SelectOptionProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  name?: string;
  label?: string;
}

interface UserState {
  [x: string]: any;
  username: string;
  email: string;
  token: string;
  role: string;
}

interface updateContentState {
  content: {
    contentLength: number;
  };
}

export type {
  FileUpload,
  FileResponse,
  FileResponseRaw,
  FileState,
  totalEmployeeResponse,
  InputFieldProps,
  FileHistoryData,
  FormData,
  FormDataLogin,
  SelectOptionProps,
  UserState,
  updateContentState,
};
