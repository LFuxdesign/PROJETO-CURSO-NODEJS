import "./footer.css"
import Curso from "../../conteudo/curso.json"
import { Link, useLocation } from "react-router-dom"
import GetGithubProfileData from "../../scripts/getGithubProfileData";
import { useEffect, useState } from "react";

export default function Footer() {
    const [githubProfilesData, setGithubProfilesData] = useState([]);

    const profiles = [{ profName: "LFuxdesign", function: "Front-end Developer, UI/UX Designer, Prototyping and Research" }, { profName: "LucasEduardo0803", function: "Research, content structuring, evaluation, testing and thinking about the user experience" }];

    async function getProfileData(username) {
        const data = await GetGithubProfileData({ username });
        return data;
    }

    useEffect(() => {
        const fetchProfilesData = async () => {
            const allData = await Promise.all(
                profiles.map(async (profile) => {
                    const data = await getProfileData(profile.profName);
                    return data;
                })
            );
            setGithubProfilesData(allData);
        };

        fetchProfilesData();
        // eslint-disable-next-line
    }, []);


    const languages = [
        {
            title: "React.JS",
            bgColor: "#252525",
            link: "https://react.dev/",
            logo: '<svg width="50" height="45" viewBox="0 0 50 45" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M25 27.1652C27.4655 27.1652 29.4643 25.1665 29.4643 22.7009C29.4643 20.2354 27.4655 18.2366 25 18.2366C22.5344 18.2366 20.5357 20.2354 20.5357 22.7009C20.5357 25.1665 22.5344 27.1652 25 27.1652Z" fill="#00D8FF"/> <path d="M25 32.9367C19.6342 33.0665 14.2818 32.3432 9.14286 30.7939C6.76897 30.0413 4.55488 28.8559 2.6125 27.2974C1.8713 26.765 1.25406 26.0786 0.803111 25.2852C0.352165 24.4918 0.0781958 23.6102 0 22.701C0 19.7492 3.24286 16.8564 8.675 14.9635C13.9513 13.2863 19.4641 12.4734 25 12.5564C30.462 12.4801 35.901 13.2782 41.1107 14.9206C43.3969 15.6495 45.5359 16.7777 47.4286 18.2528C48.1571 18.7604 48.7651 19.4219 49.2095 20.1906C49.6538 20.9594 49.9237 21.8164 50 22.701C50 25.7689 46.375 28.8778 40.5357 30.8099C35.4963 32.3088 30.2568 33.0261 25 32.9367ZM25 14.6921C19.7038 14.6213 14.43 15.394 9.37679 16.9814C4.37679 18.726 2.13571 21.1117 2.13571 22.6956C2.13571 24.3528 4.54464 26.9581 9.83393 28.7671C14.7501 30.2418 19.8689 30.9283 25 30.801C30.0293 30.8909 35.0427 30.2104 39.8661 28.7831C45.3571 26.9635 47.8571 24.3546 47.8571 22.701C47.767 22.1336 47.5602 21.591 47.2498 21.1075C46.9394 20.624 46.5321 20.2101 46.0536 19.8921C44.3603 18.5834 42.4495 17.5836 40.4089 16.9385C35.425 15.3738 30.2232 14.6154 25 14.6921Z" fill="#00D8FF"/> <path d="M14.8572 44.9669C14.0241 44.986 13.2009 44.7839 12.4714 44.3812C9.9143 42.9062 9.02858 38.6526 10.1018 33.0008C11.2851 27.5921 13.3354 22.4103 16.1732 17.6562C18.8352 12.8867 22.2432 8.5739 26.2679 4.88119C28.0414 3.2646 30.0873 1.97502 32.3107 1.07227C33.1149 0.695372 33.9922 0.5 34.8804 0.5C35.7685 0.5 36.6458 0.695372 37.45 1.07227C40.1089 2.60441 40.9893 7.29727 39.7482 13.3205C38.5284 18.4358 36.5314 23.3338 33.8268 27.8437C31.2585 32.5568 27.9578 36.8321 24.0482 40.5098C22.2103 42.1897 20.0774 43.515 17.7572 44.4187C16.8283 44.7634 15.8478 44.9488 14.8572 44.9669ZM18.0232 18.7169C15.3163 23.2693 13.3512 28.2235 12.2018 33.3937C11.2143 38.599 12.1625 41.7294 13.5411 42.5258C14.9697 43.3526 18.4375 42.5687 22.6482 38.8901C26.3804 35.3668 29.5308 31.2744 31.9822 26.7651C34.5731 22.4535 36.4888 17.7707 37.6625 12.8794C38.8304 7.20977 37.8214 3.73834 36.3893 2.91334C35.8525 2.70767 35.2789 2.6156 34.7048 2.64296C34.1306 2.67032 33.5684 2.8165 33.0536 3.07227C31.0744 3.88896 29.2549 5.04839 27.6786 6.49727C23.8334 10.0344 20.578 14.1632 18.0357 18.7276L18.0232 18.7169Z" fill="#00D8FF"/> <path d="M35.1375 44.9902C32.7179 44.9902 29.6447 43.5259 26.4447 40.7741C22.3495 37.0478 18.8839 32.6837 16.1822 27.8509C13.3799 23.1622 11.3458 18.0554 10.1572 12.7241C9.64163 10.3785 9.54611 7.96016 9.87501 5.58125C9.95105 4.69876 10.2198 3.8437 10.6622 3.07636C11.1047 2.30902 11.7101 1.64809 12.4357 1.14018C15.0911 -0.397322 19.5964 1.18303 24.1947 5.26518C28.0171 8.87622 31.2632 13.0521 33.8197 17.6473C36.6202 22.2265 38.6756 27.2215 39.9089 32.4455C40.4467 34.8771 40.5296 37.3873 40.1536 39.8491C40.0641 40.757 39.7794 41.6348 39.3189 42.4223C38.8584 43.2098 38.2331 43.8884 37.4857 44.4116C36.7682 44.8093 35.9577 45.009 35.1375 44.9902ZM18.0304 26.7759C20.6222 31.3945 23.9327 35.5712 27.8375 39.1491C31.8536 42.6045 35.0393 43.3473 36.4089 42.542C37.8375 41.7116 38.8911 38.3223 37.8054 32.8384C36.6159 27.8508 34.6445 23.0829 31.9643 18.7116C29.5247 14.3136 26.4263 10.3149 22.7768 6.85446C18.4482 3.01161 14.9375 2.15268 13.5072 2.98125C13.0613 3.34354 12.6955 3.79433 12.4327 4.30515C12.1699 4.81598 12.0159 5.37575 11.9804 5.9491C11.6964 8.07069 11.7889 10.2257 12.2536 12.3152C13.397 17.4136 15.3478 22.2966 18.0322 26.7795L18.0304 26.7759Z" fill="#00D8FF"/> </svg>',
            description: "O framework principal que gerencia como esta pagina é renderizada, projeto iniciado com template npx create-react-app  --template cra-template-pwa"
        },
        {
            title: "JavaScript",
            bgColor: "#F7DF1E",
            link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
            logo: '<svg style="transform: translate(5px, 5px)" width="50" height="36" viewBox="0 0 50 36" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.000119805 29.4705L5.80463 25.9577C6.92442 27.9432 7.94309 29.6231 10.3865 29.6231C12.7287 29.6231 14.2053 28.7068 14.2053 25.1431V0.907532H21.3332V25.2439C21.3332 32.6266 17.0057 35.9869 10.6921 35.9869C4.99003 35.9869 1.68012 33.0337 0 29.4699" fill="black"/> <path d="M25.2049 28.7067L31.0087 25.3464C32.5365 27.8414 34.5222 29.6742 38.0351 29.6742C40.9885 29.6742 42.8718 28.1976 42.8718 26.161C42.8718 23.7171 40.9372 22.8514 37.6786 21.4263L35.8971 20.662C30.7544 18.4731 27.343 15.7238 27.343 9.91938C27.343 4.57334 31.4161 0.5 37.7807 0.5C42.3121 0.5 45.5706 2.07851 47.9124 6.20265L42.3627 9.76648C41.1407 7.57732 39.8173 6.71192 37.7808 6.71192C35.6933 6.71192 34.3694 8.03567 34.3694 9.76648C34.3694 11.9049 35.6933 12.7707 38.7478 14.0946L40.5297 14.8582C46.5886 17.455 50 20.1023 50 26.0591C50 32.4747 44.9595 35.9875 38.188 35.9875C31.5691 35.9875 27.2921 32.831 25.2049 28.7067Z" fill="black"/> </svg>',
            description: "Além de ser utilizado em todo escopo no React.Js, foi utilizado recursos do JavaScript Puro no projeto"
        },
        {
            title: "JSON",
            bgColor: "#fff",
            link: "https://www.json.org/",
            logo: '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M25 0C12.1094 0 0 10.5469 0 25C0 41.0156 13.2813 50 25 50C22.2656 50 8.72396 47.0052 8.72396 28.3854C8.72396 16.7969 18.2292 10.2865 25 12.8906C25 12.8906 32.2917 15.625 32.2917 25C32.2917 34.375 25 37.1094 25 37.1094C31.6406 39.7135 41.276 33.5938 41.276 21.6146C41.276 4.81771 29.9479 0 25 0Z" fill="url(#paint0_linear_237_417)"/> <path d="M25 50C37.8906 50 50 39.4531 50 25C50 8.98438 36.7187 0 25 0C27.7344 0 41.276 2.99479 41.276 21.6146C41.276 33.2031 31.7708 39.7135 25 37.1094C25 37.1094 17.7083 34.375 17.7083 25C17.7083 15.625 25 12.8906 25 12.8906C18.3594 10.2865 8.72396 16.4063 8.72396 28.3854C8.72396 45.1823 20.0521 50 25 50Z" fill="url(#paint1_linear_237_417)"/> <defs> <linearGradient id="paint0_linear_237_417" x1="7.22331" y1="7.5" x2="46.5145" y2="35.0212" gradientUnits="userSpaceOnUse"> <stop/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint1_linear_237_417" x1="42.7767" y1="42.5" x2="3.48549" y2="14.9788" gradientUnits="userSpaceOnUse"> <stop/> <stop offset="1" stop-color="white"/> </linearGradient> </defs> </svg>',
            description: "Optamos pelo JSON para gerenciar o conteúdo do site e do curso, o que favoreceu a criação de uma interface mais dinâmica"
        },
        {
            title: "CSS",
            bgColor: "#fff",
            link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
            logo: '<svg width="40" height="56" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M35.7293 51.1873L19.7128 55.4999L3.696 51.1873L0 11.1459H39.4258L35.7293 51.1873Z" fill="#2062AF"/> <path d="M19.7126 14.6172V52.2882L19.7489 52.2981L32.7104 48.8079L35.7022 14.6172H19.7126Z" fill="#3C9CD7"/> <path d="M10.6227 5.49086V3.1076H14.0998V0.499756H8.01483V7.87059H14.0998V5.49086H10.6227ZM20.3549 3.1076H22.7859V0.499756H16.7003V3.1076C17.5145 3.92178 17.9391 4.31146 19.1166 5.48898C18.4282 5.48898 16.7003 5.49133 16.7003 5.49133V7.87059H22.7859V5.49086L20.3549 3.1076ZM28.9802 3.1076H31.411V0.499756H25.3252V3.1076C26.1394 3.92178 26.5642 4.31146 27.7417 5.48898C27.0536 5.48898 25.3252 5.49133 25.3252 5.49133V7.87059H31.4112V5.49086L28.9802 3.1076Z" fill="black"/> <path d="M19.6984 24.629L8.23486 29.4033L8.61502 34.1302L19.6984 29.3913L31.4883 24.3506L31.9771 19.5151L19.6984 24.629Z" fill="white"/> <path d="M8.23474 29.4032L8.6149 34.1301L19.6983 29.3912V24.6289L8.23474 29.4032Z" fill="url(#paint0_linear_237_853)"/> <path d="M31.9771 19.5154L19.6984 24.6291V29.3914L31.4883 24.3507L31.9771 19.5154Z" fill="url(#paint1_linear_237_853)"/> <path d="M8.25238 29.4033L8.63266 34.1302L25.6387 34.1844L25.2583 40.4869L19.6623 42.0623L14.283 40.704L13.957 36.7921H8.95861L9.61063 44.3442L19.7167 47.3323L29.7679 44.3984L31.0719 29.4033H8.25238Z" fill="url(#paint2_linear_237_853)"/> <path opacity="0.05" d="M19.3487 29.6748H7.88513L8.26529 34.4017L19.3487 34.4371V29.6748ZM19.3487 42.3187L19.2944 42.3339L13.9157 40.9756L13.5898 37.0637H8.59148L9.24338 44.6158L19.3487 47.6039V42.3187Z" fill="black"/> <path d="M7.20245 19.5154H31.9771L31.4883 24.3508H7.80003L7.20245 19.5154Z" fill="url(#paint3_linear_237_853)"/> <path opacity="0.05" d="M19.6984 19.5154H7.20245L7.80003 24.3508H19.6984V19.5154Z" fill="black"/> <defs> <linearGradient id="paint0_linear_237_853" x1="13.9665" y1="34.1302" x2="13.9665" y2="24.629" gradientUnits="userSpaceOnUse"> <stop offset="0.387" stop-color="#D1D3D4" stop-opacity="0"/> <stop offset="1" stop-color="#D1D3D4"/> </linearGradient> <linearGradient id="paint1_linear_237_853" x1="25.8377" y1="29.3915" x2="25.8377" y2="19.5155" gradientUnits="userSpaceOnUse"> <stop offset="0.387" stop-color="#D1D3D4" stop-opacity="0"/> <stop offset="1" stop-color="#D1D3D4"/> </linearGradient> <linearGradient id="paint2_linear_237_853" x1="8.25238" y1="38.3679" x2="31.0718" y2="38.3679" gradientUnits="userSpaceOnUse"> <stop stop-color="#E8E7E5"/> <stop offset="1" stop-color="white"/> </linearGradient> <linearGradient id="paint3_linear_237_853" x1="7.20245" y1="21.9331" x2="31.977" y2="21.9331" gradientUnits="userSpaceOnUse"> <stop stop-color="#E8E7E5"/> <stop offset="1" stop-color="white"/> </linearGradient> </defs> </svg>',
            description: "Toda estilização foi feita usando conceitos do CSS e CSS3"
        },
        {
            title: "React-Router-Dom",
            bgColor: "#fff",
            link: "https://www.npmjs.com/package/react-router-dom",
            logo: '<svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.98844 18C3.3431 18 2.7711 17.824 2.27244 17.472C1.77377 17.12 1.3851 16.6433 1.10644 16.042C0.827771 15.426 0.688438 14.722 0.688438 13.93V1.918C0.688438 1.59533 0.791104 1.33133 0.996438 1.126C1.20177 0.920666 1.46577 0.818 1.78844 0.818C2.1111 0.818 2.3751 0.920666 2.58044 1.126C2.78577 1.33133 2.88844 1.59533 2.88844 1.918V13.93C2.88844 14.4727 2.9911 14.92 3.19644 15.272C3.40177 15.624 3.66577 15.8 3.98844 15.8H4.53844C4.83177 15.8 5.06644 15.9027 5.24244 16.108C5.4331 16.3133 5.52844 16.5773 5.52844 16.9C5.52844 17.2227 5.3891 17.4867 5.11044 17.692C4.83177 17.8973 4.47244 18 4.03244 18H3.98844ZM9.06614 18C8.74347 18 8.47214 17.8973 8.25214 17.692C8.04681 17.472 7.94414 17.2007 7.94414 16.878V7.088C7.94414 6.75067 8.04681 6.47933 8.25214 6.274C8.47214 6.06867 8.74347 5.966 9.06614 5.966C9.40347 5.966 9.67481 6.06867 9.88014 6.274C10.0855 6.47933 10.1881 6.75067 10.1881 7.088V16.878C10.1881 17.2007 10.0855 17.472 9.88014 17.692C9.67481 17.8973 9.40347 18 9.06614 18ZM9.06614 4.008C8.67014 4.008 8.32547 3.86867 8.03214 3.59C7.75347 3.29667 7.61414 2.952 7.61414 2.556C7.61414 2.16 7.75347 1.82267 8.03214 1.544C8.32547 1.25067 8.67014 1.104 9.06614 1.104C9.46214 1.104 9.79947 1.25067 10.0781 1.544C10.3715 1.82267 10.5181 2.16 10.5181 2.556C10.5181 2.952 10.3715 3.29667 10.0781 3.59C9.79947 3.86867 9.46214 4.008 9.06614 4.008ZM20.4128 18.088C19.2688 18.088 18.2421 17.824 17.3328 17.296C16.4235 16.7533 15.7048 16.02 15.1768 15.096C14.6488 14.172 14.3775 13.1307 14.3628 11.972V1.94C14.3628 1.60267 14.4655 1.33133 14.6708 1.126C14.8908 0.920666 15.1621 0.818 15.4848 0.818C15.8221 0.818 16.0935 0.920666 16.2988 1.126C16.5041 1.33133 16.6068 1.60267 16.6068 1.94V7.88C17.1201 7.264 17.7361 6.78 18.4548 6.428C19.1881 6.06133 19.9875 5.878 20.8528 5.878C21.9235 5.878 22.8841 6.14933 23.7348 6.692C24.5855 7.22 25.2528 7.946 25.7368 8.87C26.2355 9.77933 26.4848 10.8133 26.4848 11.972C26.4848 13.1307 26.2135 14.172 25.6708 15.096C25.1428 16.02 24.4241 16.7533 23.5148 17.296C22.6055 17.824 21.5715 18.088 20.4128 18.088ZM20.4128 16.108C21.1608 16.108 21.8281 15.932 22.4148 15.58C23.0015 15.2133 23.4635 14.7147 23.8008 14.084C24.1528 13.4533 24.3288 12.7493 24.3288 11.972C24.3288 11.18 24.1528 10.476 23.8008 9.86C23.4635 9.244 23.0015 8.76 22.4148 8.408C21.8281 8.04133 21.1608 7.858 20.4128 7.858C19.6795 7.858 19.0121 8.04133 18.4108 8.408C17.8241 8.76 17.3621 9.244 17.0248 9.86C16.6875 10.476 16.5188 11.18 16.5188 11.972C16.5188 12.7493 16.6875 13.4533 17.0248 14.084C17.3621 14.7147 17.8241 15.2133 18.4108 15.58C19.0121 15.932 19.6795 16.108 20.4128 16.108Z" fill="black"/> </svg>',
            description: "Utilizamos a biblioteca React-Router-Dom para gerenciar as paginas do react de forma a ter uma pagina tipo SPA fluida e dinâmica"
        },
        {
            title: "DOMPurify",
            bgColor: "#fff",
            link: "https://www.npmjs.com/package/dompurify",
            logo: '<svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.98844 18C3.3431 18 2.7711 17.824 2.27244 17.472C1.77377 17.12 1.3851 16.6433 1.10644 16.042C0.827771 15.426 0.688438 14.722 0.688438 13.93V1.918C0.688438 1.59533 0.791104 1.33133 0.996438 1.126C1.20177 0.920666 1.46577 0.818 1.78844 0.818C2.1111 0.818 2.3751 0.920666 2.58044 1.126C2.78577 1.33133 2.88844 1.59533 2.88844 1.918V13.93C2.88844 14.4727 2.9911 14.92 3.19644 15.272C3.40177 15.624 3.66577 15.8 3.98844 15.8H4.53844C4.83177 15.8 5.06644 15.9027 5.24244 16.108C5.4331 16.3133 5.52844 16.5773 5.52844 16.9C5.52844 17.2227 5.3891 17.4867 5.11044 17.692C4.83177 17.8973 4.47244 18 4.03244 18H3.98844ZM9.06614 18C8.74347 18 8.47214 17.8973 8.25214 17.692C8.04681 17.472 7.94414 17.2007 7.94414 16.878V7.088C7.94414 6.75067 8.04681 6.47933 8.25214 6.274C8.47214 6.06867 8.74347 5.966 9.06614 5.966C9.40347 5.966 9.67481 6.06867 9.88014 6.274C10.0855 6.47933 10.1881 6.75067 10.1881 7.088V16.878C10.1881 17.2007 10.0855 17.472 9.88014 17.692C9.67481 17.8973 9.40347 18 9.06614 18ZM9.06614 4.008C8.67014 4.008 8.32547 3.86867 8.03214 3.59C7.75347 3.29667 7.61414 2.952 7.61414 2.556C7.61414 2.16 7.75347 1.82267 8.03214 1.544C8.32547 1.25067 8.67014 1.104 9.06614 1.104C9.46214 1.104 9.79947 1.25067 10.0781 1.544C10.3715 1.82267 10.5181 2.16 10.5181 2.556C10.5181 2.952 10.3715 3.29667 10.0781 3.59C9.79947 3.86867 9.46214 4.008 9.06614 4.008ZM20.4128 18.088C19.2688 18.088 18.2421 17.824 17.3328 17.296C16.4235 16.7533 15.7048 16.02 15.1768 15.096C14.6488 14.172 14.3775 13.1307 14.3628 11.972V1.94C14.3628 1.60267 14.4655 1.33133 14.6708 1.126C14.8908 0.920666 15.1621 0.818 15.4848 0.818C15.8221 0.818 16.0935 0.920666 16.2988 1.126C16.5041 1.33133 16.6068 1.60267 16.6068 1.94V7.88C17.1201 7.264 17.7361 6.78 18.4548 6.428C19.1881 6.06133 19.9875 5.878 20.8528 5.878C21.9235 5.878 22.8841 6.14933 23.7348 6.692C24.5855 7.22 25.2528 7.946 25.7368 8.87C26.2355 9.77933 26.4848 10.8133 26.4848 11.972C26.4848 13.1307 26.2135 14.172 25.6708 15.096C25.1428 16.02 24.4241 16.7533 23.5148 17.296C22.6055 17.824 21.5715 18.088 20.4128 18.088ZM20.4128 16.108C21.1608 16.108 21.8281 15.932 22.4148 15.58C23.0015 15.2133 23.4635 14.7147 23.8008 14.084C24.1528 13.4533 24.3288 12.7493 24.3288 11.972C24.3288 11.18 24.1528 10.476 23.8008 9.86C23.4635 9.244 23.0015 8.76 22.4148 8.408C21.8281 8.04133 21.1608 7.858 20.4128 7.858C19.6795 7.858 19.0121 8.04133 18.4108 8.408C17.8241 8.76 17.3621 9.244 17.0248 9.86C16.6875 10.476 16.5188 11.18 16.5188 11.972C16.5188 12.7493 16.6875 13.4533 17.0248 14.084C17.3621 14.7147 17.8241 15.2133 18.4108 15.58C19.0121 15.932 19.6795 16.108 20.4128 16.108Z" fill="black"/> </svg>',
            description: "Utilizamos a biblioteca DOMPurify para sintetizar e protejer injeções HTML diretas vindas do JSON e para pré formatar o conteúdo de certo modo"
        },
        {
            title: "ReactPlayer",
            bgColor: "#fff",
            link: "https://www.npmjs.com/package/react-player",
            logo: '<svg width="27" height="19" viewBox="0 0 27 19" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M3.98844 18C3.3431 18 2.7711 17.824 2.27244 17.472C1.77377 17.12 1.3851 16.6433 1.10644 16.042C0.827771 15.426 0.688438 14.722 0.688438 13.93V1.918C0.688438 1.59533 0.791104 1.33133 0.996438 1.126C1.20177 0.920666 1.46577 0.818 1.78844 0.818C2.1111 0.818 2.3751 0.920666 2.58044 1.126C2.78577 1.33133 2.88844 1.59533 2.88844 1.918V13.93C2.88844 14.4727 2.9911 14.92 3.19644 15.272C3.40177 15.624 3.66577 15.8 3.98844 15.8H4.53844C4.83177 15.8 5.06644 15.9027 5.24244 16.108C5.4331 16.3133 5.52844 16.5773 5.52844 16.9C5.52844 17.2227 5.3891 17.4867 5.11044 17.692C4.83177 17.8973 4.47244 18 4.03244 18H3.98844ZM9.06614 18C8.74347 18 8.47214 17.8973 8.25214 17.692C8.04681 17.472 7.94414 17.2007 7.94414 16.878V7.088C7.94414 6.75067 8.04681 6.47933 8.25214 6.274C8.47214 6.06867 8.74347 5.966 9.06614 5.966C9.40347 5.966 9.67481 6.06867 9.88014 6.274C10.0855 6.47933 10.1881 6.75067 10.1881 7.088V16.878C10.1881 17.2007 10.0855 17.472 9.88014 17.692C9.67481 17.8973 9.40347 18 9.06614 18ZM9.06614 4.008C8.67014 4.008 8.32547 3.86867 8.03214 3.59C7.75347 3.29667 7.61414 2.952 7.61414 2.556C7.61414 2.16 7.75347 1.82267 8.03214 1.544C8.32547 1.25067 8.67014 1.104 9.06614 1.104C9.46214 1.104 9.79947 1.25067 10.0781 1.544C10.3715 1.82267 10.5181 2.16 10.5181 2.556C10.5181 2.952 10.3715 3.29667 10.0781 3.59C9.79947 3.86867 9.46214 4.008 9.06614 4.008ZM20.4128 18.088C19.2688 18.088 18.2421 17.824 17.3328 17.296C16.4235 16.7533 15.7048 16.02 15.1768 15.096C14.6488 14.172 14.3775 13.1307 14.3628 11.972V1.94C14.3628 1.60267 14.4655 1.33133 14.6708 1.126C14.8908 0.920666 15.1621 0.818 15.4848 0.818C15.8221 0.818 16.0935 0.920666 16.2988 1.126C16.5041 1.33133 16.6068 1.60267 16.6068 1.94V7.88C17.1201 7.264 17.7361 6.78 18.4548 6.428C19.1881 6.06133 19.9875 5.878 20.8528 5.878C21.9235 5.878 22.8841 6.14933 23.7348 6.692C24.5855 7.22 25.2528 7.946 25.7368 8.87C26.2355 9.77933 26.4848 10.8133 26.4848 11.972C26.4848 13.1307 26.2135 14.172 25.6708 15.096C25.1428 16.02 24.4241 16.7533 23.5148 17.296C22.6055 17.824 21.5715 18.088 20.4128 18.088ZM20.4128 16.108C21.1608 16.108 21.8281 15.932 22.4148 15.58C23.0015 15.2133 23.4635 14.7147 23.8008 14.084C24.1528 13.4533 24.3288 12.7493 24.3288 11.972C24.3288 11.18 24.1528 10.476 23.8008 9.86C23.4635 9.244 23.0015 8.76 22.4148 8.408C21.8281 8.04133 21.1608 7.858 20.4128 7.858C19.6795 7.858 19.0121 8.04133 18.4108 8.408C17.8241 8.76 17.3621 9.244 17.0248 9.86C16.6875 10.476 16.5188 11.18 16.5188 11.972C16.5188 12.7493 16.6875 13.4533 17.0248 14.084C17.3621 14.7147 17.8241 15.2133 18.4108 15.58C19.0121 15.932 19.6795 16.108 20.4128 16.108Z" fill="black"/> </svg>',
            description: "Optamos pela utilização dessa biblioteca para facilitar a exibição de videos locais ou de plataformas, utilizando assim um unico componente que se adapta a multiplos formatos"
        }
    ]

    const [showDetails, setShowDetails] = useState();
    const location = useLocation();
    useEffect(() => {
        location.pathname === "/" || location.pathname === "/c4m/sobre" ? setShowDetails(true) : setShowDetails(false)
    }, [location])

    return (
        <footer>
            <section className="main flex transition">
                <div className="title useObserver" style={{ animationDelay: ".25s" }}>
                    <h1 className="useObserver" dangerouslySetInnerHTML={{ __html: Curso.tituloCurso }} />
                </div>
                <div className="social flex flexColumn useObserver">
                    {
                        githubProfilesData.map((profile, index) => {
                            return (
                                <Link key={index} to={profile.html_url} target="_blank" rel="noopener noreferrer">
                                    <div className="profile flexCenter transition useObserver allowReobserver" style={{ animationDelay: `${.25 * index}s` }}>
                                        <div className="profilePic transition useObserver allowReobserver" style={{ backgroundImage: `url(${profile.avatar_url})` }} />
                                        <div className="flex spacingLink transition useObserver allowReobserver" style={{ gap: "40px" }}>
                                            <div className="textData flex flexColumn transition useObserver allowReobserver">
                                                <h1 className="useObserver allowReobserver">{profile.name}</h1>
                                                <span className="useObserver allowReobserver">{profiles[index].function}</span>
                                            </div>
                                            <div className="linkBtn flexCenter useObserver allowReobserver" title="GitHub">
                                                <svg className="useObserver allowReobserver" width="30" height="30" viewBox="0 0 364 355" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M182.483 0.587769C82.2458 0.587769 0.968994 81.8526 0.968994 182.102C0.968994 262.297 52.9814 330.336 125.097 354.337C134.172 356.02 137.504 350.4 137.504 345.608C137.504 341.28 137.336 326.979 137.254 311.811C86.7569 322.793 76.1044 290.397 76.1044 290.397C67.8445 269.419 55.9487 263.838 55.9487 263.838C39.4769 252.572 57.1895 252.801 57.1895 252.801C75.4167 254.085 85.0112 271.509 85.0112 271.509C101.204 299.259 127.477 291.237 137.836 286.598C139.467 274.868 144.168 266.856 149.359 262.326C109.043 257.742 66.6638 242.175 66.6638 172.623C66.6638 152.809 73.7527 136.613 85.3623 123.905C83.4794 119.331 77.2658 100.868 87.1249 75.8674C87.1249 75.8674 102.365 70.986 137.045 94.4721C151.528 90.4516 167.055 88.4365 182.481 88.3643C197.907 88.4365 213.448 90.4516 227.953 94.4721C262.599 70.9884 277.82 75.865 277.82 75.865C287.698 100.864 281.487 119.326 279.599 123.898C291.238 136.609 298.279 152.801 298.279 172.616C298.279 242.338 255.818 257.685 215.4 262.179C221.91 267.815 227.712 278.86 227.712 295.796C227.712 320.083 227.505 339.632 227.505 345.608C227.505 350.441 230.768 356.097 239.969 354.318C312.06 330.29 364 262.275 364 182.104C363.998 81.8526 282.73 0.587769 182.483 0.587769Z" fill="#1B1817" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    }
                </div>
            </section>

            {
                showDetails && <><svg className="splitter useObserver allowReobserver" width="1274" height="2" viewBox="0 0 1274 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H1273" stroke="url(#paint0_linear_228_15)" stroke-width="2" stroke-linecap="round" stroke-dasharray="15 15" />
                    <defs>
                        <linearGradient id="paint0_linear_228_15" x1="-187.983" y1="-1.93125" x2="-187.939" y2="8.34993" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#007BFF" />
                            <stop offset="1" stop-color="#6C63FF" />
                        </linearGradient>
                    </defs>
                </svg>
                    <section className="langs flex flexColumn transition">
                        <div className="title useObserver" style={{ animationDelay: ".25s" }}>
                            <h1 className="useObserver">O que utilizamos para tornar isso possivel?</h1>
                        </div>

                        <div className="containerLanguages flexCenter">
                            {
                                languages.map((lang, index) => {
                                    return (
                                        <Link key={index} className="flexCenter" to={lang.link} target="_blank" rel="noopener noreferrer">
                                            <div className="lang flexCenter transition useObserver allowReobserver">
                                                <div className="langPic flexCenter transition" style={{ background: lang.bgColor }} dangerouslySetInnerHTML={{ __html: lang.logo }} />
                                                <div className="flexCenter spacingLink transition" style={{ gap: "40px" }}>
                                                    <div className="textData flex flexColumn transition">
                                                        <h1>{lang.title}</h1>
                                                        <span>{lang.description}</span>
                                                    </div>
                                                    <div className="linkBtn flexCenter" title={lang.title}>
                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.30774 0.299988C1.93814 0.299988 1.63851 0.599613 1.63851 0.969218V2.30768C1.63851 2.67729 1.93814 2.97691 2.30774 2.97691H11.5202C12.1164 2.97691 12.415 3.69777 11.9934 4.11936L0.773267 15.3395C0.511916 15.6009 0.511916 16.0246 0.773266 16.286L1.71406 17.2268C1.97541 17.4881 2.39915 17.4881 2.6605 17.2268L13.8807 6.00659C14.3023 5.585 15.0231 5.88359 15.0231 6.47981V15.6923C15.0231 16.0619 15.3228 16.3615 15.6924 16.3615H17.0308C17.4004 16.3615 17.7 16.0619 17.7 15.6923V0.969219C17.7 0.599613 17.4004 0.299988 17.0308 0.299988H2.30774Z" fill="black" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })
                            }
                        </div>
                    </section>
                </>}
        </footer>
    );
}
