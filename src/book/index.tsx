import React from 'react'
import { Navigate } from 'react-router-dom'

const index: React.FC = () => {
    return (
        <div>
            <Navigate replace to={"/book/index.html"} />
        </div>
    )
}

export default index