import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";

export function AddressFormat(str, number = 8, type, network, showCopy = true) {
    if (str.length <= number * 2) {
        return (<>
            {
                showCopy ?
                    <ContentCopyIcon className='text-textColor' style={{ fontSize: '16px', marginTop: '-4px', marginLeft: '4px', cursor: 'pointer' }}
                        onClick={() => {
                            navigator.clipboard.writeText(str)
                            toast.success("در کلیپ‌بورد ذخیره شد!", {
                                position: "bottom-left",
                            });
                        }} />
                    :
                    null
            }

            <a style={{ textDecoration: 'none' }} className='text-primary' href={`/panel/dashboard/${type}/${network}/${str}/`}>{str}</a>

        </>);
    }
    const firstPart = str.substring(0, number);
    const lastPart = str.substring(str.length - number);
    return (<div className='inline-block'>
        {
            showCopy ?
                <ContentCopyIcon className='text-textColor' style={{ fontSize: '16px', marginTop: '-4px', marginLeft: '4px', cursor: 'pointer' }}
                    onClick={() => {
                        navigator.clipboard.writeText(str)
                        toast.success("در کلیپ‌بورد ذخیره شد!", {
                            position: "bottom-left",
                        });
                    }} />
                :
                null
        }
        <a style={{ textDecoration: 'none' }} className='text-primary' href={`/panel/dashboard/${type}/${network}/${str}/`}>{firstPart + '...' + lastPart}</a>

    </div>);
}