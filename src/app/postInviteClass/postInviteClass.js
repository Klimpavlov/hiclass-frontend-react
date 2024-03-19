import axios from "axios";
const postInviteClass = (receiverId, date, invitationText) => {
    const accessToken = localStorage.getItem('accessToken');

    axios.post('http://localhost:7280/api/Invitation/create-invitation', {
        ClassSenderId: 'd78395f3-944b-44a5-bbc1-891aab8557e8',
        ClassReceiverId: receiverId.toString(),
        DateOfInvitation: date,
        InvitationText: invitationText,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(function (response) {
            console.log(response);
            // Перенаправление на другую страницу после успешного выполнения запроса
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
};

export default postInviteClass;