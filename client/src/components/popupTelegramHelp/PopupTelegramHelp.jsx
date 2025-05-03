import React, { useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import { useSelector } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiSolidCopy } from "react-icons/bi";
import { TiTick } from "react-icons/ti";


const PopupTelegramHelp = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [open, setOpen] = useState(true);
    const [openResponsive, setOpenResponsive] = useState(false);
    const [copy, setCopy] = useState(false)
    const handleSetCopy = () => {
        setCopy(true)
        const timer = setTimeout(() => {
            setCopy(false)
        }, 1000);
        return () => clearTimeout(timer);
    }

  
    return (
        <Flex vertical gap="middle" align="flex-start">
            {/* Basic */}
            <Button type="primary" onClick={() => setOpen(true)}>
                Open Modal of 1000px width
            </Button>
            <Modal
                title="តើលោកអ្នកត្រូវការទទួលវិក័យបត្រតាមរយៈតេឡេក្រាមរបស់អ្នកទេ?"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={500}
            >
                <p>វិធីក្នុងការទទួលទទួលវិក័យបត្របន្ទាប់ពីបញ្ជាទិញរួចរាល់</p>
                <p>1. ចុចនៅទីនេះ!! ដើម្បីភ្ជាប់ជាមួយប្រព័ន្ធយើងខ្ញុំ</p>
                <div className='flex items-center gap-2 '>
                    <p>2. ចម្លងឈ្មោះនៅក្នុងប្រព័ន្ធរបស់អ្នក <span className={` ${copy && "text-blue-600"}  font-semibold  px-1 py-0.5`}>/start {user.username} </span></p>
                    <div>
                        <CopyToClipboard text={`/start ${user.username}`}
                        >
                            {copy ? <TiTick size={25}
                                className="cursor-pointer text-blue-600 bg-blue-200 w-full p-1 rounded" />
                                :
                                <BiSolidCopy onClick={handleSetCopy} size={25} className="cursor-pointer text-gray-600  w-full bg-gray-200 p-1 rounded" />}
                        </CopyToClipboard>
                    </div>
                </div>

                <p>3. ដាក់បញ្ជូលទៅក្នុង Chat Bot របស់យើងខ្ញុំហើយចុចបញ្ជូនជាការស្រេច</p>
                <p>នោះលោកអ្នកនឹងទទួលបានវិក័យបត្រ រាល់ពេលដែលលោកអ្នកធ្វើការបញ្ជាទិញ</p>
                <p>សូមអរគុណ!! </p>


            </Modal>
        </Flex>
    );
};
export default PopupTelegramHelp;