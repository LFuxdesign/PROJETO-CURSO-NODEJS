import { capFirstLetter, cleanHtml } from "../../scripts/scripts";
import "./imgWithText.css"

export default function ImgWithText({ path, text="", onClick, altText = "", isSectionImage=false }) {
    if (path && typeof isSectionImage === 'boolean') {
        return (
            <>
                <img
                    onClick={typeof onClick === 'function' ? onClick : ""}
                    loading="lazy"
                    className="imgSessao"
                    src={path}
                    style={{ maxHeight: isSectionImage ? "" : "unset!important", marginBottom: !(text.length >0) ? "25px": "" }}
                    alt={altText}
                />
                {text.length >0 && <span className="imageDescriptionDetail" dangerouslySetInnerHTML={{ __html: capFirstLetter(cleanHtml(text)) }} />}
            </>
        );
    }
}