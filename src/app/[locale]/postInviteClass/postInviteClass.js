import axios from "axios";
const postInviteClass = async (classSenderId, receiverId, dateOfInvitation, invitationText, successRedirect, toast) => {

   try {
       const accessToken = localStorage.getItem('accessToken');

       const response = await axios.post('http://localhost:7280/api/Invitation/create-invitation', {
           ClassSenderId: classSenderId,
           ClassReceiverId: receiverId.toString(),
           DateOfInvitation: dateOfInvitation,
           InvitationText: invitationText,
       }, {
           headers: {
               Authorization: `Bearer ${accessToken}`,
           },
       })

       console.log(response);
       successRedirect();
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