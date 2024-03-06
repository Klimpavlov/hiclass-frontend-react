import axios from "axios";

const postInviteClass = (senderId, receiverId, date, invitationText) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.post('http://localhost:7280/api/Invitation/create-invitation', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        ClassSenderId: "f9d1215e-b1ba-49ea-b63d-4298f6a863fb",
        ClassReceiverId: "1231b5f1-4898-4809-b37f-32c2c9473af8",
        DateOfInvitation: date,
        InvitationText: invitationText,
    })
        .then(function (response) {
            console.log(response);
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postInviteClass