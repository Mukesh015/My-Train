import React, { useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";




const LiveModal = ({ train_no }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleFetchLivedata = async () => {
        console.log(train_no)
        try {
            const response = await fetch(`https://rappid.in/apis/train.php?train_no=${train_no}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.log("No data available");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleFetchLivedata();
    }, [handleFetchLivedata]);

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Live tracing</ModalHeader>
                            <ModalBody>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default LiveModal;