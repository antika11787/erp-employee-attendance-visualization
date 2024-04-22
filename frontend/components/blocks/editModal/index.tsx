import { useDispatch } from "react-redux";
import { saveContentLength } from "@/redux/slices/ContentSlice";
import { useForm } from "react-hook-form";
import appConfig from "@/config/constants";
import { totalEmployeeResponse } from "@/types/interface";
import { useEffect } from "react";
import {
  UpdateTotalEmployeeApi,
  GetTotalEmployeeApi,
  setTotalEmployeesApi,
} from "@/apiEndpoints/employeeApi";
import { CgCloseR } from "react-icons/cg";
import Modal from "react-modal";
import FormInput from "@/components/elements/formInput";
import { toast } from "react-toastify";
import "./index.scss";

interface EditTotal {
  totalCheckIn: number;
  isEditModalOpen: boolean;
  editModalTotal: number;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const EditModal = (props: EditTotal) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      total: props.editModalTotal,
    },
  });

  const onSubmit = async (data: totalEmployeeResponse) => {
    if (data.total !== undefined && data.total < props.totalCheckIn) {
      toast.error("Total employees cannot be less than total check-in");
      return;
    }
    if (props.editModalTotal === -1) {
      await setTotalEmployeesApi(data);
    } else {
      await UpdateTotalEmployeeApi(data);
    }
    const updatedTotal = await GetTotalEmployeeApi();
    props.setTotal(updatedTotal.total);
    dispatch(saveContentLength({ contentLength: updatedTotal.total || 0 }));
    reset();
    props.setIsEditModalOpen(false);
  };

  useEffect(() => {
    reset({
      total: props.editModalTotal === -1 ? undefined : props.editModalTotal,
    });
  }, [props.editModalTotal, reset]);

  const closeEditModal = () => {
    props.setIsEditModalOpen(false);
  };

  return (
    <Modal
      isOpen={props.isEditModalOpen}
      onRequestClose={closeEditModal}
      ariaHideApp={false}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
        content: {
          width: "45%",
          height: "265px",
          margin: "auto",
          borderRadius: "10px",
          overflow: "auto",
        },
      }}
    >
      <div className="form-container">
        <h2 className="form-heading">{props.editModalTotal === -1?"Set Total Employee":"Update Total Employee"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="set-employee-form">
          <FormInput
            label="Total Employee"
            nameProp="total"
            requiredProp="This field is required"
            placeholder="Enter total employee"
            control={control}
            errors={errors}
          />
          <div className="button-container">
            <button className="submit-button">Submit</button>
          </div>
        </form>
      </div>
      <div className="close-button" onClick={closeEditModal}>
        <CgCloseR />
      </div>
    </Modal>
  );
};

export default EditModal;
