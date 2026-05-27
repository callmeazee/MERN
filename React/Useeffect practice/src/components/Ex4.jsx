import React, {useEffect, useState} from 'react'
import {
    Modal,
    Divider
} from 'antd'

const Ex4 = () => {
    const [open, setOpen] =  useState(false)

    useEffect(()=>{
        setOpen(true)
    }, [])

    return (
        <div>
            <Modal 
                open={open}
                title="Description"
                onCancel={()=>setOpen(false)}
                onOk={()=>setOpen(false)}
                maskClosable={false}
                width={720}
                centered
            >
                <Divider />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore sequi aspernatur quod perspiciatis quasi, ratione expedita, veniam deserunt quisquam quis velit inventore veritatis, rem cumque sint adipisci iste mollitia itaque.</p>
            </Modal>
        </div>
  )
}

export default Ex4