import "./ModalHint.css"
export default function ModalHint({children, closeModal}){
    return (
        <dialog className="modal-hint" open>
            {children}
            <form method="dialog" >
                <button type="submit" onClick={closeModal}>Закрити</button>
            </form>
        </dialog>
    )
}