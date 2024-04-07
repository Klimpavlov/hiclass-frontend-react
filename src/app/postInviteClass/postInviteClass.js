import axios from "axios";
const postInviteClass = (classSenderId, receiverId, dateOfInvitation, invitationText, successRedirect) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.post('http://localhost:7280/api/Invitation/create-invitation', {
        ClassSenderId: classSenderId,
        ClassReceiverId: receiverId.toString(),
        DateOfInvitation: dateOfInvitation,
        InvitationText: invitationText,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(function (response) {
            console.log(response);
            successRedirect()
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
};

export default postInviteClass;