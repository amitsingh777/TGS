export const res = {
	success: true,
	datat: {
		lstSuccessfulUploadStatusDVO: [
			{
				oclientcode: "AUSF89359",
				oproducttype: "ALL",
				ofileremarks: "successful",
			},
		],
		lstFailedUploadStatusDVO: [
			{
				oclientcode: "PXTIST0906",
				oproducttype: "ALL",
				ofileremarks: "client code not found",
			},
			{
				oclientcode: "N010432",
				oproducttype: "ALL",
				ofileremarks: "client code not found",
			},
			{
				oclientcode: "Mcs0574",
				oproducttype: "ALL",
				ofileremarks: "client code not found",
			},
			{
				oclientcode: "AUSF89359",
				oproducttype: "ALL",
				ofileremarks: "same data found multiple times in same file",
			},
			{
				oclientcode: "AUSF89359",
				oproducttype: "ALL",
				ofileremarks: "same data found multiple times in same file",
			},
			{
				oclientcode: "AUSF89359",
				oproducttype: "ALL",
				ofileremarks: "same data found multiple times in same file",
			},
		],
	},
};

export const backendImitator = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(res);
		}, [4000]);
	});
};
