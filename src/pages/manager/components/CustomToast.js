import React from 'react';
import { useEffect, useState } from 'react';

const CustomToast = ({ message }) => {
    const [showSnackbar, setShowSnackbar] = useState(false);

    const handleShowSnackbar = () => {
        setShowSnackbar(true);
        setTimeout(() => {
            setShowSnackbar(false);
        }, 3000);
    };

    useEffect(() => {
        handleShowSnackbar()
    })

    return (
        <>
            <div className={showSnackbar ? 'snackbar show' : 'snackbar'}>
                {message}
            </div>

            <style jsx>{`
        .snackbar {
          visibility: hidden;
          min-width: 250px;
          margin-left: -125px;
          background-color: #333;
          color: #fff;
          text-align: center;
          border-radius: 2px;
          padding: 16px;
          position: fixed;
          z-index: 1;
          left: 50%;
          bottom: 30px;
          font-size: 17px;
        }

        .snackbar.show {
          visibility: visible;
          animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }

        @keyframes fadein {
          from {
            bottom: 0;
            opacity: 0;
          }
          to {
            bottom: 30px;
            opacity: 1;
          }
        }

        @keyframes fadeout {
          from {
            bottom: 30px;
            opacity: 1;
          }
          to {
            bottom: 0;
            opacity: 0;
          }
        }
      `}</style>
        </>
    );
};

export default CustomToast;

