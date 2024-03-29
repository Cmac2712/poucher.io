import { useState, useContext, createContext, Dispatch, SetStateAction, ReactNode } from "react"

interface ModalProviderProps {
  children: ReactNode
}

type ModalContextProps = {
  openModal: () => void
  closeModal: () => void
  modalOpen: boolean
  setModalContent: Dispatch<SetStateAction<JSX.Element | boolean>>
  modalContent: JSX.Element | boolean 
} | undefined

const ModalContext = createContext<ModalContextProps>(undefined)

export const useModal = () => {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}

export const ModalProvider = ({ children }: ModalProviderProps) => {

  const [modalOpen, setModalOpen] = useState(false) 
  const [modalContent, setModalContent] = useState<JSX.Element | boolean>(false) 

  const openModal = () => setModalOpen(true)

  const closeModal = () => {
    setModalContent(false)
    setModalOpen(false)
  }

  const value:ModalContextProps = {
    openModal,
    closeModal,
    modalOpen,
    setModalContent,
    modalContent
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}