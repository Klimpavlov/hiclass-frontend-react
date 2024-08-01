import axios from "axios";
import apiClient from "@/app/[locale]/api/utils/axios";
const postInviteClass = async (classSenderId, receiverId, dateOfInvitation, invitationText, toast) => {

   try {


       const response = await apiClient('/Invitation/create-invitation', {
           ClassSenderId: classSenderId,
           ClassReceiverId: receiverId.toString(),
           DateOfInvitation: dateOfInvitation,
           InvitationText: invitationText,
       },
           )

       console.log(response);
       return true;
   }
   catch (error) {
            console.log(error);
       if (toast && toast.current) {
           toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
       }
       return false;
        }
};

export default postInviteClass;