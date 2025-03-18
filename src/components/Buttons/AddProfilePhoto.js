'use client';

import {useEffect, useRef, useState} from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const AddProfilePhoto = ({onFileSelected }) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const setCanvasPreview = (
        image, // HTMLImageElement
        canvas, // HTMLCanvasElement
        crop // PixelCrop
    ) => {
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        // devicePixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to
        // size the image back down if you want to download/upload and be
        // true to the images natural size.
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        ctx.save();

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        // Move the crop origin to the canvas origin (0,0)
        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight
        );

        ctx.restore();
    };
    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
            setSelectedFile(file);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    useEffect(() => {
        if (!crop || !imgRef.current || !previewCanvasRef.current) return;

        setCanvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );

        previewCanvasRef.current.toBlob((blob) => {
            if (blob && selectedFile) {
                const croppedFile = new File([blob], selectedFile.name, {
                    type: selectedFile.type,
                    lastModified: Date.now(),
                });

                onFileSelected(croppedFile);
            }
        }, selectedFile?.type || "image/png");
    }, [crop]);

    return (
        <>
            <label className="block mb-3 w-fit">
                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="block w-full text-sm text-slate-500
                     file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0
                      file:text-xs file:bg-gray-700 file:text-green-300 hover:file:bg-gray-600"
                />
            </label>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            {imgSrc && (
                <div className="flex flex-col items-center">
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                </div>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </>
    );
};
export default AddProfilePhoto;


// 'use client';
//
// import React, { useState } from "react";
// import {useTranslations} from "next-intl";
//
// const AddProfilePhoto = ({ onFileSelected }) => {
//     const [file, setFile] = useState();
//
//     function getFile(event) {
//         // const selectedFile = event.target.files[0];
//         // setFile(URL.createObjectURL(selectedFile));
//         // onFileSelected(selectedFile); // Вызов функции onFileSelected с выбранным файлом
//
//         const selectedFile = event.target.files[0];
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//         if (selectedFile && allowedTypes.includes(selectedFile.type)) {
//             setFile(URL.createObjectURL(selectedFile));
//             onFileSelected(selectedFile);
//         } else {
//             alert("Please upload an image file (jpeg, jpg, png).");
//         }
//     }
//
//     const t = useTranslations('CreateAccount.ProfilePhoto');
//
//
//     return (
//         // <div>
//         //     <input type="file" onChange={getFile} />
//         //     <img src={file} alt="Profile Photo" />
//         // </div>
//         <div className="w-full border border-black aspect-w-3 aspect-h-4">
//             <div className="relative w-full h-64 border overflow-hidden bg-gray-100 flex items-center justify-center">
//                 <label htmlFor="uploadImage" className="cursor-pointer w-full h-full flex items-center justify-center">
//                     {file ? (
//                         <img
//                             src={file}
//                             alt={t("uploadImage")}
//                             className="w-full h-full object-cover"
//                         />
//                     ) : (
//                         <span className="text-green-700">{t("uploadImage")}</span>
//                     )}
//                 </label>
//             </div>
//             <input
//                 type="file"
//                 id="uploadImage"
//                 accept="image/jpeg,image/png,image/jpg"
//                 onChange={getFile}
//                 className="hidden"
//             />
//         </div>
//
//     );
// };
//
// export default AddProfilePhoto;