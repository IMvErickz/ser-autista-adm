import * as React from 'react';
import * as ToastRadix from '@radix-ui/react-toast';

interface ToastProps {
    open: boolean
    message: string
}

export const Toast = (props: ToastProps) => {
    const [open, setOpen] = React.useState(props.open);
    const timerRef = React.useRef(0);

    React.useEffect(() => {
        setOpen(props.open)
    }), []

    return (
        <ToastRadix.Provider swipeDirection="right">
            <ToastRadix.Root
                className="bg-blue-450 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                open={open}
                onOpenChange={setOpen}
            >
                <ToastRadix.Title className="[grid-area:_title] mb-[5px] font-medium text-white text-2xl">
                    {props.message}
                </ToastRadix.Title>
            </ToastRadix.Root>
            <ToastRadix.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </ToastRadix.Provider>
    );
};