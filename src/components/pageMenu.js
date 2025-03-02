import React, { useState } from "react"
import { PopupConfirm } from "./popup";
import { createFolder, HighQualityImage } from "../scripts/scripts";
import { useNavigate } from "react-router-dom";

export default function PageMenu({ showMenu, lowProfilePicture, highProfilePicture, userName, updateData = null }) {
    const [mountPopupNovaNota, setmountPopupNovaNota] = useState(false)
    const [folderInputName, setFoldInputName] = useState(null);
    const navigate = useNavigate();

    // function menuTexto
    return (<>
        <div id="applicationMenu" className={showMenu ? "show" : ""}>
            <div id="profileArea">
                <div id="containerProfile">
                    <div id="profilePicture">
                        <HighQualityImage lowQualitySrc={lowProfilePicture} highQualitySrc={highProfilePicture} alt={"Profile Picture"} height={"100%"} />
                    </div>
                    <div id="textContent">
                        <h3>{`Olá,  ${userName}`}</h3>
                    </div>
                </div>
            </div>
            <div id="actions">
                <button onClick={() => { setmountPopupNovaNota(true); }}>
                    Criar nova pasta
                </button>
                <button>
                    Sair
                </button>
            </div>
        </div>
        {mountPopupNovaNota ?
            <PopupConfirm
                defaultData={{
                    titulo: "Criar nova pasta",
                    confirmTxt: "Salvar",
                    cancelTxt: "Cancelar",
                    closeAction: () => {
                        setTimeout(() => {
                            setmountPopupNovaNota(false)
                        }, 400)
                    },
                    action: async () => {

                        try {
                            await createFolder(folderInputName);
                            setTimeout(() => {
                                updateData();
                                setmountPopupNovaNota(false)
                            }, 100);
                        } catch (error) {
                            console.error('Erro ao atualizar os dados:', error);
                        }
                    }
                }}
                needInput={true}
                inputData={{
                    placeholder: "Título da pasta",
                    getByKeyBoard: (e) => { setFoldInputName(e.target.value) }
                }}
            />
            : null}
    </>)
}