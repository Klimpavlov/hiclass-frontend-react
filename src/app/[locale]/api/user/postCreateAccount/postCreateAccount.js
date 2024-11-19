import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import {reverseTranslateItems} from "@/app/[locale]/api/translateItems/reverseTranslateItems";
import languagesMapping from "../../../../../../mapping/languagesMapping/languagesMapping.json";
import disciplinesMapping from "../../../../../../mapping/disciplinesMapping/disciplinesMapping.json";
import {usePathname} from "next/navigation";
import useDeviceToken from "@/app/[locale]/api/getDeviceToken/getDeviceToken";
import Cookies from "js-cookie";

const postCreateAccount = async (successRedirect, toast, pathname, deviceToken) => {
    try {
        // const accessToken = sessionStorage.getItem('accessToken');
        const accessToken =  Cookies.get('accessToken');
        const localhost = getLocalhost();
        console.log(accessToken)

        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        const country = localStorage.getItem('country');
        const city = localStorage.getItem('city');

        const isTeacher = localStorage.getItem('isTeacher');
        const isExpert = localStorage.getItem('isExpert');

        const institutionName = localStorage.getItem('institutionName');
        const institutionAddress = localStorage.getItem('institutionAddress');
        // const institutionRequest = institution.split(';');
        // const institutionTitle = institutionRequest[0];
        // const institutionAddress = institutionRequest[1];

        const disciplines = localStorage.getItem('disciplines');
        const disciplinesArray = disciplines.split(',');

        const languages = localStorage.getItem('languages');
        const languagesArray = languages.split(',');

        const grades = localStorage.getItem('grades');
        const gradesArray = grades.split(',').map(Number);

        //translate if necessary

        let languagesToSend = languagesArray;
        let disciplinesToSend = disciplinesArray;

        if (pathname.includes('ru')) {
            languagesToSend = reverseTranslateItems(languagesArray, languagesMapping);
            disciplinesToSend = reverseTranslateItems(disciplinesArray, disciplinesMapping);
        }

        const requestData = {
            DeviceToken: deviceToken,
            FirstName: firstName,
            LastName: lastName,
            IsATeacher: isTeacher,
            IsAnExpert: isExpert,
            CityLocation: city,
            CountryLocation: country,
            InstitutionDto: {
                Types: ["School"],
                Address: institutionAddress,
                Title: institutionName
            },
            DisciplineTitles: disciplinesToSend,
            LanguageTitles: languagesToSend,
            GradesEnumerable: gradesArray,
        };

        console.log(requestData)
        const response = await axios.put(`http://${localhost}/api/User/create-account`, requestData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            })

        console.log(response);
        const newAccessToken = response.data.value.accessToken;
        Cookies.set('accessToken', newAccessToken);
        successRedirect()
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default postCreateAccount;


