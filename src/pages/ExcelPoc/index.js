import { Alert, AlertTitle, Button, Grid, Snackbar } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import React, { useState } from "react";
import { backendImitator, res } from "../../apis/xlsData";
import FileUploader from "../../components/FileUploader";
import { downloadExcel } from "../../services/excelDownload";
import styles from "./index.module.scss";

const ExcelPoc = () => {
	// const { data, error, isLoading, mutate } = useMutation(
	// 	(body) => axios.post("https://localhost:44337/api/Excel/ReadFile", body),
	// 	{
	// 		onSuccess: (data) => {
	// 			setIsSnackBarOpen(true);
	// 		},
	// 	}
	// );
	const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
	const [selectedFile, setSelectedFile] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [snackbarState, setSnackbarState] = useState({
		status: "success",
		title: "Upload Successful",
	});
	const [res, setRes] = useState({});

	const fileSubmitter = async (file) => {
		setIsLoading(true);
		// const response = await axios.post("/api/Excel/ReadFile", { file });
		const response = await backendImitator();
		// window.location.reload();
		setRes(response);
		setSelectedFile(file);
		setIsLoading(false);
		if (response?.success !== undefined) {
			if (response.success && response.datat.lstFailedUploadStatusDVO.length === 0) {
				setSnackbarState({
					title: "Upload Successful",
					status: "success",
				});
			} else {
				setSnackbarState({
					title: "Some Records failed",
					status: "warning",
				});
			}
		} else {
			setSnackbarState({
				title: "Upload Unsuccessful",
				status: "error",
			});
		}
		setIsSnackBarOpen(true);
	};
	const onInputChange = (e) => {
		const file = e.currentTarget.files?.[0];

		fileSubmitter(file);

		// console.log("called");
	};
	const onDropHandler = (e) => {
		e.preventDefault();

		const file = e.dataTransfer.files?.[0];
		fileSubmitter(file);
	};
	const fileUploaderProps = {
		message: "Drag and Drop files to upload",
		supportedFilesText: "Supported files .xls, xslx.",
		onInputChange,
		onDropHandler,
	};
	const onSnackBarClose = () => {
		setIsSnackBarOpen(false);
	};
	const onBtnClick = (status) => () => {
		status === "success"
			? downloadExcel(res.datat.lstSuccessfulUploadStatusDVO, "success")
			: downloadExcel(res.datat.lstFailedUploadStatusDVO, "fail");
	};
	console.log(res);
	return (
		<>
			<div className={styles.excelPocContainer}>
				<Grid container className={styles.mainContainer}>
					<Grid item xs={12} lg={6} className={styles.mainContainerLeft}>
						<FileUploader {...fileUploaderProps} isLoading={isLoading} />
					</Grid>
					<Grid item xs={12} lg={6} className={styles.mainContainerRight}>
						{res.success === true && (
							<>
								<div className={styles.uploadFilesSection}>
									<p className={styles.rightContainerHeading}>Uploaded File</p>
									<div className={styles.uploadFile}>
										<img src="/images/xls.png" alt="file" className={styles.fileIcon} />
										<p className={styles.fileName}>{selectedFile?.name}</p>
									</div>
								</div>
								{res.datat.lstSuccessfulUploadStatusDVO && (
									<div className={styles.successfulEntries}>
										<p className={styles.rightContainerHeading}>Succesful Records</p>
										<div className={styles.fileNameContainer}>
											<img src="/images/xls.png" alt="file" className={styles.fileIcon} />
											<p className={styles.fileName}>{"success.xlsx"}</p>
											<Button variant="contained" onClick={onBtnClick("success")}>
												{" "}
												Download{" "}
											</Button>
										</div>
									</div>
								)}
								{res.datat.lstFailedUploadStatusDVO && (
									<div className={styles.failedEntries}>
										<p className={styles.rightContainerHeading}>unSuccesful Records</p>
										<div className={styles.fileNameContainer}>
											<img src="/images/xls.png" alt="file" className={styles.fileIcon} />
											<p className={styles.fileName}>{"fail.xlsx"}</p>
											<Button variant="contained" onClick={onBtnClick("failure")}>
												Download{" "}
											</Button>
										</div>
									</div>
								)}
							</>
						)}
						{res.success === false && (
							<div>
								<p>Error!!!</p>
								<p>{`Please refer this message:${res.msg}`}</p>
							</div>
						)}
						{res.success === undefined && (
							<div>Please Upload a file by clicking on th browse button or drag and drop a file. </div>
						)}
					</Grid>
				</Grid>
			</div>
			<Snackbar open={isSnackBarOpen} autoHideDuration={15000} onClose={onSnackBarClose}>
				<Alert severity={snackbarState.status} variant="filled">
					<AlertTitle>{snackbarState.title}</AlertTitle>
				</Alert>
			</Snackbar>
			{/* <MuiAlert */}
		</>
	);
};
// {
// 	(success = false), (msg = responseMessage);
// }
export default ExcelPoc;
