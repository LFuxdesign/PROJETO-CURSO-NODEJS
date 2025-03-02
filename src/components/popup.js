import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lottie from 'lottie-react';
import "./popup.css"
import popupOfflineAni from "../assets/offlineAni.json";
import { ReactComponent as CloseIcon } from "../assets/closeBTN.svg"
import { isFunction } from "../scripts/scripts";

export function Popup(props) {
    const lottieRef = useRef();
    console.log(lottieRef)

    const [mount, setMount] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!mount && !props.mount) {
            setShow(false)
            setTimeout(() => {
                setMount(false)
            }, 500);
        } else {
            setShow(props.show)
            setMount(props.show)
        }


        setTimeout(() => {
            if (lottieRef.current !== undefined) {
                if (props.speed !== undefined) {
                    console.log(props.speed)
                    lottieRef.current.setSpeed(parseFloat(props.speed));
                } else {
                    lottieRef.current.setSpeed(1)
                }
            }
        }, 200);
    }, [props]);

    function verifyAction(e) {
        if (e !== undefined) {
            eval(e)
        }
    }
    return (<>
        {mount ?
            <div className={`popup generic ${show ? "show" : "hidden"}`}>
                <div className="content">
                    <h1 id="title">{props.title}</h1>
                    <p>{props.text}</p>
                    <button id="actionBtn" type="button" onClick={() => { verifyAction(props.onClickAction); setShow(false); setTimeout(() => { setMount(false) }, 500) }}>
                        Ok
                    </button>
                </div>
                <Lottie
                    lottieRef={lottieRef}
                    className="lottie"
                    loop={true}
                    autoplay={true}
                    animationData={props.lottieSrc}
                    style={{ height: "220px", width: "220px" }}
                />
            </div>
            : ""}
    </>);
}

export function PopupLoadingLogin(props) {
    return (
        <div className={`popup login ${props.show ? "show" : "hidden"}`}>
            <h1 id="title">{props.title}</h1>
            <Lottie className="lottie" loop={true} autoplay={true} animationData={props.lottieSrc} style={{ height: '300px', width: '300px' }} />
        </div>
    )
}

export function PopupOffline() {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isOnLoginPage, setLoginPage] = useState(false)
    const location = useLocation()
    let timeoutId;

    const updateOnlineStatus = useCallback(() => {
        location.pathname == "/login" || location.pathname == "/registro" ? setLoginPage(true) : setLoginPage(false);

        const onlineStatus = navigator.onLine;
        setIsOffline(!onlineStatus);

        clearTimeout(timeoutId); // Limpa qualquer timeout pendente

        if (!onlineStatus) { // Se offline

            setIsAnimating(true); // ativa a animação para exibir o popup
            setIsPopupVisible(true) // exibe componente no html

            // Timeout de 30 segundos para remover o popup automaticamente
            timeoutId = setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => setIsPopupVisible(false), 500); // apaga todo o componente do html
            }, 30000);

        } else { // Se voltou online
            setIsAnimating(true)
            setIsPopupVisible(true); // Exibe o popup indicando que a conexão voltou

            // Timeout de 10 segundos de exibição da mensagem de retorno da conexão
            timeoutId = setTimeout(() => {
                setIsAnimating(false); // Finaliza a animação
                setTimeout(() => setIsPopupVisible(false), 500); // apaga todo o componente do html
            }, 10000);

        }
    }, []);

    useEffect(() => {
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
            clearTimeout(timeoutId); // Limpa quaisquer timeout ao desmontar
        };
    }, [updateOnlineStatus]);

    return (
        <>
            {isPopupVisible && !isOnLoginPage && (
                <div
                    className={
                        isAnimating ? "containerPopup show" : "containerPopup hidden"
                    }
                >
                    <div className={`popup offline ${isAnimating ? "show" : "hidden"}`}>
                        <div className="content">
                            <h1>
                                {
                                    isOffline
                                        ? "OOPS, parece que você está offline 😕"
                                        : "Estamos de volta! Conexão restabelecida 😄"
                                }
                            </h1>
                            <p>
                                {
                                    isOffline
                                        ? "Mas fique tranquilo, suas notas estão seguras com a gente. Mesmo desconectado, nada foi perdido, assim você pode continuar editando normalmente, e, assim que você se conectar novamente, as atualizações serão sincronizadas automaticamente. Até lá, aproveite para se inspirar e seguir com suas anotações. A internet pode cair, mas sua criatividade não! 😉"
                                        : "Sua conexão foi restabelecida e suas notas já estão sincronizadas automaticamente. Continue editando à vontade, sem se preocupar com nada. Agora, com a internet de volta, suas atualizações serão salvas em tempo real. Aproveite para organizar suas ideias e seguir com suas anotações sem interrupções. A criatividade flui melhor quando tudo está conectado! 😉"
                                }
                            </p>
                            <button onClick={() => { setIsAnimating(false); setTimeout(() => { setIsPopupVisible(false) }, 500); }} id="actionBtn" type="button">Ok</button>
                        </div>
                        <Lottie className="lottie" loop={true} autoplay={true} animationData={popupOfflineAni} style={{ height: '190px', width: '190px' }} />
                    </div>

                </div>
            )}
        </>
    );
}

