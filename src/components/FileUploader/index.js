import { Button, CircularProgress } from "@mui/material";
import React, { Component, useRef } from "react";
// import uploadImg from "/";
import styles from "./index.module.scss";
function FileUploader(props) {
	const {
		message,
		ctaText,
		imgSrc,
		imgAltText,
		supportedFilesText,
		supportedFormats,
		onInputChange,
		onDropHandler,
		onDragOverHandler,
		onDrageLeaveHandler,
		onDragEnterHandler,
		isLoading,
	} = props;
	const inputRef = useRef(null);
	const onBtnClick = () => {
		inputRef.current.click();
	};
	return (
		<div
			className={styles.fileuploaderContainer}
			onDrop={onDropHandler}
			onDragOver={onDragOverHandler}
			onDragLeave={onDrageLeaveHandler}
			onDragEnter={onDragEnterHandler}>
			{isLoading && <CircularProgress color="secondary" />}
			<img src={imgSrc} alt={imgAltText} className={styles.uploadImg} />
			<p className={styles.mainMessage}>{message}</p>
			<p>or</p>
			{/* <label htmlFor="file"> */}
			<input
				type="file"
				name="file"
				id="file"
				accept={supportedFormats.join(",")}
				hidden
				onChange={onInputChange}
				ref={inputRef}
			/>
			<Button variant="contained" className={styles.cta} onClick={onBtnClick}>
				{ctaText}
			</Button>
			{/* </label> */}
			<p className={styles.supportedText}>{supportedFilesText}</p>
		</div>
	);
}

FileUploader.defaultProps = {
	message: "",
	ctaText: "Browse",
	imgAltText: "Upload",
	imgSrc: "/images/upload.png",
	supportedFormats: [".xlsx", "xls"],
	onInputChange: () => {},
	onDropHandler: (e) => {
		e.preventDefault();
	},
	onDragOverHandler: (e) => {
		e.preventDefault();
		console.log("done");
	},
	onDragEnterHandler: (e) => {
		e.preventDefault();
	},
	onDrageLeaveHandler: (e) => {
		e.preventDefault();
	},
};

export default FileUploader;
