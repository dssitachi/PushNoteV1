import { Toast, ToastDescription, ToastTitle, VStack, useToast } from "@gluestack-ui/themed";

export function showToast(toast) {

    toast.show({
        placement: "top",
        render: ({ id }) => {
            return (
                <Toast
                    nativeID={"toast-" + id}
                    action="success"
                    variant="solid"
                    mt="$10"
                >
                    <VStack space="xs">
                        <ToastDescription>
                            Task Assigned Successfully
                        </ToastDescription>
                    </VStack>
                </Toast>
            );
        },
    });
}
