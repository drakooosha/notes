import { Modal } from "@carbon/react";

const ModalWrapper = (props) => {
  const activeModalSettings = {
    ...props.settings,
    'open': props.toggleModal[props.activeModal],
    'onRequestSubmit': props[`${props.activeModal}Submit`],
    'children': props[`${props.activeModal}Content`] || ''
  }

  return (
    <Modal open={activeModalSettings.open} primaryButtonText={activeModalSettings.primaryButtonText} secondaryButtonText={activeModalSettings.secondaryButtonText} danger={activeModalSettings.danger} modalHeading={activeModalSettings.modalHeading} onRequestClose={props.toggleHandler.bind(null, activeModalSettings.onRequestClose)} onRequestSubmit={activeModalSettings.onRequestSubmit} children={activeModalSettings.children} />
  )
}

export default ModalWrapper