import apiClient from "@/app/[locale]/api/utils/axios";
const sendExpertInvitation = async (classSenderId, receiverId, dateOfInvitation, invitationText, toast) => {

    try {


        const response = await apiClient.post('/Invitation/send-expert-invitation', {
                ClassSenderId: classSenderId,
                UserRecipientId: receiverId.toString(),
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

export default sendExpertInvitation;