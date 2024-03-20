import React, { useState } from 'react'
import useCustomToast from './useCustomToast'

function usePreviewImage() {
    const [imageUrl, setImageUrl] = useState(null);
	const showToast = useCustomToast();
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImageUrl(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Invalid file type", " Please select an image file", "error");
			setImageUrl(null);
		}
	};
	return { handleImageChange, imageUrl, setImageUrl };
}

export default usePreviewImage