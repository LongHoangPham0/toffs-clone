import { toast } from 'react-toastify';
import { SHOW_NOTIFICATION } from "../../actions/c4/common/actionType";

const initialOption = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}
const notificationReducer = (state = {}, action) => {
    switch(action.type) {
        case SHOW_NOTIFICATION:
            let typeToast = "";
            const options = {...initialOption};
            switch (action.data.type) {
                case "success":
                  typeToast = toast.TYPE.SUCCESS
                  break;

                case "error":
                  typeToast = toast.TYPE.ERROR
                  break;

                case "warning":
                  typeToast = toast.TYPE.WARNING
                  break;

                default:
                  typeToast = toast.TYPE.INFO
                  break;
              }
              options.type = typeToast;
              toast(action.data.content, options)
            return {...action.data};

        default:
            return state;
    }
}

export default notificationReducer;
