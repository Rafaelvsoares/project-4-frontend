import { useState, useEffect, useRef } from 'react';
import * as cloudinaryCore from 'cloudinary-core';

function UploadImage({ setImages, handleData }: any) {

  const cloudinaryRef = useRef<any>()
  const widgetRef = useRef<any>()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dzjjvjjk2',
      uploadPreset: 'images',
      autoUpload: false,
      sources: ['local']
    }, function (error: any, result: any) {
      if (!error && result && result.event === 'success') {
        setImages((prevImages: any) => [...prevImages, result.info.secure_url])
      }
    })
  }, [])

  function handleOpenWidget(e: any) {
    e.preventDefault()
    widgetRef.current.open()
  }

  return (
    <button onClick={handleOpenWidget} name="images">Upload Images</button>
  )
}

export default UploadImage;