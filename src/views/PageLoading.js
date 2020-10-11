import React from 'react';
export default function PageLoading(){

  return (
    <div className="d-flex justify-content-center">
    <div className="spinner-grow text-primary" style={{width: '50%', height: '50%', paddingTop: '50%'}} role="status">
      <span className="sr-only">Loading...</span>\
    </div>
    </div>
  )
}
