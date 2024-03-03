import axios from "axios";

const postInviteClass = (senderId, receiverId, date, invitationText) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.post('http://localhost:7280/api/Invitation/create-invitation', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        ClassSenderId: "72238656-30e4-428b-9c09-fa241278b0dc",
        ClassReceiverId: "d2865f27-ea0e-4697-a939-f95f6343b798",
        DateOfInvitation: "march",
        InvitationText: "lets talk my friend",
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