export function PopupAlerts({ defaultData }) {
    const [show, setShow] = useState(true);

    function closePopup() {
        setShow(false)
    }
    return (
        <div id="popupConfirmBgContainer" className={!show ? "hide" : null}>
            <div className={!show ? "popupConfirm popupAlert hide" : "popupConfirm popupAlert"}>
                <div className="flexCenter" style={{ flexDirection: "column", gap: "15px" }}>
                    <div id="header">
                        <h4 style={{ maxWidth: "88%", textAlign: "justify" }}>{defaultData.titulo}</h4>
                        <button id="close" className="flexCenter" onClick={
                            () => {
                                if (isFunction(defaultData.action)) {
                                    console.log(true)
                                    defaultData.action();
                                    closePopup();
                                } else {
                                    closePopup()
                                }
                            }}>
                            <CloseIcon style={{ width: "40px", height: "40px" }} />
                        </button>
                    </div>
                    <div id="textData">
                        <p>{defaultData.text}</p>
                    </div>
                    <div id="actionConfirm" style={{ flexDirection: defaultData.highlightNegative ? "row-reverse" : "" }}>
                        <button onClick={
                            () => {
                                if (isFunction(defaultData.action)) {
                                    console.log(true)
                                    defaultData.action();
                                    closePopup();
                                } else {
                                    closePopup()
                                }
                            }}>{defaultData.confirmTxt}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function PopupConfirm({ defaultData, needInput, inputData }) {
    const [show, setShow] = useState(true);
    const refInput = useRef();

    function closePopup() {
        setShow(false)
    }
    return (
        <div id="popupConfirmBgContainer" className={!show ? "hide" : null}>
            <div className={!show ? "popupConfirm hide" : "popupConfirm"}>
                <div
                    className="flexCenter"
                    style={{ flexDirection: "column", gap: "15px" }}
                >
                    <div id="header">
                        <h4 style={{ maxWidth: "88%", textAlign: "justify" }}>
                            {defaultData.titulo}
                        </h4>
                        <button
                            id="close"
                            className="flexCenter"
                            onClick={
                                () => {
                                    if (isFunction(defaultData.closeAction)) {
                                        closePopup();
                                        defaultData.closeAction();
                                    } else {
                                        closePopup();
                                    }
                                }}
                        >
                            <CloseIcon style={{ width: "40px", height: "40px" }} />
                        </button>
                    </div>
                    {needInput ? (
                        <div id="inputItems">
                            <input
                                ref={refInput}
                                className="inputTxt"
                                id="inputData"
                                placeholder=""
                                type="text"
                                onKeyDown={inputData.getByKeyBoard}
                                onKeyUp={inputData.getByKeyBoard}
                                onChange={inputData.getByChange}
                            />
                            <label htmlFor="inputData">{inputData.placeholder}</label>
                        </div>
                    ) : (
                        <div id="textData">
                            <p>{defaultData.text}</p>
                        </div>
                    )}
                    <div
                        id="actionsPopup"
                        style={{
                            flexDirection: defaultData.highlightNegative
                                ? "row-reverse"
                                : "",
                        }}
                    >
                        <button
                            onClick={
                                !defaultData.highlightNegative ?
                                    () => {
                                        if (isFunction(defaultData.action)) {
                                            if (refInput.current && needInput && refInput.current.value.length > 0) {
                                                defaultData.action();
                                                closePopup();
                                            } else if (refInput.current && needInput && refInput.current.value.length === 0) {
                                                if (refInput.current.classList.contains("error")) {
                                                    refInput.current.classList.remove("error");
                                                    setTimeout(() => {
                                                        refInput.current.classList.add("error");
                                                    }, 50);
                                                } else {
                                                    refInput.current.classList.add("error");
                                                }
                                            }
                                        } else {
                                            closePopup();
                                        }
                                    }
                                    : null
                            }
                        >
                            {!defaultData.highlightNegative
                                ? defaultData.confirmTxt
                                : defaultData.cancelTxt}
                        </button>
                        <button
                            onClick={
                                defaultData.highlightNegative
                                    ? isFunction(defaultData.action)
                                        ? () => {
                                            defaultData.action();
                                            closePopup();
                                        }
                                        : null
                                    : () => {
                                        if (isFunction(defaultData.closeAction)) {
                                            defaultData.closeAction();
                                            closePopup();
                                        } else {
                                            closePopup();
                                        }
                                    }
                            }
                        >
                            {defaultData.highlightNegative
                                ? defaultData.confirmTxt
                                : defaultData.cancelTxt}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PopupTwoActions({ defaultData }) {
    const [show, setShow] = useState(true);

    function closePopup() {
        setShow(false)
        if (isFunction(defaultData.closeAction)) {
            setTimeout(() => {
                defaultData.closeAction();
            }, 500);
        }
    }
    return (
        <div id="popupConfirmBgContainer" className={!show ? "hide" : null}>
            <div className={!show ? "popupConfirm hide" : "popupConfirm"}>
                <div
                    className="flexCenter"
                    style={{ flexDirection: "column", gap: "15px" }}
                >
                    <div id="header">
                        <h4 style={{ maxWidth: "88%", textAlign: "justify" }}>
                            {defaultData.titulo}
                        </h4>
                        <button
                            id="close"
                            className="flexCenter"
                            onClick={closePopup}
                        >
                            <CloseIcon style={{ width: "40px", height: "40px" }} />
                        </button>
                    </div>
                    <div id="twoActionsPopup">
                        <button
                            onClick={
                                () => {
                                    if (isFunction(defaultData.action)) {
                                        defaultData.action();
                                        closePopup();
                                    } else {
                                        closePopup();
                                    }
                                }
                            }
                        >
                            {defaultData.action1Txt}
                        </button>
                        <button
                            onClick={
                                () => {
                                    if (isFunction(defaultData.action2)) {
                                        defaultData.action2();
                                        closePopup();
                                    } else {
                                        closePopup();
                                    }
                                }
                            }
                        >
                            {defaultData.action2Txt}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
